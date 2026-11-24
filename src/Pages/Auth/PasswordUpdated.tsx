import { Link } from 'react-router-dom';
import { SimpleAuthLayout } from './AuthShared';

export default function PasswordUpdatedPage() {
  return (
    <SimpleAuthLayout>
      <section className="mx-auto w-full max-w-85 border border-[#ececea] bg-white px-6 py-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:px-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f1e7] text-[#43824d]">
          <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-11 w-11">
            <circle cx="24" cy="24" r="18" fill="#43824d" />
            <path d="m15 24 6 6 12-13" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-4 text-base font-semibold text-[#171717]">Password updated!</h1>
        <p className="mt-2 text-xs leading-5 text-[#777771]">
          Your password has been updated. You can now use your new credentials to sign in.
        </p>
        <Link
          to="/login"
          className="mt-6 flex min-h-11 w-full items-center justify-center bg-[#56593B] px-5 text-sm font-medium text-white transition-colors hover:bg-[#474a31]"
        >
          Back to login
        </Link>
        <p className="mt-3 text-[10px] leading-4 text-[#888883]">
          Preview only—the password change is not saved until the backend is connected.
        </p>
      </section>
    </SimpleAuthLayout>
  );
}
