"""쿠지알러 기업 재질 라이브러리(내려받아 둔 사본) → 셀프 플래너 바닥재·벽지.

읽기만 한다 — {VITE_ASSET_ROOT}/kujiale/brandgoods/lib-39.json(재질 라이브러리 목록)과
{VITE_ASSET_ROOT}/kujiale/resources/02_재질라이브러리(이미지, 파일명 = 이름_등록일시).
이미지 한 장이 덮는 실제 크기 = tableModelExtendInfo.boundingBox(mm, x = 이미지 가로).
판매 중만: (단종)·(사용X)·시즌오프·접수중지·테스트 제외, [소진후단종]·[재고관리대상]은 포함.

실행: python -I tools/import_kujiale_surfaces.py  →  public/tex/kjl/*.jpg · public/data/surfaces.json
"""
import datetime, glob, json, os, re
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

KJL = asset_root() + '/kujiale'
RES = f'{KJL}/resources/02_재질라이브러리/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'tex', 'kjl')
SKIP = ('단종)', '(사용X)', '사용X', '시즌오프', '시즌오픈', '접수중지', '테스트')


def local_file(it, folder):
    ts = datetime.datetime.fromtimestamp(it['created'] / 1000).strftime('%Y%m%d_%H%M%S')
    c = glob.glob(RES + glob.escape(folder) + '/' + glob.escape(it['name'].replace('/', '_')) + '_' + ts + '.*')
    return c[0] if c else None


def clean(name):
    name = re.sub(r'^\s*(\[[^\]]*\]|\([^)]*\))\s*', '', name)      # 앞 [소진후단종_..] 같은 표시
    return re.sub(r'\s*\([\d.,]+\s*㎡\)\s*$', '', name).strip()     # 뒤 (1.62㎡)


def main():
    os.makedirs(OUT, exist_ok=True)
    items = json.load(open(f'{KJL}/brandgoods/lib-39.json', encoding='utf-8'))['items']
    res = {'floor': [], 'wall': []}
    seen = set()
    for it in items:
        folder = (it.get('_folders') or [''])[0]
        if folder.startswith('마루(원자재)'): kind = 'floor'
        elif folder.startswith('벽지'): kind = 'wall'
        else: continue
        if any(s in folder or s in it['name'] for s in SKIP) or it['name'].startswith('(단종'):
            continue
        ext = it['tableModelExtendInfo']
        bb = ext.get('boundingBox') or {}
        if not bb.get('x') or not bb.get('y'): continue
        src = local_file(it, folder)
        if not src: continue
        key = (clean(it['name']), ext.get('brandGoodCode'))
        if key in seen: continue
        seen.add(key)
        gid = str(it['brandGoodId'])
        im = Image.open(src).convert('RGB')
        if max(im.size) > 1024: im.thumbnail((1024, 1024))
        im.save(os.path.join(OUT, f'{gid}.jpg'), quality=86)
        th = im.copy(); s = min(th.size); th = th.crop((0, 0, s, s)).resize((112, 112))
        th.save(os.path.join(OUT, f'{gid}_t.jpg'), quality=80)
        parts = folder.split('/')
        group = parts[1] if len(parts) > 1 else '벽지'
        if kind == 'wall' and group == '신한벽지' and len(parts) > 2: group = '신한 ' + parts[2]
        res[kind].append({
            'id': gid, 'name': clean(it['name']), 'code': ext.get('brandGoodCode'), 'group': group,
            'series': parts[2] if kind == 'floor' and len(parts) > 2 else '',
            'size': [bb['x'] / 1000, bb['y'] / 1000], 'uvMeters': 1,
            'map': f'tex/kjl/{gid}.jpg', 'thumb': f'tex/kjl/{gid}_t.jpg',
        })
    for k in res: res[k].sort(key=lambda r: (r['group'], r['series'], r['name']))
    json.dump(res, open(os.path.join(ROOT, 'public', 'data', 'surfaces.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    for k, v in res.items():
        groups = {}
        for r in v: groups[r['group']] = groups.get(r['group'], 0) + 1
        print(k, len(v), groups)


if __name__ == '__main__':
    main()
