import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthPasswordField, authButtonClass, SimpleAuthLayout, preparePostRequest } from './AuthShared';

type ResetLocationState = {
  email?: string;
};

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResetLocationState | null;
  const email = typeof state?.email === 'string' ? state.email : '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'At least 1 capital letter', met: /[A-Z]/.test(password) },
    { label: 'At least 1 number', met: /\d/.test(password) },
    { label: 'At least 1 special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setError('Start from Forgot password so we know which account to update.');
      return;
    }
    if (!requirements.every((requirement) => requirement.met)) {
      setError('Please meet all password requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    const request = preparePostRequest('/api/auth/password-reset/complete', {
      email,
      password,
    });
    navigate('/password-updated', { state: { email: request.body.email } });
  };

  return (
    <SimpleAuthLayout>
      <section className="border border-[#ececea] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
        <h1 className="text-base font-semibold text-[#171717]">Reset your password</h1>
        <p className="mt-2 text-xs leading-5 text-[#777771]">
          Enter a new password for your Serenia account.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <AuthPasswordField
              id="new-password"
              label="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError('');
              }}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
            <ul className="mt-2 grid grid-cols-1 gap-1 text-[10px] leading-4 sm:grid-cols-2">
              {requirements.map((requirement) => (
                <li key={requirement.label} className={requirement.met ? 'text-[#42855a]' : 'text-[#888883]'}>
                  <span aria-hidden="true" className="mr-1">{requirement.met ? '✓' : '○'}</span>
                  {requirement.label}
                </li>
              ))}
            </ul>
          </div>

          <AuthPasswordField
            id="confirm-password"
            label="Confirm password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setError('');
            }}
            placeholder="Confirm new password"
            autoComplete="new-password"
          />

          {error && <p role="alert" className="text-xs leading-5 text-[#b23c3c]">{error}</p>}

          <button type="submit" className={authButtonClass}>
            Update password
          </button>
        </form>

        <Link to="/login" className="mt-4 block text-center text-[11px] text-[#56593B] hover:underline">
          Back to login
        </Link>
      </section>
      <p className="mt-4 text-center text-[10px] leading-4 text-[#888883]">
        Preview only. Your new password will not be saved until the backend is connected.
      </p>
    </SimpleAuthLayout>
  );
}
