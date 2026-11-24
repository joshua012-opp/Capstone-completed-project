import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, CircleHelp, Menu, Search } from 'lucide-react';

type Props = {
  title: string;
  userName: string;
  onMobileMenuClick: () => void;
  onOpenSearch: () => void;
  onLogout: () => void;
};

export default function DashboardTopbar({ title, userName, onMobileMenuClick, onOpenSearch, onLogout }: Props) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#eeede7] bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={onMobileMenuClick}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ecebe5] text-[#6d6c63] lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="truncate text-base font-semibold text-[#25251e] sm:text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Search"
          onClick={onOpenSearch}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#77766e] hover:bg-[#f5f4ee] lg:hidden"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Help"
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-[#77766e] hover:bg-[#f5f4ee] sm:flex"
        >
          <CircleHelp className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-[#77766e] hover:bg-[#f5f4ee]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#a7a137]" />
        </button>
        <div className="relative ml-1 border-l border-[#ecebe5] pl-3 sm:ml-2 sm:pl-4">
          <button
            type="button"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-0.5 text-left hover:bg-[#fafaf7] sm:gap-2.5 sm:pr-1"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8e3cb] text-xs font-semibold text-[#77741f]">
              {userName.slice(0, 1)}
            </span>
            <span className="hidden text-xs font-medium text-[#393930] sm:inline">{userName}</span>
            <ChevronDown className={`hidden h-3.5 w-3.5 text-[#77766e] transition-transform sm:block ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-[#ecebe5] bg-white p-1.5 shadow-lg">
              <Link
                to="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="block rounded-lg px-3 py-2 text-xs text-[#55554d] hover:bg-[#f7f6f1]"
              >
                Account settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
                className="block w-full rounded-lg px-3 py-2 text-left text-xs text-[#d44c42] hover:bg-[#fff1ef]"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
