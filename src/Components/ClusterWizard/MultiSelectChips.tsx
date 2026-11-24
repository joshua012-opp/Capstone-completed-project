import { Check } from 'lucide-react';

type Props = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export default function MultiSelectChips({ options, value, onChange }: Props): React.JSX.Element {
  const toggle = (option: string) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value.includes(option);
        return (
          <button
            type="button"
            key={option}
            aria-pressed={selected}
            onClick={() => toggle(option)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] transition-colors ${
              selected ? 'border-[#7b8053] bg-[#f0f1e7] text-[#555d36]' : 'border-[#e2e1da] bg-white text-[#77766e] hover:bg-[#fafaf7]'
            }`}
          >
            {selected && <Check className="h-3 w-3" />}{option}
          </button>
        );
      })}
    </div>
  );
}
