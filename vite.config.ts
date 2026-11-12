import { defineConfig, loadEnv } from 'vite';
import { appendFileSync, mkdirSync, readFileSync, realpathSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { relative } from 'node:path';
// 사내망 노트북 접속(LAN=1) — 0.0.0.0:5211 https(자체 인증서 .cert/, 저장소 제외). WebGPU 는 https 에서만 켜진다.
// 평소 개발 서버(127.0.0.1:5210 http)는 그대로 두고 따로 띄운다: LAN=1 npx vite
const LAN = process.env.LAN === '1';
// node_modules 는 다른 웹 프로젝트 설치본을 연결(junction)해 쓴다 — three 0.186 · @meimu/mutracer · vite 6
// public/engines 의 ② 라이트맵 굽기 · ③ 서펠 GI 는 시험 앱(라이트맵 굽기 · 서펠 GI)의 임베드 빌드다
// 원본 자산 폴더(VITE_ASSET_ROOT) — 저장소 밖 .env.local 에 적는다(소품 시트 도구 전용)
const ASSET_ROOT = loadEnv('development', process.cwd(), 'VITE_').VITE_ASSET_ROOT;
// node_modules 연결(junction)의 실제 위치
const DEPS = (() => { try { return relative(process.cwd(), realpathSync('node_modules')); } catch { return 'node_modules'; } })();

// 빌드 표시 — 불러오기 기록(src/loadlog.ts)에 어느 판에서 잰 것인지 남긴다
const BUILD = { hash: (() => { try { return execSync('git rev-parse --short HEAD').toString().trim(); } catch { return '?'; } })(), time: new Date().toISOString() };

export default defineConfig({
  base: './',
  define: { __BUILD__: JSON.stringify(BUILD) },
  plugins: [{
    // 불러오기 기록 받기 — 화면이 한 건 끝낼 때마다 보낸다(src/loadlog.ts). 사내망 노트북(5211)에서 잰 것도 여기로 바로 모인다
    name: 'loadlog',
    configureServer(server) {
      server.middlewares.use('/__loadlog', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = '';
        req.on('data', c => { body += c; if (body.length > 2e6) req.destroy(); });
        req.on('end', () => {
          try {
            const j = JSON.parse(body);
            j.from = req.socket.remoteAddress; j.got = new Date().toISOString();
            mkdirSync('logs', { recursive: true });
            appendFileSync('logs/loadlog.jsonl', JSON.stringify(j) + '\n');
            res.end('ok');
          } catch (e) { res.statusCode = 400; res.end(String(e)); }
        });
      });
    },
  }],
  server: {
    port: LAN ? 5211 : 5210, strictPort: true, host: LAN ? '0.0.0.0' : '127.0.0.1',
    https: LAN ? { key: readFileSync('.cert/key.pem'), cert: readFileSync('.cert/cert.pem') } : undefined,
    // node_modules 연결(junction)의 실제 위치 — 빠지면 MuTracer 의 bvh.worker.js 를 「serving allow list 밖」이라며 못 내준다
    // 홈뷰 변환 상품(원본 자산 폴더/homvue/glb) — 소품 고르기·썸네일 도구(tools/props-sheet.html)에서만 읽는다. 앱은 public/props 사본을 쓴다
    fs: { allow: ['.', DEPS, ...(ASSET_ROOT ? [`${ASSET_ROOT}/homvue/glb`] : [])] },
  },
  build: { target: 'es2022' },
  // 의존성 캐시는 이 프로젝트 안에 — node_modules 가 다른 프로젝트와 같은 폴더라 기본 위치(node_modules/.vite)면 서로 덮는다
  cacheDir: LAN ? '.vite-cache-lan' : '.vite-cache',
  // MuTracer 는 노이즈 제거(OIDN) 가중치를 패키지 안에서 읽는다 — 미리 묶으면 경로가 바뀌어 못 읽는다(MuTracer 안내)
  optimizeDeps: { exclude: ['@meimu/mutracer'] },
});
