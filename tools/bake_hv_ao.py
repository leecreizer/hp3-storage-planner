# 홈뷰 가구·소품(public/props/hv/*.glb) 라이트맵(그늘) 굽기 — Blender 5.2 헤드리스
#   blender -b --factory-startup --python tools/bake_hv_ao.py -- <입력 폴더> <출력 폴더> [모델 코드...]
# 모델이 그늘을 갖고 다니게 한다 — 앱은 배치만 하고 굽지 않는다(사용자 지시 2026-11-04 「원본 소스로 갖고 있어서 그냥 배치만」).
#  - 모델에 쓸 만한 두 번째 UV(TEXCOORD_1)가 있으면 그대로 쓰고, 없거나 깨졌으면(0~1 밖·겹침) Blender 로 새로 편다
#    (「라이트맵이 깨지면 블렌더3D로 UV를 다시 작업해서 생성」)
#  - 그늘 이미지는 GLB 안에 PNG 로 넣고 재질마다 occlusionTexture(texCoord 1) — glTF 표준이라 GLTFLoader 가 aoMap 으로 읽는다
#  - 원본 메시는 Blender 로 들였다 내보내지 않는다 — 노드·재질·정점 순서를 그대로 두고 정점만 UV 이음매에서 나눈다
#  - 홈뷰 원본은 Lumen 이라 구운 라이트맵이 없다(BuiltData 0, 140 개 중 61 개만 TEXCOORD_1) — 그래서 여기서 굽는다
import bpy, json, sys, os, math, time, struct
import numpy as np
from mathutils import Matrix, Quaternion

argv = sys.argv[sys.argv.index("--") + 1:]
SRC, DST, CODES = argv[0], argv[1], argv[2:]
if not CODES: CODES = sorted(f[:-4] for f in os.listdir(SRC) if f.endswith(".glb"))
SPP = int(os.environ.get("AO_SPP", 256))
DIST = float(os.environ.get("AO_DIST", 0.3))         # 그늘 거리(m)
TEXEL = float(os.environ.get("AO_TEXEL", 0.01))      # 텍셀 하나 = 1cm
MAXRES = int(os.environ.get("AO_MAXRES", 1024))
MINTRI = float(os.environ.get("AO_MINTRI", 0))       # 이보다 잘게 쪼개진 프리미티브는 그늘을 드리우기만(0 = 다리·손잡이까지 다 굽는다. 채움 56% → 46%)
WELD = float(os.environ.get("AO_WELD", 1e-4))       # 정점 붙이기 거리(m) — 0.1mm
PACK_PX = float(os.environ.get("AO_PACK_PX", 3))     # 섬 사이 여백(텍셀)
VFILL = float(os.environ.get("AO_VFILL", 0.2))      # 새로 편 UV 채움이 이보다 낮으면 이미지 대신 정점 그늘
OVERLAP_MAX = 0.02                                    # 기존 UV 겹침이 이보다 많으면 새로 편다

CT = {5126: np.float32, 5125: np.uint32, 5123: np.uint16, 5121: np.uint8, 5122: np.int16, 5120: np.int8}
NC = {"SCALAR": 1, "VEC2": 2, "VEC3": 3, "VEC4": 4, "MAT4": 16}


def load_glb(path):
    b = open(path, "rb").read()
    n = struct.unpack("<I", b[12:16])[0]
    g = json.loads(b[20:20 + n])
    off = 20 + n
    bin_ = b""
    if off < len(b):
        m = struct.unpack("<I", b[off:off + 4])[0]; bin_ = b[off + 8:off + 8 + m]
    return g, bin_


def view_bytes(g, bin_, vi):
    v = g["bufferViews"][vi]; o = v.get("byteOffset", 0)
    return bin_[o:o + v["byteLength"]]


def read_acc(g, bin_, i):
    a = g["accessors"][i]; bv = g["bufferViews"][a["bufferView"]]
    dt = np.dtype(CT[a["componentType"]]); n = NC[a["type"]]
    off = bv.get("byteOffset", 0) + a.get("byteOffset", 0); stride = bv.get("byteStride", 0) or dt.itemsize * n
    if stride == dt.itemsize * n:
        arr = np.frombuffer(bin_, dt, a["count"] * n, off).reshape(a["count"], n)
    else:
        arr = np.stack([np.frombuffer(bin_, dt, n, off + k * stride) for k in range(a["count"])])
    arr = arr.copy()
    if a.get("normalized") and dt != np.float32:
        arr = arr.astype(np.float32) / np.iinfo(dt).max
    return arr


