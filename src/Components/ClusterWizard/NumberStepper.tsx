import { ChevronDown, ChevronUp } from 'lucide-react';

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

export default function NumberStepper({ value, onChange, min = 0 }: Props): React.JSX.Element {
  return (
    <div className="flex h-10 items-center overflow-hidden rounded-lg border border-[#e4e3dc] bg-white">
      <input
        type="number"
        min={min}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-full min-w-0 flex-1 px-3 text-xs outline-none"
      />
      <span className="flex h-full flex-col border-l border-[#e4e3dc]">
        <button type="button" aria-label="Increase value" onClick={() => onChange(value + 1)} className="flex flex-1 items-center px-2 text-[#77766e] hover:bg-[#f4f3ef]">
          <ChevronUp className="h-3 w-3" />
        </button>
        <button type="button" aria-label="Decrease value" onClick={() => onChange(Math.max(min, value - 1))} className="flex flex-1 items-center px-2 text-[#77766e] hover:bg-[#f4f3ef]">
          <ChevronDown className="h-3 w-3" />
        </button>
      </span>
    </div>
  );
}
