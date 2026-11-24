import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import LogoutModal from './LogoutModal';
import SearchModal from './SearchModal';
import { useAuth } from '../../hooks/useAuth';

const getPageTitle = (pathname: string) => {
  if (pathname.startsWith('/properties/new/')) return 'Add new cluster';
  if (/^\/properties\/[^/]+\/edit(?:\/|$)/.test(pathname)) return 'Edit cluster';
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/dashboard/requests') return 'Request lists';
  if (pathname === '/dashboard/properties/add') return 'Add property';
  if (pathname.startsWith('/dashboard/properties')) return 'Properties';
  if (pathname === '/dashboard/blogs') return 'Blogs';
  if (pathname === '/dashboard/gallery') return 'Gallery';
  if (pathname === '/dashboard/settings') return 'Settings';
  return 'Dashboard';
};

function SessionLoading(): React.JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f5] px-4">
      <p role="status" className="rounded-xl border border-[#ecebe4] bg-white px-5 py-4 text-sm text-[#77766e]">Checking your Serenia session…</p>
    </main>
  );
}

export default function DashboardLayout(): React.JSX.Element {
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openSearch = useCallback(() => {
    setMobileSidebarOpen(false);
    setSearchOpen(true);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const confirmLogout = async () => {
    setLoggingOut(true);
    setLogoutError('');
    try {
      await auth.signOut();
      setLogoutOpen(false);
      navigate('/login', { replace: true });
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : 'Unable to log out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  };

  if (auth.loading && !auth.user) return <SessionLoading />;
  if (auth.error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f5] px-4">
        <div role="alert" className="max-w-md rounded-xl border border-[#ecebe4] bg-white p-5 text-sm text-[#77766e]">
          <p>Unable to check your session: {auth.error.message}</p>
          <button type="button" onClick={() => { void auth.retry(); }} className="mt-3 rounded-lg bg-[#56593B] px-3 py-2 text-xs font-medium text-white">Retry</button>
        </div>
      </main>
    );
  }
  if (!auth.user) return <Navigate to="/login" replace state={{ from: location }} />;

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#282820]">
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-y-0 right-0 left-62 z-30 bg-[#24241f]/30 backdrop-blur-[2px] lg:hidden"
        />
      )}
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        onOpenSearch={openSearch}
        onLogout={() => {
          setLogoutError('');
          setLogoutOpen(true);
        }}
      />

      <div className="min-h-screen lg:pl-62">
        <DashboardTopbar
          title={getPageTitle(pathname)}
          userName={auth.user.name.split(' ')[0] ?? auth.user.name}
          onMobileMenuClick={() => setMobileSidebarOpen(true)}
          onOpenSearch={openSearch}
          onLogout={() => setLogoutOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-5 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <SearchModal open={searchOpen} onClose={closeSearch} />
      <LogoutModal
        open={logoutOpen}
        error={logoutError}
        busy={loggingOut}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => { void confirmLogout(); }}
      />
    </div>
  );
}