def node_mats(g):
    out = {}
    def mat(n):
        if "matrix" in n: return Matrix([n["matrix"][c::4] for c in range(4)])
        t = Matrix.Translation(n.get("translation", [0, 0, 0]))
        r = n.get("rotation", [0, 0, 0, 1]); r = Quaternion((r[3], r[0], r[1], r[2])).to_matrix().to_4x4()
        s = n.get("scale", [1, 1, 1]); s = Matrix.Diagonal((*s, 1))
        return t @ r @ s
    def walk(i, parent):
        m = parent @ mat(g["nodes"][i]); out[i] = m
        for c in g["nodes"][i].get("children", []): walk(c, m)
    for r in g["scenes"][g.get("scene", 0)]["nodes"]: walk(r, Matrix.Identity(4))
    return out


def setup_gpu(sc):
    sc.render.engine = 'CYCLES'
    pr = bpy.context.preferences.addons['cycles'].preferences
    for kind in ("OPTIX", "CUDA"):
        try:
            pr.compute_device_type = kind; pr.get_devices()
            if any(d.type == kind for d in pr.devices):
                for d in pr.devices: d.use = d.type == kind
                sc.cycles.device = 'GPU'; return kind
        except TypeError: pass
    return "CPU"


def tri_area2(u):
    return 0.5 * np.abs((u[:, 1, 0] - u[:, 0, 0]) * (u[:, 2, 1] - u[:, 0, 1]) - (u[:, 2, 0] - u[:, 0, 0]) * (u[:, 1, 1] - u[:, 0, 1]))


def uv_overlap(tris, res=256):
    """UV 삼각형을 res 격자에 칠해 두 번 이상 칠해진 칸 비율(겹침) · 채움 비율. 칸 가운데만 보므로 맞닿은 변은 겹침이 아니다"""
    cnt = np.zeros((res, res), np.int32)
    for t in tris * res:
        x0, y0 = np.floor(t.min(0)).astype(int); x1, y1 = np.ceil(t.max(0)).astype(int)
        x0, y0 = max(x0, 0), max(y0, 0); x1, y1 = min(x1, res), min(y1, res)
        if x1 <= x0 or y1 <= y0: continue
        xs, ys = np.meshgrid(np.arange(x0, x1) + 0.5, np.arange(y0, y1) + 0.5)
        (ax, ay), (bx, by), (cx, cy) = t
        d = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
        if abs(d) < 1e-12: continue
        l1 = ((by - cy) * (xs - cx) + (cx - bx) * (ys - cy)) / d
        l2 = ((cy - ay) * (xs - cx) + (ax - cx) * (ys - cy)) / d
        inside = (l1 > 1e-6) & (l2 > 1e-6) & (1 - l1 - l2 > 1e-6)
        cnt[y0:y1, x0:x1] += inside
    used = (cnt > 0).sum()
    return (float((cnt > 1).sum() / used) if used else 1.0), float(used / res / res)


