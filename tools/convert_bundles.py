"""원본 셀프 플래너 Unity 에셋 번들 → glTF 변환.

메시·노드 계층·URP Lit 재질(기본색·텍스처·금속도·광택·노멀맵)을 그대로 옮긴다.
Unity 는 왼손 좌표계라 X 를 뒤집고 삼각형 감김 순서를 바꾼다. 텍스처는 내용 해시로
public/models/tex/ 에 한 번만 저장해 여러 모델이 같이 쓴다.

실행: <UnityPy 가 설치된 python> -I tools/convert_bundles.py <번들 폴더>
"""
import hashlib, io, json, math, os, struct, sys

import UnityPy
from UnityPy.helpers.MeshHelper import MeshHandler
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'models')
TEX = os.path.join(OUT, 'tex')


def fix(s):
    """typetree 문자열은 CP949 바이트가 latin-1 로 풀려 있다."""
    try:
        return s.encode('latin1').decode('cp949')
    except Exception:
        return s


def srgb2lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


tex_cache = {}


def save_texture(obj, normal=False):
    key = (obj.assets_file.name, obj.path_id, normal)
    if key in tex_cache:
        return tex_cache[key]
    t = obj.read()
    im = t.image.convert('RGBA')
    if normal:
        # DXT5nm(x=A, y=G) 이면 RGB 노멀로 복원
        r, g, b, a = im.split()
        if a.getextrema() != (255, 255) and r.getextrema()[1] - r.getextrema()[0] < 8:
            px = []
            for xa, yg in zip(a.getdata(), g.getdata()):
                x = xa / 127.5 - 1; y = yg / 127.5 - 1
                z = math.sqrt(max(0.0, 1 - x * x - y * y))
                px.append((xa, yg, int((z * 0.5 + 0.5) * 255)))
            im = Image.new('RGB', im.size); im.putdata(px)
        else:
            im = im.convert('RGB')
    opaque = im.mode == 'RGB' or im.getchannel('A').getextrema() == (255, 255)
    buf = io.BytesIO()
    if opaque:
        im.convert('RGB').save(buf, 'JPEG', quality=90)
        ext = 'jpg'
    else:
        im.save(buf, 'PNG', optimize=True)
        ext = 'png'
    data = buf.getvalue()
    name = hashlib.sha1(data).hexdigest()[:16] + '.' + ext
    path = os.path.join(TEX, name)
    if not os.path.exists(path):
        open(path, 'wb').write(data)
    tex_cache[key] = 'tex/' + name
    return tex_cache[key]


class Gltf:
    def __init__(self):
        self.j = {'asset': {'version': '2.0', 'generator': 'storage-planner convert_bundles'},
                  'scene': 0, 'scenes': [{'nodes': []}], 'nodes': [], 'meshes': [], 'materials': [],
                  'textures': [], 'images': [], 'samplers': [{'magFilter': 9729, 'minFilter': 9987, 'wrapS': 10497, 'wrapT': 10497}],
                  'accessors': [], 'bufferViews': [], 'buffers': []}
        self.bin = bytearray()
        self.mat_ids = {}
        self.img_ids = {}

    def view(self, data, target=None):
        while len(self.bin) % 4:
            self.bin.append(0)
        v = {'buffer': 0, 'byteOffset': len(self.bin), 'byteLength': len(data)}
        if target:
            v['target'] = target
        self.bin += data
        self.j['bufferViews'].append(v)
        return len(self.j['bufferViews']) - 1

    def accessor(self, fmt, ncomp, values, ctype, typ, target, minmax=False):
        flat = [c for v in values for c in (v if ncomp > 1 else (v,))]
        data = struct.pack('<%d%s' % (len(flat), fmt), *flat)
        a = {'bufferView': self.view(data, target), 'componentType': ctype, 'count': len(values), 'type': typ}
        if minmax:
            a['min'] = [min(v[i] for v in values) for i in range(ncomp)]
            a['max'] = [max(v[i] for v in values) for i in range(ncomp)]
        self.j['accessors'].append(a)
        return len(self.j['accessors']) - 1

    def image(self, uri):
        if uri not in self.img_ids:
            self.j['images'].append({'uri': uri})
            self.j['textures'].append({'source': len(self.j['images']) - 1, 'sampler': 0})
            self.img_ids[uri] = len(self.j['textures']) - 1
        return self.img_ids[uri]

    def material(self, mobj, objs):
        if mobj.path_id in self.mat_ids:
            return self.mat_ids[mobj.path_id]
        t = mobj.read_typetree()
        pr = t['m_SavedProperties']
        fl = dict(pr['m_Floats']); col = dict(pr['m_Colors']); te = dict(pr['m_TexEnvs'])
        bc = col.get('_BaseColor') or col.get('_Color') or {'r': 1, 'g': 1, 'b': 1, 'a': 1}
        pbr = {'baseColorFactor': [srgb2lin(bc['r']), srgb2lin(bc['g']), srgb2lin(bc['b']), 1.0],
               'metallicFactor': float(fl.get('_Metallic', 0.0)),
               'roughnessFactor': 1.0 - float(fl.get('_Smoothness', fl.get('_Glossiness', 0.5)))}
        m = {'name': fix(t['m_Name']), 'pbrMetallicRoughness': pbr}
        base = te.get('_BaseMap') or te.get('_MainTex')
        if base and base['m_Texture']['m_PathID'] in objs:
            pbr['baseColorTexture'] = {'index': self.image(save_texture(objs[base['m_Texture']['m_PathID']]))}
        nm = te.get('_BumpMap')
        if nm and nm['m_Texture']['m_PathID'] in objs:
            m['normalTexture'] = {'index': self.image(save_texture(objs[nm['m_Texture']['m_PathID']], normal=True)),
                                  'scale': float(fl.get('_BumpScale', 1.0))}
        self.j['materials'].append(m)
        self.mat_ids[mobj.path_id] = len(self.j['materials']) - 1
        return self.mat_ids[mobj.path_id]

    def mesh(self, mesh_obj, mat_objs, objs):
        m = mesh_obj.read()
        h = MeshHandler(m); h.process()
        pos = [(-x, y, z) for x, y, z in h.m_Vertices]
        prim_attrs = {'POSITION': self.accessor('f', 3, pos, 5126, 'VEC3', 34962, True)}
        if h.m_Normals:
            prim_attrs['NORMAL'] = self.accessor('f', 3, [(-x, y, z) for x, y, z in h.m_Normals], 5126, 'VEC3', 34962)
        if h.m_UV0:
            prim_attrs['TEXCOORD_0'] = self.accessor('f', 2, [(u, 1 - v) for u, v in (uv[:2] for uv in h.m_UV0)], 5126, 'VEC2', 34962)
        prims = []
        for i, tris in enumerate(h.get_triangles()):
            idx = [k for tri in tris for k in (tri[0], tri[2], tri[1])]
            big = max(idx) > 65535 if idx else False
            ia = self.accessor('I' if big else 'H', 1, idx, 5125 if big else 5123, 'SCALAR', 34963)
            p = {'attributes': prim_attrs, 'indices': ia}
            mo = mat_objs[i] if i < len(mat_objs) else (mat_objs[-1] if mat_objs else None)
            if mo is not None:
                p['material'] = self.material(mo, objs)
            prims.append(p)
        self.j['meshes'].append({'name': fix(mesh_obj.read_typetree()['m_Name']), 'primitives': prims})
        return len(self.j['meshes']) - 1

    def write(self, path):
        base = os.path.basename(path)[:-5]
        self.j['buffers'] = [{'uri': base + '.bin', 'byteLength': len(self.bin)}]
        for k in ('textures', 'images', 'materials', 'meshes'):
            if not self.j[k]:
                del self.j[k]
        if 'textures' not in self.j:
            del self.j['samplers']
        open(path, 'w', encoding='utf-8').write(json.dumps(self.j, ensure_ascii=False, separators=(',', ':')))
        open(path[:-5] + '.bin', 'wb').write(self.bin)


