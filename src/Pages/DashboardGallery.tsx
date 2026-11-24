import { Images } from 'lucide-react';
import DashboardPlaceholder from '../Components/Dashboard/DashboardPlaceholder';

// TEMP DATA
const PAGE_TITLE = 'Gallery';
const PAGE_DESCRIPTION = 'Organize property, community, and facility photography.';

export default function DashboardGalleryPage() {
  return (
    <DashboardPlaceholder
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      action={<Images className="h-5 w-5 text-[#87812b]" aria-hidden="true" />}
    />
  );
}