def bake_one(code):
    t0 = time.time()
    g, bin_ = load_glb(os.path.join(SRC, code + ".glb"))
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; dev = setup_gpu(sc)
    w = bpy.data.worlds.new("w"); sc.world = w; w.light_settings.distance = DIST
    mats = node_mats(g)
    gmats = g.get("materials", [])

    def bakeable(p):
        if "material" not in p: return True
        m = gmats[p["material"]]
        if m.get("alphaMode") == "BLEND": return False        # 유리·투명 — 그늘을 받지 않는다
        if "KHR_materials_unlit" in m.get("extensions", {}): return False
        return True

    prims, seen, skipped = [], set(), set()
    for ni, n in enumerate(g["nodes"]):
        if "mesh" not in n or ni not in mats: continue
        for pi, p in enumerate(g["meshes"][n["mesh"]]["primitives"]):
            if p.get("mode", 4) != 4: continue
            pos = read_acc(g, bin_, p["attributes"]["POSITION"]).astype(np.float64)
            idx = read_acc(g, bin_, p["indices"]).reshape(-1, 3).astype(np.int64) if "indices" in p else np.arange(len(pos)).reshape(-1, 3)
            M = np.array(mats[ni]); wp = (np.c_[pos, np.ones(len(pos))] @ M.T)[:, :3]
            ok = (idx[:, 0] != idx[:, 1]) & (idx[:, 1] != idx[:, 2]) & (idx[:, 0] != idx[:, 2])
            # 투명 재질(덧천·유리)은 가림막으로도 넣지 않는다 — 앱은 침구의 투명 천을 빼고(furnish.ts) 유리는 빛을 거의 가리지 않는다.
            # 넣었더니 안방 침구(3FO4ED8AJCQ0)의 투명 덧천(1.5cm 위)이 러너 윗면을 검게 구웠다(사용자 지적 2026-11-05)
            if os.environ.get("AO_SKIP_BLEND", "1") == "1" and "material" in p and gmats[p["material"]].get("alphaMode") == "BLEND":
                skipped.add((n["mesh"], pi)); continue
            me = bpy.data.meshes.new(f"p{len(prims)}")
            me.from_pydata(wp.tolist(), [], idx[ok].tolist())
            o = bpy.data.objects.new(me.name, me); sc.collection.objects.link(o)
            key = (n["mesh"], pi)
            t3 = wp[idx[ok]]
            mean_area = float(0.5 * np.linalg.norm(np.cross(t3[:, 1] - t3[:, 0], t3[:, 2] - t3[:, 0]), axis=1).mean()) if ok.any() else 0.0
            if key in seen or key in skipped: continue                       # 같은 메시를 또 쓰는 노드 — 가림막으로만
            if mean_area < MINTRI or not bakeable(p): skipped.add(key); continue
            seen.add(key)
            nr = None
            if "NORMAL" in p["attributes"]:
                nr = read_acc(g, bin_, p["attributes"]["NORMAL"]).astype(np.float64) @ np.array(mats[ni].to_3x3().inverted().transposed()).T
                nr /= np.maximum(np.linalg.norm(nr, axis=1, keepdims=True), 1e-9)
            pk = len(prims)
            # 정점 번호는 모서리(CORNER) 속성으로 — 아래에서 정점을 붙여도(weld) 모서리마다 원래 번호가 남는다
            me.attributes.new("ovid", 'INT', 'CORNER').data.foreach_set("value", idx[ok].astype(np.int32).ravel())
            me.attributes.new("pk", 'INT', 'FACE').data.foreach_set("value", np.full(int(ok.sum()), pk, np.int32))
            me.attributes.new("tid", 'INT', 'FACE').data.foreach_set("value", np.nonzero(ok)[0].astype(np.int32))
            uv1 = read_acc(g, bin_, p["attributes"]["TEXCOORD_1"]) if "TEXCOORD_1" in p["attributes"] else None
            prims.append(dict(node=ni, mesh=n["mesh"], prim=pi, p=p, idx=idx, ok=ok, nv=len(wp), obj=o, uv1=uv1, nr=nr))
    if not prims:
        print(f"SKIP {code} 구울 메시 없음"); return None

    # 기존 두 번째 UV 를 쓸 수 있나 — 전부 있고, 0~1 안이고, 겹침이 적어야 한다
    reuse, why = False, "없음"
    if all(pr["uv1"] is not None for pr in prims):
        allt = np.concatenate([pr["uv1"][pr["idx"][pr["ok"]]] for pr in prims]).astype(np.float64)
        allt[..., 1] = 1 - allt[..., 1]
        lo, hi = allt.min(), allt.max()
        if lo < -1e-3 or hi > 1 + 1e-3: why = f"0~1 밖({lo:.2f}~{hi:.2f})"
        else:
            ov, fl = uv_overlap(allt)
            why = f"겹침 {ov:.1%} 채움 {fl:.0%}"
            reuse = ov <= OVERLAP_MAX and fl >= 0.2

    bpy.ops.object.select_all(action='DESELECT')
    for pr in prims: pr["obj"].select_set(True)
    bpy.context.view_layer.objects.active = prims[0]["obj"]
    bpy.ops.object.join(); J = bpy.context.object
    # 같은 자리 정점을 붙인다 — glTF 는 UV·법선 이음매마다 정점이 갈라져 있어(삼각형마다 따로인 모델도 있다) 그대로 펴면
    # 삼각형마다 섬이 되어 여백이 그늘 이미지를 다 먹었다(의자 BLIC00600 채움 1%, 실측 2026-11-04)
    nv0 = len(J.data.vertices)
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=WELD); bpy.ops.object.mode_set(mode='OBJECT')
    weld = (nv0, len(J.data.vertices))
    # 굽기 법선 — 모서리마다 원래 법선(붙이면서 섞이지 않게)
    me = J.data
    cov = np.empty(len(me.loops), np.int32); me.attributes["ovid"].data.foreach_get("value", cov)
    fpk_ = np.empty(len(me.polygons), np.int32); me.attributes["pk"].data.foreach_get("value", fpk_)
    lpk = np.repeat(fpk_, 3) if len(me.loops) == 3 * len(me.polygons) else np.array([fpk_[pl.index] for pl in me.polygons for _ in pl.loop_indices])
    ln = np.zeros((len(me.loops), 3))
    have = False
    for k, pr in enumerate(prims):
        if pr["nr"] is None: continue
        sel = lpk == k; ln[sel] = pr["nr"][cov[sel]]; have = True
    if have:
        bad = np.linalg.norm(ln, axis=1) < 0.5
        if bad.any():
            me.calc_normals_split() if hasattr(me, "calc_normals_split") else None
            ln[bad] = np.array([me.loops[i].normal for i in np.nonzero(bad)[0]])
        me.normals_split_custom_set(ln.tolist())
    area = sum(f.area for f in J.data.polygons)
    res = 1 << max(7, min(int(math.log2(MAXRES)), math.ceil(math.log2(math.sqrt(area / 0.55) / TEXEL))))
    J.data.uv_layers.new(name="AO"); J.data.uv_layers.active = J.data.uv_layers["AO"]
    me = J.data
    if reuse:
        # 합친 메시 모서리 순서 = 프리미티브 순서대로 남은 삼각형 순서 — pk·tid 로 원래 UV 를 꽂는다
        fpk = np.empty(len(me.polygons), np.int32); me.attributes["pk"].data.foreach_get("value", fpk)
        ftid = np.empty(len(me.polygons), np.int32); me.attributes["tid"].data.foreach_get("value", ftid)
        cor = cov.reshape(-1, 3); uvs = np.zeros((len(me.polygons), 3, 2), np.float32)
        for pk, pr in enumerate(prims):
            sel = np.nonzero(fpk == pk)[0]
            u = pr["uv1"][cor[sel]]; u[..., 1] = 1 - u[..., 1]; uvs[sel] = u
        me.uv_layers["AO"].data.foreach_set("uv", uvs.ravel())
        mode = "기존 UV"
    else:
        bpy.ops.object.mode_set(mode='EDIT')
        sc.tool_settings.use_uv_select_sync = True       # 헤드리스에선 이게 없으면 UV 선택이 비어 아무것도 안 한다
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=2.0 / res, scale_to_bounds=False)
        bpy.ops.object.mode_set(mode='OBJECT')
        def get_uv():
            u = np.empty(len(J.data.loops) * 2, np.float32); J.data.uv_layers["AO"].data.foreach_get("uv", u); return u
        u0 = get_uv(); f0 = float(tri_area2(u0.reshape(-1, 3, 2)).sum())
        best = (f0 * res * res, res, u0)
        # smart_project 의 여백은 섬마다 붙어, 작은 섬이 수백 개(의자 볼트 1059 덩어리)면 채움이 1~3% 로 떨어졌다 —
        # 고정 여백(텍셀)으로 다시 싸고, 그래도 모자라면 해상도를 올려 쓸 수 있는 텍셀이 가장 많은 쪽을 고른다
        r = res
        while f0 < 0.35:
            bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.uv.select_all(action='SELECT')
            bpy.ops.uv.pack_islands(udim_source='CLOSEST_UDIM', rotate=True, margin_method='FRACTION', margin=PACK_PX / r, shape_method='CONCAVE')
            bpy.ops.object.mode_set(mode='OBJECT')
            u = get_uv(); f = float(tri_area2(u.reshape(-1, 3, 2)).sum())
            if os.environ.get("AO_DEBUG") == "1": print("PACK", code, r, round(f, 3), "smart", round(f0, 3), "uvbox", u.reshape(-1, 2).min(0).round(2), u.reshape(-1, 2).max(0).round(2))
            if f * r * r > best[0]: best = (f * r * r, r, u)
            if f >= 0.35 or r >= MAXRES: break
            r *= 2
        res = best[1]; J.data.uv_layers["AO"].data.foreach_set("uv", best[2])
        me = J.data
        mode = "새 UV"
    uv = np.empty(len(me.loops) * 2, np.float32); me.uv_layers["AO"].data.foreach_get("uv", uv); uv = uv.reshape(-1, 2)
    fill = float(tri_area2(uv.reshape(-1, 3, 2)).sum())
    if mode == "새 UV" and fill < VFILL:
        return bake_vertex(code, g, bin_, prims, skipped, J, sc, dev, t0, why, weld, fill)

    img = bpy.data.images.new("ao", res, res, float_buffer=True)
    m = bpy.data.materials.new("bake")
    tn = m.node_tree.nodes.new("ShaderNodeTexImage"); tn.image = img; m.node_tree.nodes.active = tn
    # 뒷면은 빛을 가리지 않게(투명) — 앱은 앞면만 그린다. 침구처럼 천이 겹친 모델은 위에서 안 보이는 뒷면(이불 안쪽 면)이 1~2cm 위에 떠 있어
    # 그 아래 러너 윗면이 검게 구워졌다(사용자 지적 2026-11-05 「오픈된 면에 라이트맵이 생겨 — 면이 겹친 곳 때문」, 실측: 러너 윗면 광선 절반이 이불 뒷면에 막힘)
    if os.environ.get("AO_BACKFACE", "0") == "1":
        nt = m.node_tree; out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')
        for n in [n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED']: nt.nodes.remove(n)
        geo = nt.nodes.new("ShaderNodeNewGeometry"); dif = nt.nodes.new("ShaderNodeBsdfDiffuse"); tr = nt.nodes.new("ShaderNodeBsdfTransparent"); mx = nt.nodes.new("ShaderNodeMixShader")
        nt.links.new(geo.outputs["Backfacing"], mx.inputs[0]); nt.links.new(dif.outputs[0], mx.inputs[1]); nt.links.new(tr.outputs[0], mx.inputs[2])
        nt.links.new(mx.outputs[0], out.inputs["Surface"])
        nt.nodes.active = tn
    me.materials.clear(); me.materials.append(m)
    sc.cycles.samples = SPP
    bpy.ops.object.select_all(action='DESELECT'); J.select_set(True); bpy.context.view_layer.objects.active = J
    tb = time.time()
    bpy.ops.object.bake(type='AO', margin=max(4, res // 64), margin_type='EXTEND', use_clear=True)
    tb = time.time() - tb
    px = np.empty(res * res * 4, np.float32); img.pixels.foreach_get(px); ao = px.reshape(res, res, 4)[..., 0]
    k3 = np.array([1, 2, 1], np.float32) / 4           # 잡티 줄이기 — 3×3 가중 평균
    pad = np.pad(ao, 1, mode='edge'); ao = sum(k3[i] * pad[i:i + res, 1:-1] for i in range(3))
    pad = np.pad(ao, ((0, 0), (1, 1)), mode='edge'); ao = sum(k3[i] * pad[:, i:i + res] for i in range(3))
    if os.environ.get("AO_DEBUG") == "2":
        fpk2 = np.empty(len(me.polygons), np.int32); me.attributes["pk"].data.foreach_get("value", fpk2)
        fn = np.empty(len(me.polygons) * 3, np.float32); me.polygons.foreach_get("normal", fn); fn = fn.reshape(-1, 3)
        cuv = uv.reshape(-1, 3, 2).mean(1)
        px_ = np.clip((cuv * res).astype(int), 0, res - 1); val = ao[px_[:, 1], px_[:, 0]]
        for k, pr in enumerate(prims):
            sel = (fpk2 == k) & (fn[:, 1] > 0.7)   # glTF 좌표 그대로(Y 위)
            if sel.any(): print("UPAO", code, g["meshes"][pr["mesh"]].get("name", ""), pr["prim"], round(float(val[sel].mean()), 3), int(sel.sum()))
    png_path = os.path.join(bpy.app.tempdir or DST, f"{code}.ao.png")
    out_png = bpy.data.images.new("ao_png", res, res); out_png.colorspace_settings.name = 'Non-Color'
    rgba = np.repeat(np.clip(ao, 0, 1)[..., None], 4, axis=2); rgba[..., 3] = 1
    out_png.pixels.foreach_set(rgba.ravel()); out_png.filepath_raw = png_path; out_png.file_format = 'PNG'; out_png.save()
    png = open(png_path, "rb").read(); os.remove(png_path)

    # 모서리마다 (원래 정점 번호, 그늘 UV) → 정점 나누기
    ovl = np.empty(len(me.loops), np.int32); me.attributes["ovid"].data.foreach_get("value", ovl)
    fpk = np.empty(len(me.polygons), np.int32); me.attributes["pk"].data.foreach_get("value", fpk)
    ftid = np.empty(len(me.polygons), np.int32); me.attributes["tid"].data.foreach_get("value", ftid)
    corner_ov = ovl.reshape(-1, 3); corner_uv = uv.reshape(-1, 3, 2)

    gl = json.loads(json.dumps(g))
    views = [view_bytes(g, bin_, i) for i in range(len(g.get("bufferViews", [])))]

    def add_view(data, target=None):
        gl["bufferViews"].append({"buffer": 0, "byteLength": len(data), **({"target": target} if target else {})})
        views.append(data); return len(gl["bufferViews"]) - 1

    def add(arr, ctype, typ, target=None, minmax=False, normalized=False):
        acc = {"bufferView": add_view(arr.tobytes(), target), "componentType": ctype, "count": int(arr.shape[0]), "type": typ}
        if normalized: acc["normalized"] = True
        if minmax: acc["min"] = arr.min(0).tolist(); acc["max"] = arr.max(0).tolist()
        gl["accessors"].append(acc); return len(gl["accessors"]) - 1

    ao_mats = set()
    for pk, pr in enumerate(prims):
        sel = fpk == pk
        ntri = len(pr["idx"])
        tri_ov = pr["idx"].copy()                      # 퇴화 삼각형은 원래 정점 그대로 + UV 0
        tri_uv2 = np.zeros((ntri, 3, 2), np.float32)
        tri_ov[ftid[sel]] = corner_ov[sel]; tri_uv2[ftid[sel]] = corner_uv[sel]
        keys = np.c_[tri_ov.reshape(-1), np.round(tri_uv2.reshape(-1, 2) * 1e6).astype(np.int64)]
        uk, inv = np.unique(keys, axis=0, return_inverse=True)
        inv = inv.reshape(-1)
        first = np.zeros(len(uk), np.int64); first[inv[::-1]] = np.arange(len(inv))[::-1]
        src_v = tri_ov.reshape(-1)[first]; uv2 = tri_uv2.reshape(-1, 2)[first]
        p = gl["meshes"][pr["mesh"]]["primitives"][pr["prim"]]; attrs = {}
        for name, ai in pr["p"]["attributes"].items():
            if name == "TEXCOORD_1": continue
            a = g["accessors"][ai]
            data = read_acc_raw(g, bin_, ai)[src_v]
            attrs[name] = add(np.ascontiguousarray(data), a["componentType"], a["type"], 34962, minmax=(name == "POSITION"), normalized=a.get("normalized", False))
        attrs["TEXCOORD_1"] = add(np.ascontiguousarray(np.c_[uv2[:, 0], 1 - uv2[:, 1]].astype(np.float32)), 5126, "VEC2", 34962)
        it = inv.astype(np.uint32 if len(uk) > 65535 else np.uint16)
        p["attributes"] = attrs; p["indices"] = add(it, 5125 if it.dtype == np.uint32 else 5123, "SCALAR", 34963)
        if "material" in p: ao_mats.add(p["material"])
    gl.setdefault("samplers", []).append({"magFilter": 9729, "minFilter": 9987, "wrapS": 33071, "wrapT": 33071})
    gl.setdefault("images", []).append({"bufferView": add_view(png), "mimeType": "image/png", "name": "ao_" + code})
    gl.setdefault("textures", []).append({"source": len(gl["images"]) - 1, "sampler": len(gl["samplers"]) - 1, "name": "ao_" + code})
    ti = len(gl["textures"]) - 1
    for mi in ao_mats: gl["materials"][mi]["occlusionTexture"] = {"index": ti, "texCoord": 1}
    # 굽지 않은 프리미티브가 구운 쪽과 재질을 같이 쓰면 그늘 없는 재질 사본으로 — 두 번째 UV 가 없어 그늘을 엉뚱하게 읽는다
    plain = {}
    for (mi_, pi_) in skipped:
        for p in gl["meshes"][mi_]["primitives"][pi_:pi_ + 1]:
            if p.get("material") in ao_mats:
                if p["material"] not in plain:
                    c = json.loads(json.dumps(g["materials"][p["material"]])); c.pop("occlusionTexture", None)
                    gl["materials"].append(c); plain[p["material"]] = len(gl["materials"]) - 1
                p["material"] = plain[p["material"]]
    gl.setdefault("extras", {})["ao"] = {"res": res, "uv": mode, "spp": SPP, "dist": DIST}
    write_glb(gl, views, os.path.join(DST, code + ".glb"))
    r = dict(code=code, uv=mode, uv1=why, weld=weld, tris=int(sum(int(pr["ok"].sum()) for pr in prims)), skipped=len(skipped), res=res, fill=round(fill, 2),
             ao_min=round(float(ao.min()), 2), ao_mean=round(float(ao.mean()), 2), bake=round(tb, 1), total=round(time.time() - t0, 1),
             kb_before=round(os.path.getsize(os.path.join(SRC, code + ".glb")) / 1024), kb_after=round(os.path.getsize(os.path.join(DST, code + ".glb")) / 1024), dev=dev)
    print("AO", json.dumps(r, ensure_ascii=False)); return r


def bake_vertex(code, g, bin_, prims, skipped, J, sc, dev, t0, why, weld, fill):
    """정점 그늘 — 조각이 수천 개인 촘촘한 모델(의자 BLIC00600 1059 덩어리·섬 1만 개)은 어떻게 펴도 그늘 이미지 채움이 1~3% 라
    이미지가 깨진다. 정점이 촘촘하니 정점마다 그늘 값을 굽는다(_AO 속성, 0 = 막힘 ~ 1 = 트임). 정점은 나누지 않는다"""
    # Cycles 정점 굽기는 정점 자리 그대로 재서, 부품끼리 박힌 정점(의자 정점의 14%)이 0(새까맣게)으로 나와 얼룩이 됐다 —
    # 직접 잰다: 법선으로 4mm 띄운 자리에서 반구 광선, 앞면에 DIST 안에서 막힌 비율. 뒷면을 많이 맞으면 박힌 정점 → 이웃(모서리로 이어진) 값으로 메운다
    from mathutils.bvhtree import BVHTree
    from mathutils import Vector
    me = J.data
    allv, allp = [], []
    for ob in sc.objects:
        if ob.type != 'MESH': continue
        mw = ob.matrix_world; base = len(allv)
        allv += [mw @ v.co for v in ob.data.vertices]
        allp += [[base + i for i in pl.vertices] for pl in ob.data.polygons]
    tree = BVHTree.FromPolygons(allv, allp, epsilon=0.0)
    NR = int(os.environ.get("AO_VRAYS", 48))
    dirs = []
    for k in range(NR):
        r = math.sqrt((k + 0.5) / NR); ph = k * 2.399963229728653
        dirs.append((r * math.cos(ph), r * math.sin(ph), math.sqrt(max(0.0, 1 - r * r))))
    nv = len(me.vertices)
    co = np.empty(nv * 3, np.float32); me.vertices.foreach_get("co", co); co = co.reshape(-1, 3)
    nr = np.empty(nv * 3, np.float32); me.vertices.foreach_get("normal", nr); nr = nr.reshape(-1, 3)
    mw = J.matrix_world
    vao = np.ones(nv, np.float32); bad = np.zeros(nv, bool)
    tb = time.time()
    for i in range(nv):
        n = (mw.to_3x3() @ Vector(nr[i])).normalized()
        if n.length < 0.5: continue
        o = mw @ Vector(co[i]) + n * 0.004
        t = Vector((1, 0, 0)) if abs(n.x) < 0.9 else Vector((0, 1, 0)); t = t.cross(n).normalized(); bt = n.cross(t)
        rot = ((i * 0.618034) % 1) * 2 * math.pi; cr, sr = math.cos(rot), math.sin(rot)
        hit = back = 0
        for (x0, y0, z) in dirs:
            x = x0 * cr - y0 * sr; y = x0 * sr + y0 * cr
            d = t * x + bt * y + n * z
            loc, hn, fi, dist = tree.ray_cast(o, d, DIST)
            if loc is None: continue
            if hn.dot(d) > 0: back += 1
            else: hit += 1
        if back > NR * 0.3: bad[i] = True
        else: vao[i] = 1 - hit / max(1, NR - back)
    tb = time.time() - tb
    # 박힌 정점 메우기 — 모서리 이웃 평균을 몇 번 번지게
    ev = np.empty(len(me.edges) * 2, np.int32); me.edges.foreach_get("vertices", ev); ev = ev.reshape(-1, 2)
    for _ in range(12):
        if not bad.any(): break
        good = ~bad
        s_ = np.zeros(nv); c_ = np.zeros(nv)
        for a_, b_ in ((0, 1), (1, 0)):
            m_ = good[ev[:, a_]] & bad[ev[:, b_]]
            np.add.at(s_, ev[m_, b_], vao[ev[m_, a_]]); np.add.at(c_, ev[m_, b_], 1)
        fixv = bad & (c_ > 0)
        vao[fixv] = s_[fixv] / c_[fixv]; bad[fixv] = False
    vao[bad] = 1.0
    lv = np.empty(len(me.loops), np.int32); me.loops.foreach_get("vertex_index", lv)
    col = vao[lv]
    ovl = np.empty(len(me.loops), np.int32); me.attributes["ovid"].data.foreach_get("value", ovl)
    fpk = np.empty(len(me.polygons), np.int32); me.attributes["pk"].data.foreach_get("value", fpk)
    lpk = np.repeat(fpk, 3)
    gl = json.loads(json.dumps(g))
    views = [view_bytes(g, bin_, i) for i in range(len(g.get("bufferViews", [])))]
    aoall = []
    for pk, pr in enumerate(prims):
        sel = lpk == pk
        s_ = np.zeros(pr["nv"]); n_ = np.zeros(pr["nv"])
        np.add.at(s_, ovl[sel], col[sel]); np.add.at(n_, ovl[sel], 1)
        ao = np.where(n_ > 0, s_ / np.maximum(n_, 1), 1.0).astype(np.float32)   # 어느 면에도 안 쓰인 정점은 트임
        aoall.append(ao)
        gl["bufferViews"].append({"buffer": 0, "byteLength": ao.nbytes, "target": 34962}); views.append(ao.tobytes())
        gl["accessors"].append({"bufferView": len(gl["bufferViews"]) - 1, "componentType": 5126, "count": int(len(ao)), "type": "SCALAR"})
        gl["meshes"][pr["mesh"]]["primitives"][pr["prim"]]["attributes"]["_AO"] = len(gl["accessors"]) - 1
    gl.setdefault("extras", {})["ao"] = {"vertex": True, "spp": SPP, "dist": DIST}
    write_glb(gl, views, os.path.join(DST, code + ".glb"))
    a = np.concatenate(aoall)
    r = dict(code=code, uv="정점", uv1=why, weld=weld, tris=int(sum(int(pr["ok"].sum()) for pr in prims)), skipped=len(skipped), res=0, fill=round(fill, 2),
             ao_min=round(float(a.min()), 2), ao_mean=round(float(a.mean()), 2), bake=round(tb, 1), total=round(time.time() - t0, 1),
             kb_before=round(os.path.getsize(os.path.join(SRC, code + ".glb")) / 1024), kb_after=round(os.path.getsize(os.path.join(DST, code + ".glb")) / 1024), dev=dev)
    print("AO", json.dumps(r, ensure_ascii=False)); return r


def read_acc_raw(g, bin_, i):
    """정규화 풀지 않은 원래 자료형 그대로"""
    a = g["accessors"][i]; bv = g["bufferViews"][a["bufferView"]]
    dt = np.dtype(CT[a["componentType"]]); n = NC[a["type"]]
    off = bv.get("byteOffset", 0) + a.get("byteOffset", 0); stride = bv.get("byteStride", 0) or dt.itemsize * n
    if stride == dt.itemsize * n:
        return np.frombuffer(bin_, dt, a["count"] * n, off).reshape(a["count"], n).copy()
    return np.stack([np.frombuffer(bin_, dt, n, off + k * stride) for k in range(a["count"])])


def write_glb(gl, views, path):
    """쓰는 accessor·bufferView 만 남겨 버퍼 하나로 다시 싼다(바뀐 정점 자료의 옛 사본을 버린다)"""
    used_acc = set()
    for m in gl.get("meshes", []):
        for p in m["primitives"]:
            used_acc.update(p["attributes"].values())
            if "indices" in p: used_acc.add(p["indices"])
            for t in p.get("targets", []): used_acc.update(t.values())
    for s in gl.get("skins", []):
        if "inverseBindMatrices" in s: used_acc.add(s["inverseBindMatrices"])
    for an in gl.get("animations", []):
        for s in an["samplers"]: used_acc.update((s["input"], s["output"]))
    amap = {o: n for n, o in enumerate(sorted(used_acc))}
    accs = [gl["accessors"][o] for o in sorted(used_acc)]
    used_v = {a["bufferView"] for a in accs if "bufferView" in a} | {im["bufferView"] for im in gl.get("images", []) if "bufferView" in im}
    vmap = {o: n for n, o in enumerate(sorted(used_v))}
    out, nv = bytearray(), []
    for o in sorted(used_v):
        while len(out) % 8: out.append(0)
        v = dict(gl["bufferViews"][o]); v["buffer"] = 0; v["byteOffset"] = len(out); v["byteLength"] = len(views[o]); nv.append(v); out += views[o]
    while len(out) % 4: out.append(0)
    for a in accs:
        if "bufferView" in a: a["bufferView"] = vmap[a["bufferView"]]
    for im in gl.get("images", []):
        if "bufferView" in im: im["bufferView"] = vmap[im["bufferView"]]
    for m in gl.get("meshes", []):
        for p in m["primitives"]:
            p["attributes"] = {k: amap[v] for k, v in p["attributes"].items()}
            if "indices" in p: p["indices"] = amap[p["indices"]]
            if "targets" in p: p["targets"] = [{k: amap[v] for k, v in t.items()} for t in p["targets"]]
    for s in gl.get("skins", []):
        if "inverseBindMatrices" in s: s["inverseBindMatrices"] = amap[s["inverseBindMatrices"]]
    for an in gl.get("animations", []):
        for s in an["samplers"]: s["input"] = amap[s["input"]]; s["output"] = amap[s["output"]]
    gl["accessors"] = accs; gl["bufferViews"] = nv
    gl["buffers"] = [{"byteLength": len(out)}]
    js = json.dumps(gl, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    js += b" " * (-len(js) % 4)
    total = 12 + 8 + len(js) + 8 + len(out)
    with open(path, "wb") as f:
        f.write(struct.pack("<III", 0x46546C67, 2, total))
        f.write(struct.pack("<II", len(js), 0x4E4F534A)); f.write(js)
        f.write(struct.pack("<II", len(out), 0x004E4942)); f.write(bytes(out))


os.makedirs(DST, exist_ok=True)
done = []
for c in CODES:
    try:
        if bake_one(c): done.append(c)
    except Exception as e:
        import traceback; traceback.print_exc(); print("FAIL", c, e)
print("DONE", len(done), "/", len(CODES))
