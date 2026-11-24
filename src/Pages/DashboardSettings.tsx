import { Settings } from 'lucide-react';
import DashboardPlaceholder from '../Components/Dashboard/DashboardPlaceholder';

// TEMP DATA
const PAGE_TITLE = 'Settings';
const PAGE_DESCRIPTION = 'Manage account preferences and dashboard settings.';

export default function DashboardSettingsPage() {
  return (
    <DashboardPlaceholder
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      action={<Settings className="h-5 w-5 text-[#87812b]" aria-hidden="true" />}
    />
  );
}
