import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useWizard } from '../WizardContext';
import { emptyPropertyType } from '../wizardData';
import { useWizardNavigation } from '../wizardNavigation';

export default function Step4TypesList(): React.JSX.Element {
  const { state, dispatch } = useWizard();
  const { goTo } = useWizardNavigation();

  const addType = () => {
    dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: emptyPropertyType() });
    goTo(4, 'type-details');
  };

  const editType = (id: string) => {
    const propertyType = state.data.propertyTypes.find((item) => item.id === id);
    if (propertyType) {
      dispatch({ type: 'SET_PROPERTY_DRAFT', propertyDraft: propertyType });
      goTo(4, 'type-details');
    }
  };

  return (
    <div className="space-y-4">
      {state.data.propertyTypes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#dcdad0] bg-[#fbfbf8] px-5 py-10 text-center">
          <p className="text-xs font-medium text-[#55554d]">No property types added yet.</p>
          <p className="mt-1 text-[10px] text-[#929188]">You can continue without them or add a type now.</p>
        </div>
      ) : (
        state.data.propertyTypes.map((propertyType) => (
          <article key={propertyType.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#ecebe4] bg-white p-4">
            {propertyType.cover?.preview ? (
              <img src={propertyType.cover.preview} alt="" className="h-14 w-16 rounded-lg object-cover" />
            ) : (
              <div className="flex h-14 w-16 items-center justify-center rounded-lg bg-[#f1f0e9] text-xl text-[#7b8053]">⌂</div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xs font-semibold text-[#414138]">{propertyType.name || 'Untitled property type'}</h3>
              <p className="mt-1 text-[10px] text-[#85847b]">{propertyType.totalUnits} units · ${propertyType.basePrice.toLocaleString()}</p>
            </div>
            <button type="button" onClick={() => editType(propertyType.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-[#e6e5de] px-3 py-2 text-[10px] text-[#55554d] hover:bg-[#f7f6f1]">
              <Pencil className="h-3 w-3" /> Edit
            </button>
            <button type="button" onClick={() => dispatch({ type: 'DELETE_PROPERTY_TYPE', id: propertyType.id })} aria-label={`Delete ${propertyType.name}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </article>
        ))
      )}
      <button type="button" onClick={addType} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#bdbda9] px-4 py-2.5 text-xs font-medium text-[#646747] hover:bg-[#f7f7f0]">
        <Plus className="h-4 w-4" /> Add another type
      </button>
    </div>
  );
}
