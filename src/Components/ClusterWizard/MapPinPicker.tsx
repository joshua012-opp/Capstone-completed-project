import { useState } from 'react';
import { MapPin } from 'lucide-react';
import mapPlaceholder from '../../assets/aruna locations.png';
import type { MapPin as MapPinPosition } from '../../types/clusterWizard';

type Props = {
  value: MapPinPosition | null;
  onChange: (pin: MapPinPosition) => void;
};

export default function MapPinPicker({ value, onChange }: Props): React.JSX.Element {
  const [placing, setPlacing] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded-lg border border-[#e8e7df] bg-[#fafaf7] px-3 py-2">
        <span className="text-[10px] text-[#77766e]">
          {value ? `Selected area · ${value.x.toFixed(1)}%, ${value.y.toFixed(1)}%` : 'No selected area'}
        </span>
        <button type="button" onClick={() => setPlacing((current) => !current)} className="rounded-md bg-[#56593B] px-3 py-1.5 text-[10px] font-medium text-white hover:bg-[#474a31]">
          {placing ? 'Click map' : 'Set PIN'}
        </button>
      </div>
      <p className="text-[10px] text-[#929188]">Change or draw the location for the cluster</p>
      <div
        role="button"
        tabIndex={0}
        aria-label="Choose a map location"
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          onChange({
            x: ((event.clientX - bounds.left) / bounds.width) * 100,
            y: ((event.clientY - bounds.top) / bounds.height) * 100,
          });
          setPlacing(false);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onChange({ x: 50, y: 50 });
            setPlacing(false);
          }
        }}
        className={`relative h-48 overflow-hidden rounded-xl border border-[#e1e0d8] bg-[#eef0e8] ${placing ? 'cursor-crosshair ring-2 ring-[#8b8e63]' : 'cursor-crosshair'}`}
      >
        <img src={mapPlaceholder} alt="Static map preview" className="h-full w-full object-cover" />
        {value && (
          <MapPin
            aria-label="Map pin"
            className="absolute h-7 w-7 -translate-x-1/2 -translate-y-full fill-[#56593B] text-[#56593B] drop-shadow"
            style={{ left: `${value.x}%`, top: `${value.y}%` }}
          />
        )}
        {!value && <span className="absolute inset-0 flex items-center justify-center bg-white/10 text-[10px] text-[#55554d]">Click to drop a pin</span>}
      </div>
    </div>
  );
}
