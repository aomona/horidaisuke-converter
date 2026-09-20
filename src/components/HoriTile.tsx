import { FALLBACK_IMAGE_URL } from '../default-image';

interface HoriTileProps {
  src: string;
  fill: number;
  alt: string;
}

function handleImgError(e: Event) {
  const img = e.currentTarget as HTMLImageElement;
  if (!img.src.startsWith('data:')) {
    img.src = FALLBACK_IMAGE_URL;
  }
}

export function HoriTile({ src, fill, alt }: HoriTileProps) {
  if (fill >= 1) {
    return (
      <div class="tile">
        <img src={src} alt={alt} onError={handleImgError} />
      </div>
    );
  }

  return (
    <div class="tile partial" style={{ '--fill': String(fill) }}>
      <img class="dim" src={src} alt={alt} onError={handleImgError} />
      <img class="fill" src={src} alt={alt} onError={handleImgError} />
      <div class="edge" />
    </div>
  );
}
