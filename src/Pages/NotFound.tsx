import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notFoundImage from '../assets/404.png';
import Header from '../Components/Header';

export default function NotFound(): React.JSX.Element {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#171717] antialiased">
      <Header />

      <main>
        <section className="flex min-h-107.5 items-center justify-center bg-[#fafafa] px-5 py-10 md:min-h-128.75">
          <img
            src={notFoundImage}
            alt="404"
            className="w-full max-w-180 object-contain"
          />
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-[1.4fr_0.6fr] md:items-center md:py-14 lg:px-16">
          <h1 className="text-3xl font-normal leading-tight sm:text-4xl md:text-[42px]">
            Oops, it seems<br className="hidden sm:block" /> you&apos;ve gotten lost.
          </h1>

          <div className="max-w-md text-sm leading-6 text-gray-500">
            <p>
              The page you are looking for is not available or has been moved.
              Don&apos;t worry, let&apos;s find somewhere else to go.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goBack}
                className="bg-[#f1f1ef] px-5 py-3 text-sm font-medium text-[#171717] transition-colors hover:bg-gray-200"
              >
                Back to previous
              </button>
              <Link
                to="/"
                className="bg-[#56593B] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#474a31]"
              >
                Go to home
              </Link>
              <Link
                to="/properties"
                className="px-3 py-3 text-sm font-medium text-[#56593B] hover:underline"
              >
                Browse properties
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
