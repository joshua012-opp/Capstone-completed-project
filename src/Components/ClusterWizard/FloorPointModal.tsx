import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { z } from 'zod';
import { ROOM_OPTIONS } from '../../constants/options';
import FormField, { inputClass, textareaClass } from './FormField';

const schema = z.object({
  number: z.number().int().positive(),
  room: z.string().min(1, 'Select a room category.'),
  description: z.string().trim().min(3, 'Add a short description.'),
});
type Values = z.infer<typeof schema>;

type Props = {
  number: number;
  onClose: () => void;
  onConfirm: (values: Values) => void;
};

export default function FloorPointModal({ number, onClose, onConfirm }: Props): React.JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { number, room: '', description: '' },
  });

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#24241f]/35 p-4 backdrop-blur-sm">
      <button type="button" aria-label="Close room point" onClick={onClose} className="absolute inset-0" />
      <form onSubmit={handleSubmit(onConfirm)} className="relative z-10 w-full max-w-md space-y-4 rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#33332b]">Enter note for this point</h2>
            <p className="mt-1 text-[10px] text-[#85847b]">Select the room category and add the description.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-7 w-7 items-center justify-center rounded-full text-[#85847b] hover:bg-[#f4f3ef]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <FormField label="Number">
          <input type="number" readOnly {...register('number', { valueAsNumber: true })} className={`${inputClass} bg-[#f7f6f1]`} />
        </FormField>
        <FormField label="Room" required error={errors.room?.message}>
          <select {...register('room')} className={inputClass}>
            <option value="">Select room</option>
            {ROOM_OPTIONS.map((room) => <option key={room}>{room}</option>)}
          </select>
        </FormField>
        <FormField label="Description" required error={errors.description?.message}>
          <textarea {...register('description')} className={textareaClass} placeholder="Describe this point" />
        </FormField>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-[#e1e0d8] px-4 py-2 text-xs text-[#55554d]">Cancel</button>
          <button type="submit" className="rounded-lg bg-[#56593B] px-4 py-2 text-xs font-medium text-white hover:bg-[#474a31]">Confirm</button>
        </div>
      </form>
    </div>
  );
}
