import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  ChevronDown,
  Images,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  ClipboardList,
  ExternalLink,
} from 'lucide-react';
import logo from '../../assets/Logo Container.png';
import { useProperties } from '../../hooks/useProperties';

type Props = {
  mobileOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onLogout: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex h-9 items-center gap-3 rounded-lg px-3 text-[13px] transition-colors ${
    isActive
      ? 'bg-[#f2f1e8] font-medium text-[#77741f]'
      : 'text-[#66665e] hover:bg-[#f7f6f1] hover:text-[#282820]'
  }`;

export default function DashboardSidebar({ mobileOpen, onClose, onOpenSearch, onLogout }: Props) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const clusters = useProperties({ sort: 'name' });
  const isPropertiesPath =
    pathname.startsWith('/dashboard/properties') ||
    pathname.startsWith('/properties/new/') ||
    /^\/properties\/[^/]+\/edit(?:\/|$)/.test(pathname);
  const [propertiesExpanded, setPropertiesExpanded] = useState(isPropertiesPath);

  useEffect(() => {
    if (isPropertiesPath) setPropertiesExpanded(true);
  }, [isPropertiesPath]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-62 flex-col border-r border-[#ecebe4] bg-white px-3.5 py-4 transition-transform duration-200 lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <Link to="/dashboard" onClick={onClose} className="mb-5 flex h-9 items-center gap-2 px-2">
        <img src={logo} alt="" className="h-7 w-7 object-contain" />
        <span className="text-[15px] font-semibold tracking-tight text-[#27271f]">Serenia</span>
      </Link>
      <Link
        to="/"
        onClick={onClose}
        className="mb-5 flex h-9 items-center gap-3 rounded-lg px-3 text-[12px] text-[#66665e] transition-colors hover:bg-[#f7f6f1] hover:text-[#282820]"
      >
        <ExternalLink className="h-4 w-4" />
        <span>View website</span>
      </Link>

      <button
        type="button"
        onClick={onOpenSearch}
        className="mb-6 flex h-9 w-full items-center gap-2 rounded-lg border border-[#ecebe6] bg-[#fbfbf9] px-2.5 text-left text-[11px] text-[#8b8b82] hover:border-[#d7d4c2]"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1">Search anything...</span>
        <kbd className="rounded border border-[#e5e4de] bg-white px-1 py-0.5 text-[9px] text-[#77776f]">⌘ K</kbd>
      </button>

      <nav className="min-h-0 flex-1 overflow-y-auto">
        <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a2a198]">Main menu</p>
        <div className="space-y-1">
          <NavLink to="/dashboard" end onClick={onClose} className={navLinkClass}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/dashboard/requests" onClick={onClose} className={navLinkClass}>
            <ClipboardList className="h-4 w-4" />
            <span>Request lists</span>
          </NavLink>

          <div>
            <div className={`flex h-9 items-center rounded-lg px-3 text-[13px] ${isPropertiesPath ? 'bg-[#f2f1e8] text-[#77741f]' : 'text-[#66665e]'}`}>
              <Link
                to="/dashboard/properties"
                onClick={onClose}
                className="flex min-w-0 flex-1 items-center gap-3 hover:text-[#282820]"
              >
                <Building2 className="h-4 w-4 shrink-0" />
                <span>Properties</span>
              </Link>
              <button
                type="button"
                aria-label={propertiesExpanded ? 'Collapse properties' : 'Expand properties'}
                aria-expanded={propertiesExpanded}
                onClick={() => setPropertiesExpanded((expanded) => !expanded)}
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-black/5"
              >
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${propertiesExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {propertiesExpanded && (
              <div className="ml-5 mt-1 space-y-0.5 border-l border-[#e9e8e1] pl-2">
                {clusters.loading && <p role="status" className="px-2.5 py-2 text-[10px] text-[#929188]">Loading clusters…</p>}
                {clusters.error && (
                  <div role="alert" className="px-2.5 py-2 text-[10px] text-[#a85045]">
                    <p>{clusters.error.message}</p>
                    <button type="button" onClick={() => { void clusters.retry(); }} className="mt-1 underline">Retry</button>
                  </div>
                )}
                {clusters.data?.map((cluster) => {
                  const selectedCluster = searchParams.get('cluster') ?? pathname.split('/').pop();
                  const isActive = isPropertiesPath && selectedCluster === cluster.id;
                  return (
                    <Link
                      key={cluster.id}
                      to={`/dashboard/properties?cluster=${cluster.id}`}
                      onClick={onClose}
                      className={`flex h-8 items-center rounded-md px-2.5 text-[11px] transition-colors ${
                        isActive ? 'bg-[#f6f5ee] font-medium text-[#77741f]' : 'text-[#77776f] hover:bg-[#f7f6f1]'
                      }`}
                    >
                      {cluster.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <p className="mb-2 mt-7 px-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a2a198]">Others</p>
        <div className="space-y-1">
          <NavLink to="/dashboard/blogs" onClick={onClose} className={navLinkClass}>
            <BookOpen className="h-4 w-4" />
            <span>Blogs</span>
          </NavLink>
          <NavLink to="/dashboard/gallery" onClick={onClose} className={navLinkClass}>
            <Images className="h-4 w-4" />
            <span>Gallery</span>
          </NavLink>
        </div>
      </nav>

      <div className="space-y-1 border-t border-[#eeede7] pt-3">
        <NavLink to="/dashboard/settings" onClick={onClose} className={navLinkClass}>
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </NavLink>
        <button
          type="button"
          onClick={onLogout}
          className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-[13px] text-[#d44c42] transition-colors hover:bg-[#fff1ef]"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
