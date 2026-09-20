# 堀大輔コンバーター

睡眠時間を入力すると **30分 = 1堀大輔 = 画像1枚** として可視化するコンバーター。

- 例: 2時間 → **4 堀大輔**（画像4枚） / 0.5時間 → **1 堀大輔**
- 端数はメーター表示: 画像の左から塗られ、残りは半透明＋減光
  - 例: 15分 → 半分だけ表示（`0.5 堀大輔`、`--fill: 0.5`）
- 公開URL: https://horidaisuke-converter.lolipop-now.app/

## 使い方

1. 「睡眠時間」に時間（小数OK、例 `7.5`）を入力 → ライブで変換表示
2. プリセットチップ（6〜8時間）でも入力可
3. 「画像を変更」またはドラッグ&ドロップでカスタム画像に差し替え（512px の WebP に縮小して localStorage に保存）
4. 「デフォルトに戻す」でリセット

## 開発

```bash
npm install
npm run dev       # http://localhost:5173/
npm run build     # tsc --noEmit && vite build → dist/
npm run preview
```

## 構成

```
src/units.ts          変換ロジック（30分=1堀大輔、端数計算、書式整形。純関数）
src/app.tsx           画面全体・入力・画像アップロード・localStorage 永続化
src/components/       HoriTile（端数メーター描画）/ HoriGrid（タイル生成）
src/default-image.ts  デフォルト画像URL（公式YouTubeアイコン）と内蔵SVGフォールバック
vite.config.ts        preact プラグイン + アイコンの <link rel="preload"> 注入
```

端数タイルは同一画像2レイヤーで描画: 下地は `opacity: .32` + `brightness(.55)`、上層を `clip-path: inset(0 (1-fill) 0 0)` で左から塗り、境界に 2px の白ラインを重ねる。

## デプロイ

- ロリポップ！デプロイナウ（framework: `static`）
  - install: `npm ci --ignore-scripts --include=dev`
  - build: `npm run build`
  - output: `dist`
- CLI: `lolipop deploy`（`dist` / `node_modules` は `.gitignore` 済みのためアップロードされない）
- GitHub 連携後は `main` への push で自動デプロイ

## 画像の取り扱い

- デフォルト画像は堀大輔氏の公式YouTubeチャンネルアイコンを公式CDN（`yt3.googleusercontent.com`）から**実行時に直接読み込む**方式。リポジトリ・ビルド成果物には再配布していない。読み込み失敗時は内蔵SVGに自動フォールバックする（オフライン等）。
- カスタム画像はブラウザ内（localStorage）にのみ保存され、サーバには送信されない。