def convert(bundle_path):
    env = UnityPy.load(bundle_path)
    objs = {o.path_id: o for o in env.objects}
    trs = {o.path_id: o.read_typetree() for o in env.objects if o.type.name == 'Transform'}
    g = Gltf()
    mesh_ids = {}

    def node(pid):
        t = trs[pid]
        go = objs[t['m_GameObject']['m_PathID']].read_typetree()
        p, r, s = t['m_LocalPosition'], t['m_LocalRotation'], t['m_LocalScale']
        n = {'name': fix(go['m_Name'])}
        if any(abs(v) > 1e-7 for v in (p['x'], p['y'], p['z'])):
            n['translation'] = [-p['x'], p['y'], p['z']]
        if abs(r['w'] - 1) > 1e-7:
            n['rotation'] = [r['x'], -r['y'], -r['z'], r['w']]
        if any(abs(v - 1) > 1e-7 for v in (s['x'], s['y'], s['z'])):
            n['scale'] = [s['x'], s['y'], s['z']]
        mf = mr = None
        for c in go['m_Component']:
            co = objs.get(c['component']['m_PathID'])
            if co is None:
                continue
            if co.type.name == 'MeshFilter':
                mf = co.read_typetree()
            elif co.type.name == 'MeshRenderer':
                mr = co.read_typetree()
        if mf and mr and mf['m_Mesh']['m_PathID'] in objs:
            mid = mf['m_Mesh']['m_PathID']
            mats = [objs.get(m['m_PathID']) for m in mr['m_Materials']]
            if mid not in mesh_ids:
                mesh_ids[mid] = g.mesh(objs[mid], mats, objs)
            n['mesh'] = mesh_ids[mid]
        g.j['nodes'].append(n)
        idx = len(g.j['nodes']) - 1
        kids = [node(ch['m_PathID']) for ch in t['m_Children']]
        if kids:
            g.j['nodes'][idx]['children'] = kids
        return idx

    for pid, t in trs.items():
        if t['m_Father']['m_PathID'] == 0:
            g.j['scenes'][0]['nodes'].append(node(pid))
    name = os.path.basename(bundle_path).replace('.assetbundle', '')
    g.write(os.path.join(OUT, name + '.gltf'))
    return name, len(g.j.get('meshes', []))


if __name__ == '__main__':
    os.makedirs(TEX, exist_ok=True)
    src = sys.argv[1]
    files = sorted(f for f in os.listdir(src) if f.endswith('.assetbundle'))
    if len(sys.argv) > 2:
        files = [f for f in files if f.replace('.assetbundle', '') in sys.argv[2:]]
    for f in files:
        name, nm = convert(os.path.join(src, f))
        print(name, nm)
