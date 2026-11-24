import { BookOpen } from 'lucide-react';
import DashboardPlaceholder from '../Components/Dashboard/DashboardPlaceholder';

// TEMP DATA
const PAGE_TITLE = 'Blogs';
const PAGE_DESCRIPTION = 'Manage articles and updates shared with the Serenia community.';

export default function DashboardBlogsPage() {
  return (
    <DashboardPlaceholder
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      action={<BookOpen className="h-5 w-5 text-[#87812b]" aria-hidden="true" />}
    />
  );
}
