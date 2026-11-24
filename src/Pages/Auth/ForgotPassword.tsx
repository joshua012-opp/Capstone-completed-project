import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthTextField, authButtonClass, SimpleAuthLayout, preparePostRequest } from './AuthShared';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request = preparePostRequest('/api/auth/password-reset/request', { email: email.trim() });

    navigate('/reset-password', { state: { email: request.body.email } });
  };

  return (
    <SimpleAuthLayout>
      <section className="border border-[#ececea] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
        <h1 className="text-base font-semibold text-[#171717]">Forgot password?</h1>
        <p className="mt-2 text-xs leading-5 text-[#777771]">
          Enter your registered email address, and we&apos;ll send you a reset link to recover your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <AuthTextField
            id="forgot-email"
            label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email address"
            autoComplete="email"
          />
          <button type="submit" className={authButtonClass}>
            Send reset link
          </button>
        </form>

        <Link
          to="/login"
          className="mt-3 flex min-h-9 w-full items-center justify-center bg-[#f4f4f2] px-4 text-xs font-medium text-[#55554f] hover:bg-[#eaeae7]"
        >
          Back to login
        </Link>
      </section>

      <aside className="mt-4 border border-[#eadfbd] bg-[#fffdf7] p-3.5 text-[11px] leading-5 text-[#6c6145]">
        <p className="font-semibold text-[#39372e]">Important</p>
        <p className="mt-1">
          This preview does not send an email yet. The reset request is prepared for the future backend connection.
        </p>
      </aside>
    </SimpleAuthLayout>
  );
}
