# 붙박이장 셀프 플래너 API 스냅샷(tools/api_snapshot) → public/data/catalog.json (앱이 읽는 압축 카탈로그)
# 스냅샷 출처: gateway.hanssem.com/hanssem/simulator-service/api/v1 (groups/types, plans/type/{id}, plans/search, plans/{id})
import glob, json, os, sys, io, urllib.request, urllib.parse, hashlib
from PIL import Image, ImageStat

HERE = os.path.dirname(os.path.abspath(__file__))
SNAP = os.path.join(HERE, 'api_snapshot')
OUT = os.path.join(HERE, '..', 'public', 'data', 'catalog.json')

def load(name):
    with open(os.path.join(SNAP, name), encoding='utf-8') as f:
        return json.load(f)['data']

def price(c):
    g = c.get('goods') or {}
    return round((g.get('retailCustomerPrice') or 0) + (g.get('retailBuildingPrice') or 0))   # 판매가 + 시공비 (시뮬레이터 총액과 일치)

def image(c, kind):
    ims = [i for i in (c.get('images') or []) if i['imageType'] == kind]
    return ims[0]['file']['fileUrl'] if ims else None

contents, plans, types = {}, {}, []
for f in sorted(glob.glob(os.path.join(SNAP, 'plan_*.json'))):
    if f.endswith('plan_index.json'):
        continue
    d = json.load(open(f, encoding='utf-8'))['data']
    for c in d['contents']:
        contents[c['contentsId']] = {
            'id': c['contentsId'], 'kind': c['contentsType'], 'name': c['contentsName'],
            'w': c['length'], 'd': c['depth'], 'h': c['height'],
            'detail': c['bodyDetailType'], 'drawers': c['bodyDrawerCount'], 'bodyColor': c['bodyColor'],
            'doorType': c['doorType'], 'doorColorId': c['doorColorId'], 'mirror': c['isMirrorDoor'],
            'loc': c['doorInstallLocation'], 'surType': c['surroundingType'], 'panelLoc': c['panelInstallLocation'],
            'price': price(c), 'code': (c.get('goods') or {}).get('goodsCode'),
            'thumb': image(c, 'THUMBNAIL'), 'detailImg': image(c, 'DETAILS'),
            # 원본 Unity 에셋 번들 → public/models/{bundle}.gltf (tools/convert_bundles.py)
            'bundle': os.path.basename((c.get('assetBundleFile') or {}).get('fileName') or '').replace('.assetbundle', '') or None,
        }
    by_kind = lambda k: [c['contentsId'] for c in d['contents'] if c['contentsType'] == k]
    plans[d['planId']] = {
        'id': d['planId'], 'typeId': d['type']['typeId'],
        'min': d['planMinimumLength'], 'max': d['planMaximumLength'],
        'side': d['sideSurroundingLength'], 'top': d['topSurroundingLength'],
        'sideCut': [d['minimumSurroundingCutSize'], d['maximumSurroundingCutSize']],
        'height': [d['minimumHeight'], d['maximumHeight']], 'depth': d['depth'], 'movable': d['isBodyMovable'],
        'slots': [{
            'seq': g['groupSeq'], 'name': g['bodyGroupName'], 'w': g['length'], 'rep': g['representativeBodyContentsId'],
            'doorLoc': g['doorInstallLocation'],
            'bodies': [{'id': b['contentsId'], 'doors': [x['doorContentsId'] for x in b['replaceableDoors']]} for b in sorted(g['bodies'], key=lambda b: b['bodySeq'])],
        } for g in sorted(d['replaceableBodies'], key=lambda g: g['groupSeq'])],
        'surroundings': by_kind('SURROUNDING'), 'panels': by_kind('PANEL'), 'accessories': by_kind('ACCESSORY'),
        'baseboards': by_kind('BASEBOARD'), 'rails': by_kind('RAIL'),
        'included': [{'id': p['contentsId'], 'qty': p['contentsQuantity']} for p in d['planContentsList']],
    }

groups = load('groups.json')
for g in groups['typeGroups']:
    for t in g['typeList']:
        td = load(f"type_{t['typeId']}.json")
        types.append({
            'id': t['typeId'], 'name': t['typeName'], 'image': t['typeImageUrl'],
            'group': g['groupName'], 'groupDesc': g['groupDescription'],
            'doorType': t['doorType'], 'min': t['minimumTypeSize'], 'max': t['maximumTypeSize'],
            'bodyColor': t['bodyColor'], 'baseboard': t['baseBoardId'],
            'doorColors': [{
                'id': c['doorColorId'], 'name': c['doorColorName'], 'lineup': c['lineUpName'], 'lineupDesc': c['lineUpDescription'],
                'mirror': c['isMirrorDoor'], 'seq': (c['lineUpSeq'], c['doorColorSeq']),
                'image': next((i['doorColorImageUrl'] for i in c['doorColorImageList'] if i['doorColorIsRepresentive']), None),
                'images': [i['doorColorImageUrl'] for i in sorted(c['doorColorImageList'], key=lambda i: i['doorColorImageSeq'])],
            } for c in sorted(td['doorColorList'], key=lambda c: (c['lineUpSeq'], c['doorColorSeq']))],
            'plans': sorted([p['id'] for p in plans.values() if p['typeId'] == t['typeId']], key=lambda i: plans[i]['min']),
        })

# ---- 이미지 로컬 저장(인터넷 없이 동작) + 도어 컬러 대표색
IMG = os.path.join(HERE, '..', 'public', 'img')
os.makedirs(IMG, exist_ok=True)
def local(url):
    if not url:
        return None
    ext = os.path.splitext(urllib.parse.urlparse(url).path)[1] or '.jpg'
    name = hashlib.md5(url.encode()).hexdigest()[:16] + ext.lower()
    path = os.path.join(IMG, name)
    if not os.path.exists(path):
        try:
            req = urllib.request.Request(urllib.parse.quote(url, safe=':/'), headers={'User-Agent': 'Mozilla/5.0'})
            open(path, 'wb').write(urllib.request.urlopen(req, timeout=30).read())
        except Exception as e:
            print('image fail', url, e); return url
    return 'img/' + name
def tint(path):
    try:
        im = Image.open(os.path.join(IMG, os.path.basename(path))).convert('RGB')
        w, h = im.size
        m = ImageStat.Stat(im.crop((int(w * .08), int(h * .1), int(w * .38), int(h * .9)))).mean
        return '#%02x%02x%02x' % tuple(int(v) for v in m)
    except Exception:
        return None
for c in contents.values():
    c['thumb'] = local(c['thumb']); c['detailImg'] = local(c['detailImg'])
for t in types:
    t['image'] = local(t['image'])
    for dc in t['doorColors']:
        dc['image'] = local(dc['image']); dc['images'] = [local(u) for u in dc['images'][:4]]
        # 슬라이딩 견본 이미지는 방 사진이라 평균색이 어둡다 → 이름으로 추정(model.ts guessDoorHex)
        dc['hex'] = None if dc['mirror'] or t['doorType'] == 'SLIDING' or not dc['image'] or dc['image'].startswith('http') else tint(dc['image'])

os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump({'source': 'store.hanssem.com/storage-simulator', 'snapshot': '2026-10-27', 'types': types,
           'plans': plans, 'contents': contents}, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('types', len(types), 'plans', len(plans), 'contents', len(contents), 'bytes', os.path.getsize(OUT))
