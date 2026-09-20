import { useState, useRef, useCallback } from 'preact/hooks';
import {
  parseHours,
  toMinutes,
  toHori,
  splitHori,
  formatHori,
  formatDuration,
} from './units';
import { DEFAULT_IMAGE_URL } from './default-image';
import { HoriGrid } from './components/HoriGrid';

function loadImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('not image'));
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 512;
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > max || h > max) {
        const scale = Math.min(max / w, max / h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error('no context'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      try {
        const data = canvas.toDataURL('image/webp', 0.92);
        resolve(data);
      } catch {
        try {
          const data = canvas.toDataURL('image/png');
          resolve(data);
        } catch (e) {
          reject(e);
        }
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('load error'));
    };
    img.src = url;
  });
}

function readStoredImage(): string | null {
  try {
    return localStorage.getItem('horidaisuke:image:v1');
  } catch {
    return null;
  }
}

function saveStoredImage(data: string) {
  try {
    localStorage.setItem('horidaisuke:image:v1', data);
  } catch {
    // quota error — keep in memory only
  }
}

function removeStoredImage() {
  try {
    localStorage.removeItem('horidaisuke:image:v1');
  } catch {
    // ignore
  }
}

const PRESETS = ['6', '6.5', '7', '7.5', '8'];

export function App() {
  const [raw, setRaw] = useState('');
  const [customSrc, setCustomSrc] = useState<string | null>(readStoredImage);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const hours = parseHours(raw);
  const minutes = hours !== null ? toMinutes(hours) : 0;
  const hori = toHori(minutes);
  const { full, partial } = splitHori(minutes);
  const rem = minutes % 30;
  const hasValue = hours !== null && hours > 0;
  const effectiveSrc = customSrc ?? DEFAULT_IMAGE_URL;

  const handleInput = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement;
    setRaw(target.value);
  }, []);

  const handlePreset = useCallback((val: string) => {
    setRaw(val);
  }, []);

  const handleFile = useCallback(async (file: File) => {
    try {
      const data = await loadImageFile(file);
      setCustomSrc(data);
      saveStoredImage(data);
    } catch {
      // silently ignore non-image or load errors
    }
  }, []);

  const handleFileInput = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) handleFile(file);
    target.value = '';
  }, [handleFile]);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer?.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleReset = useCallback(() => {
    setCustomSrc(null);
    removeStoredImage();
  }, []);

  return (
    <div
      class={`app ${dragOver ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div class="container">
        <header>
          <h1>堀大輔コンバーター</h1>
          <p class="subtitle">30分 = 1堀大輔</p>
        </header>

        <section class="card input-card">
          <label class="input-label">
            <span>睡眠時間</span>
            <div class="input-row">
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                inputmode="decimal"
                placeholder="7.5"
                value={raw}
                onInput={handleInput}
              />
              <span class="suffix">時間（小数OK）</span>
            </div>
          </label>

          <div class="presets">
            {PRESETS.map((v) => (
              <button
                key={v}
                type="button"
                class="chip"
                onClick={() => handlePreset(v)}
              >
                {v}時間
              </button>
            ))}
          </div>
        </section>

        {hasValue && (
          <section class="card result-card">
            <div class="result-main">
              {formatHori(hori)} 堀大輔
            </div>
            <div class="result-sub">
              （{formatDuration(minutes)}）
            </div>
          </section>
        )}

        {hasValue && (
          <section class="card grid-card">
            <p class="grid-caption">
              {partial > 0
                ? `画像 ${full}枚 + 端数${rem}分`
                : `画像 ${full}枚`}
            </p>
            <HoriGrid
              src={effectiveSrc}
              full={full}
              partial={partial}
              rem={rem}
            />
          </section>
        )}

        {!hasValue && (
          <section class="card empty-card">
            <svg
              class="moon-icon"
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <p>睡眠時間を入力してください</p>
          </section>
        )}

        <section class="card upload-card">
          <div class="upload-row">
            <label class="upload-btn">
              画像を変更
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                hidden
              />
            </label>
            {customSrc !== null && (
              <button
                type="button"
                class="reset-btn"
                onClick={handleReset}
              >
                デフォルトに戻す
              </button>
            )}
          </div>
        </section>

        <footer>
          <p>1堀大輔 = 30分（睡眠時間 ÷ 30分）</p>
        </footer>
      </div>
    </div>
  );
}
