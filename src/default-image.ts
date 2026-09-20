const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="64" fill="url(#bg)"/>
  <circle cx="420" cy="92" r="8" fill="#ffffff" opacity="0.7"/>
  <circle cx="360" cy="140" r="5" fill="#ffffff" opacity="0.5"/>
  <circle cx="80" cy="120" r="6" fill="#ffffff" opacity="0.6"/>
  <circle cx="140" cy="60" r="4" fill="#ffffff" opacity="0.4"/>
  <circle cx="400" cy="160" r="3" fill="#ffffff" opacity="0.5"/>
  <circle cx="420" cy="92" r="18" fill="#fde68a" opacity="0.15"/>
  <circle cx="435" cy="78" r="14" fill="#1e1b4b"/>
  <g transform="translate(180, 280)">
    <circle cx="60" cy="20" r="28" fill="#e9d5ff"/>
    <path d="M 20 48 Q 60 10 140 48 Q 140 120 20 120 Z" fill="#ddd6fe"/>
    <path d="M 20 48 Q 60 10 140 48" fill="none" stroke="#c4b5fd" stroke-width="3"/>
  </g>
  <text x="320" y="180" font-size="48" fill="#c4b5fd" font-family="sans-serif">Z</text>
  <text x="360" y="150" font-size="36" fill="#a78bfa" font-family="sans-serif">z</text>
  <text x="390" y="125" font-size="24" fill="#8b5cf6" font-family="sans-serif">z</text>
</svg>`;

export const FALLBACK_IMAGE_URL =
  'data:image/svg+xml,' + encodeURIComponent(FALLBACK_SVG);

// 公式YouTubeチャンネルのアイコン（権利の都合で再配信せず、公式CDNから直接読み込む）
export const DEFAULT_IMAGE_URL =
  'https://yt3.googleusercontent.com/g_6ab3r2IAd75F8NXdp0BZAoiy1rzxM-9aNt1vU1eYVKMu_NrAKxESsR4owGE1XC0tkwmhAL=s512-c-k-c0x00ffffff-no-rj';
