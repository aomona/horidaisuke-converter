import { HoriTile } from './HoriTile';

interface HoriGridProps {
  src: string;
  full: number;
  partial: number;
  rem: number;
}

export function HoriGrid({ src, full, partial, rem }: HoriGridProps) {
  const tiles: { key: string; fill: number; alt: string }[] = [];

  for (let i = 0; i < full; i++) {
    tiles.push({ key: `f${i}`, fill: 1, alt: '堀大輔（30分）' });
  }

  if (partial > 0) {
    tiles.push({
      key: 'p',
      fill: partial,
      alt: `堀大輔（端数${rem}分）`,
    });
  }

  return (
    <div class="grid">
      {tiles.map((t) => (
        <HoriTile key={t.key} src={src} fill={t.fill} alt={t.alt} />
      ))}
    </div>
  );
}
