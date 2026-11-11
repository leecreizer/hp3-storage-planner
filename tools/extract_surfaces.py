"""Homvue 바닥재·벽지({VITE_ASSET_ROOT}/homvue) → 셀프 플래너 방 재질.

Homvue 는 재질 ID 마다 실제 방 바닥·벽 GLB 에 재질을 입혀 두었다(glb/materials/{floor|wall}/{ID}/...).
그중 한 GLB 에서 텍스처(기본색·노멀·거칠기/금속)와 크기(UV 한 칸이 몇 m 인지)를 뽑는다.
이름·상품코드는 DT_FloorMatMaster / DT_WallMatMaster(IsEnable 만).

실행: python -I tools/extract_surfaces.py  →  public/tex/surfaces/*.jpg · public/data/surfaces.json
"""
import glob, io, json, math, os, struct
from PIL import Image


def asset_root():
    """원본 자산 폴더 — 환경변수 또는 저장소 루트 .env.local 의 VITE_ASSET_ROOT(저장소엔 올리지 않는다)"""
    v = os.environ.get('VITE_ASSET_ROOT')
    if not v:
        env = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env.local')
        if os.path.exists(env):
            for line in open(env, encoding='utf-8'):
                k, _, val = line.strip().partition('=')
                if k == 'VITE_ASSET_ROOT':
                    v = val.strip().strip('"' + "'")
    if not v:
        raise SystemExit('VITE_ASSET_ROOT 가 없습니다 - .env.local 에 VITE_ASSET_ROOT=원본 자산 폴더 를 적어 주세요')
    return v.rstrip('/')

SRC = asset_root() + '/homvue'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'tex', 'surfaces')

COMP = {5120: 'b', 5121: 'B', 5122: 'h', 5123: 'H', 5125: 'I', 5126: 'f'}
NCOMP = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}


def read_glb(path):
    b = open(path, 'rb').read()
    n = struct.unpack_from('<I', b, 12)[0]
    j = json.loads(b[20:20 + n])
    off = 20 + n
    binlen = struct.unpack_from('<I', b, off)[0]
    return j, b[off + 8: off + 8 + binlen]


def accessor(j, bin_, i):
    a = j['accessors'][i]
    v = j['bufferViews'][a['bufferView']]
    c, k = COMP[a['componentType']], NCOMP[a['type']]
    size = struct.calcsize('<' + c) * k
    stride = v.get('byteStride', size)
    base = v.get('byteOffset', 0) + a.get('byteOffset', 0)
    return [struct.unpack_from('<' + c * k, bin_, base + stride * n) for n in range(a['count'])]


def image(j, bin_, tex_index):
    src = j['textures'][tex_index]['source']
    im = j['images'][src]
    v = j['bufferViews'][im['bufferView']]
    return Image.open(io.BytesIO(bin_[v.get('byteOffset', 0): v.get('byteOffset', 0) + v['byteLength']]))


def uv_meters(j, bin_, prim):
    """UV 1칸이 몇 m — 삼각형마다 위치 변화량 / UV 변화량의 중앙값 (GLB 단위는 m)"""
    pos = accessor(j, bin_, prim['attributes']['POSITION'])
    uv = accessor(j, bin_, prim['attributes']['TEXCOORD_0'])
    idx = [t[0] for t in accessor(j, bin_, prim['indices'])] if 'indices' in prim else list(range(len(pos)))
    ratios = []
    for t in range(0, min(len(idx), 3000), 3):
        a, b = idx[t], idx[t + 1]
        dp = math.dist(pos[a], pos[b]); du = math.dist(uv[a], uv[b])
        if du > 1e-6 and dp > 1e-4:
            ratios.append(dp / du)
    ratios.sort()
    return ratios[len(ratios) // 2] if ratios else 1.0


def extract(kind, row):
    files = sorted(glob.glob(f'{SRC}/glb/materials/{kind}/{row["ID"]}/**/*.glb', recursive=True))
    if not files:
        return None
    j, bin_ = read_glb(files[0])
    # 가장 큰 프리미티브의 재질 = 바닥재·벽지
    best = None
    for m in j['meshes']:
        for p in m['primitives']:
            n = j['accessors'][p['attributes']['POSITION']]['count']
            if 'material' in p and 'TEXCOORD_0' in p['attributes'] and (best is None or n > best[0]):
                best = (n, p)
    prim = best[1]
    mat = j['materials'][prim['material']]
    pbr = mat.get('pbrMetallicRoughness', {})
    out = {'id': row['ID'], 'name': row['Name'], 'code': row['ProductCode'], 'uvMeters': round(uv_meters(j, bin_, prim), 4),
           'roughness': pbr.get('roughnessFactor', 1), 'metalness': pbr.get('metallicFactor', 0),
           'color': pbr.get('baseColorFactor', [1, 1, 1, 1])[:3]}
    def save(tex, suffix, mode='RGB'):
        im = image(j, bin_, tex['index']).convert(mode)
        if max(im.size) > 2048:
            im.thumbnail((2048, 2048))
        name = f'{kind}_{row["ID"]}_{suffix}.jpg'
        im.save(os.path.join(OUT, name), 'JPEG', quality=88)
        return 'tex/surfaces/' + name
    if 'baseColorTexture' in pbr: out['map'] = save(pbr['baseColorTexture'], 'base')
    if 'normalTexture' in mat: out['normalMap'] = save(mat['normalTexture'], 'nrm')
    if 'metallicRoughnessTexture' in pbr: out['ormMap'] = save(pbr['metallicRoughnessTexture'], 'orm')
    th = f'{SRC}/glb/materials/thumbs/{kind}/{row["ID"]}.png'
    if os.path.exists(th):
        Image.open(th).convert('RGB').resize((160, 160)).save(os.path.join(OUT, f'{kind}_{row["ID"]}_thumb.jpg'), quality=85)
        out['thumb'] = f'tex/surfaces/{kind}_{row["ID"]}_thumb.jpg'
    return out


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    res = {}
    for kind, table in (('floor', 'Floor'), ('wall', 'Wall')):
        rows = json.load(open(f'{SRC}/data/tables/Homvue__Data__DT_{table}MatMaster.json', encoding='utf-8'))
        res[kind] = [r for r in (extract(kind, row) for row in rows if row['IsEnable'] == 'True') if r]
        for r in res[kind]:
            print(kind, r['id'], r['name'], r['uvMeters'], [k for k in ('map', 'normalMap', 'ormMap', 'thumb') if k in r])
    json.dump(res, open(os.path.join(ROOT, 'public', 'data', 'surfaces.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
