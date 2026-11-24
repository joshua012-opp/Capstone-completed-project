import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Pages/Home'));
const Properties = lazy(() => import('./Pages/Properties'));
const ArunaResidence = lazy(() => import('./Pages/ArunaResidence'));
const ArunaTypeADetail = lazy(() => import('./Pages/ArunaTypeADetail'));
const NotFound = lazy(() => import('./Pages/NotFound'));
const Amenities = lazy(() => import('./Pages/Amenities'));
const Contact = lazy(() => import('./Pages/Contact'));
const GalleryPage = lazy(() => import('./Pages/Gallery'));
const LoginPage = lazy(() => import('./Pages/Auth/Login'));
const ForgotPasswordPage = lazy(() => import('./Pages/Auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('./Pages/Auth/ResetPassword'));
const PasswordUpdatedPage = lazy(() => import('./Pages/Auth/PasswordUpdated'));
const DashboardLayout = lazy(() => import('./Components/Dashboard/DashboardLayout'));
const DashboardPage = lazy(() => import('./Pages/Dashboard'));
const DashboardRequestListsPage = lazy(() => import('./Pages/DashboardRequestLists'));
const DashboardPropertiesPage = lazy(() => import('./Pages/DashboardProperties'));
const DashboardAddPropertyPage = lazy(() => import('./Pages/DashboardAddProperty'));
const DashboardBlogsPage = lazy(() => import('./Pages/DashboardBlogs'));
const DashboardGalleryPage = lazy(() => import('./Pages/DashboardGallery'));
const DashboardSettingsPage = lazy(() => import('./Pages/DashboardSettings'));
const ClusterWizardPage = lazy(() => import('./Pages/ClusterWizardPage'));
const RequestDialogsProvider = lazy(() => import('./Components/RequestDialogs').then((module) => ({
  default: module.RequestDialogsProvider,
})));

function AppLoading(): React.JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8f5] text-sm text-[#77766e]">
      Loading Serenia…
    </main>
  );
}

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        <RequestDialogsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/new/:step/:sub" element={<DashboardLayout />}>
              <Route index element={<ClusterWizardPage mode="create" />} />
            </Route>
            <Route path="/properties/:clusterId/edit" element={<DashboardLayout />}>
              <Route index element={<ClusterWizardPage mode="edit" />} />
              <Route path=":step/:sub" element={<ClusterWizardPage mode="edit" />} />
              <Route path="*" element={<ClusterWizardPage mode="edit" />} />
            </Route>
            <Route path="/aruna-residence" element={<ArunaResidence />} />
            <Route path="/aruna-residence/type-a" element={<ArunaTypeADetail />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/password-updated" element={<PasswordUpdatedPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="requests" element={<DashboardRequestListsPage />} />
              <Route path="properties" element={<DashboardPropertiesPage />} />
              <Route path="properties/add" element={<DashboardAddPropertyPage />} />
              <Route path="properties/:cluster" element={<DashboardPropertiesPage />} />
              <Route path="blogs" element={<DashboardBlogsPage />} />
              <Route path="gallery" element={<DashboardGalleryPage />} />
              <Route path="settings" element={<DashboardSettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RequestDialogsProvider>
      </Suspense>
    </BrowserRouter>
  );
}
