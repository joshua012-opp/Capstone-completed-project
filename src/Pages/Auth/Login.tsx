import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import residenceImage from '../../assets/Aruna Residence.jpg';
import { AuthPasswordField, AuthTextField, authButtonClass, BrandMark } from './AuthShared';
import { useAuth } from '../../hooks/useAuth';
import { demoLogin } from '../../services/authService';

// TEMP DATA
const LOGIN_COPY = {
  heading: 'Welcome back!',
  description: 'Please log in to manage your properties and clusters.',
  support: 'Need help accessing your account? Please contact the Serenia team.',
};

export default function LoginPage() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!auth.user) return;
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
    navigate(from || '/dashboard', { replace: true });
  }, [auth.user, location.state, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setSubmitting(true);
    try {
      await auth.signIn(email, password);
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from || '/dashboard', { replace: true });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to log in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white md:grid-cols-2">
      <section className="relative min-h-65 overflow-hidden md:min-h-screen" aria-label="Serenia residences">
        <img src={residenceImage} alt="Modern Serenia homes" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/75" />
        <div className="absolute left-1/2 top-7 -translate-x-1/2">
          <BrandMark light />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 px-6 pb-7 text-white sm:px-9 md:px-10">
          <div>
            <p className="text-sm font-medium sm:text-base">Serenia House</p>
            <p className="mt-1 max-w-62.5 text-[10px] leading-4 text-white/80">
              A place to find comfort, connection, and the space to grow.
            </p>
          </div>
          <p className="hidden max-w-45 text-right text-[10px] leading-4 text-white/80 sm:block">
            Thoughtfully designed homes for a more meaningful life.
          </p>
        </div>
      </section>

      <section className="flex min-h-130 flex-col items-center px-6 py-10 sm:px-10 md:min-h-screen md:px-12">
        <div className="my-auto w-full max-w-97.5">
          <h1 className="text-xl font-semibold tracking-tight text-[#171717]">{LOGIN_COPY.heading}</h1>
          <p className="mt-1.5 text-[11px] leading-5 text-[#777771]">{LOGIN_COPY.description}</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <AuthTextField
              id="login-email"
              label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
            <AuthPasswordField
              id="login-password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button disabled={submitting} type="submit" className={authButtonClass}>
              {submitting ? 'Logging in…' : 'Login now'}
            </button>
            <div className="text-center">
              <Link to="/forgot-password" className="text-[11px] text-[#56593B] hover:underline">
                Forgot password?
              </Link>
            </div>
            {status && (
              <p role="alert" className="border border-[#f1d0ca] bg-[#fff8f6] px-3 py-2 text-xs leading-5 text-[#a94137]">
                {status}
              </p>
            )}
            {auth.error && <p role="alert" className="text-xs text-[#a94137]">{auth.error.message}</p>}
            <p className="rounded-lg bg-[#f7f6f1] px-3 py-2 text-[10px] leading-4 text-[#77766e]">
              Demo login: <span className="font-medium">{demoLogin.email}</span> / <span className="font-medium">{demoLogin.password}</span>
            </p>
          </form>
          <p className="mt-4 text-center text-[10px] leading-4 text-[#888883]">
            Client access only. Not a client?{' '}
            <Link to="/contact-us" className="text-[#56593B] hover:underline">Contact us</Link>
          </p>
          <Link to="/" className="mt-4 block text-center text-[11px] text-[#56593B] hover:underline">
            ← Back to website
          </Link>
        </div>
        <p className="mt-8 max-w-82.5 text-center text-[10px] leading-4 text-[#888883]">
          {LOGIN_COPY.support}
        </p>
      </section>
    </main>
  );
}
