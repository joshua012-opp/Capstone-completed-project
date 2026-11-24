import { useEffect, useRef, useState } from 'react';
import { FileText, ImagePlus, Trash2, Upload } from 'lucide-react';
import type { WizardAsset } from '../../types/clusterWizard';

type Props = {
  label: string;
  value: WizardAsset[];
  onChange: (assets: WizardAsset[]) => void;
  multiple?: boolean;
  imageOnly?: boolean;
  accept?: string;
  hint?: string;
  required?: boolean;
  compact?: boolean;
};

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function isAcceptedImage(file: File): boolean {
  if (IMAGE_TYPES.has(file.type)) return true;
  return /\.(jpe?g|png|webp)$/i.test(file.name);
}

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function UploadField({
  label,
  value,
  onChange,
  multiple = false,
  imageOnly = true,
  accept = 'image/jpeg,image/png,image/webp',
  hint = 'JPG, PNG or WebP · 1600px × 1200px · max size 20MB',
  required = false,
  compact = false,
}: Props): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef(value);
  const changeRef = useRef(onChange);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    valueRef.current = value;
    changeRef.current = onChange;
  }, [onChange, value]);

  const emit = (assets: WizardAsset[]) => {
    valueRef.current = assets;
    changeRef.current(assets);
  };

  const acceptFiles = (files: FileList | File[]) => {
    const accepted: WizardAsset[] = [];
    const failures: string[] = [];
    for (const file of Array.from(files)) {
      if (file.size > MAX_FILE_SIZE) {
        failures.push(`${file.name} exceeds 20MB.`);
        continue;
      }
      if (imageOnly && !isAcceptedImage(file)) {
        failures.push(`${file.name} is not a JPG, PNG, or WebP image.`);
        continue;
      }
      accepted.push({
        id: `upload-${crypto.randomUUID()}`,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        file,
        preview: imageOnly ? URL.createObjectURL(file) : '',
        progress: 0,
      });
    }

    setError(failures.join(' '));
    if (accepted.length === 0) return;
    const next = multiple ? [...valueRef.current, ...accepted] : [accepted[0]];
    if (!multiple) {
      valueRef.current.filter((item) => item.preview.startsWith('blob:')).forEach((item) => URL.revokeObjectURL(item.preview));
    }
    emit(next);

    for (const asset of accepted) {
      let progress = 0;
      const interval = window.setInterval(() => {
        progress = Math.min(100, progress + 12 + Math.round(Math.random() * 12));
        emit(valueRef.current.map((item) => item.id === asset.id ? { ...item, progress } : item));
        if (progress === 100) window.clearInterval(interval);
      }, 100);
    }
  };

  const removeAsset = (id: string) => {
    const removed = valueRef.current.find((item) => item.id === id);
    if (removed?.preview.startsWith('blob:')) URL.revokeObjectURL(removed.preview);
    emit(valueRef.current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-[#45453d]">{label}{required && <span className="ml-1 text-red-500">*</span>}</p>
        {value.length > 0 && !multiple && (
          <button type="button" onClick={() => removeAsset(value[0].id)} aria-label={`Remove ${label}`} className="text-[#96958c] hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          acceptFiles(event.dataTransfer.files);
        }}
        className={`rounded-xl border border-dashed p-4 transition-colors ${
          dragging ? 'border-[#777d4d] bg-[#f7f7f0]' : 'border-[#dcdad0] bg-[#fbfbf8]'
        } ${compact ? 'min-h-28' : 'min-h-36'}`}
      >
        {value.length === 0 ? (
          <div className="flex min-h-24 flex-col items-center justify-center text-center">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#efeee5] text-[#777d4d]">
              {imageOnly ? <ImagePlus className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
            </div>
            <p className="text-[11px] font-medium text-[#55554d]">Drag and drop {imageOnly ? 'an image' : 'a file'} here</p>
            <p className="mt-1 text-[9px] text-[#96958c]">{hint}</p>
            <button type="button" onClick={() => inputRef.current?.click()} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#dfded5] bg-white px-3 py-1.5 text-[10px] font-medium text-[#54544b] hover:bg-[#f7f6f1]">
              <Upload className="h-3 w-3" /> Upload {imageOnly ? 'image' : 'file'}
            </button>
          </div>
        ) : (
          <div className={multiple ? 'grid grid-cols-2 gap-2 sm:grid-cols-3' : 'space-y-2'}>
            {value.map((asset) => (
              <div key={asset.id} className="relative min-w-0 overflow-hidden rounded-lg border border-[#ecebe4] bg-white">
                {asset.preview && (
                  <div className="relative h-28 bg-[#f4f3ef]">
                    <img src={asset.preview} alt={asset.name} className="h-full w-full object-cover" />
                    <button type="button" aria-label={`Remove ${asset.name}`} onClick={() => removeAsset(asset.id)} className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#77766e] hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                <div className="flex min-w-0 items-center gap-2 p-2.5">
                  {!asset.preview && <FileText className="h-4 w-4 shrink-0 text-[#777d4d]" />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[10px] font-medium text-[#45453d]">{asset.name}</span>
                    <span className="text-[9px] text-[#929188]">{formatSize(asset.size)}</span>
                  </span>
                  <button type="button" aria-label={`Remove ${asset.name}`} onClick={() => removeAsset(asset.id)} className="shrink-0 text-[#99988f] hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                {asset.progress < 100 && (
                  <div className="h-1.5 bg-[#ecebe4]">
                    <span className="block h-full bg-[#777d4d] transition-[width]" style={{ width: `${asset.progress}%` }} />
                  </div>
                )}
              </div>
            ))}
            {multiple && (
              <button type="button" onClick={() => inputRef.current?.click()} className="flex min-h-28 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#dcdad0] text-[10px] text-[#77766e] hover:bg-[#f7f6f1]">
                <ImagePlus className="h-4 w-4" /> Add more
              </button>
            )}
          </div>
        )}
      </div>
      {error && <p role="alert" className="text-[11px] text-red-600">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(event) => {
          if (event.currentTarget.files) acceptFiles(event.currentTarget.files);
          event.currentTarget.value = '';
        }}
      />
    </div>
  );
}
