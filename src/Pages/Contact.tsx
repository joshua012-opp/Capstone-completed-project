import React from 'react';
import { all as getAllCountries } from 'country-codes-list';
import contactImage from '../assets/contact img.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const countryCallingCodes = getAllCountries()
  .filter((country) => country.countryCallingCode.length > 0)
  .sort((a, b) => {
    if (a.countryCode === 'US') return -1;
    if (b.countryCode === 'US') return 1;
    return a.countryNameEn.localeCompare(b.countryNameEn);
  });

export default function Contact(): React.JSX.Element {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name'));
    const email = String(formData.get('email'));
    const countryCode = String(formData.get('countryCode'));
    const phone = String(formData.get('phone'));
    const message = String(formData.get('message'));
    const subject = encodeURIComponent(`Contact request from ${name}`);
    const body = encodeURIComponent(
      `Full Name: ${name}\nEmail: ${email}\nPhone: ${countryCode} ${phone}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:sereniasupport@serenia.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#141414] antialiased">
      <Header />
      <main>
        <img
          src={contactImage}
          alt="Sunlit Serenia living room opening onto a garden"
          className="h-60 w-full object-cover object-[center_63%]"
        />

        <section className="grid md:grid-cols-2">
          <div className="flex min-h-128 flex-col px-6 py-10 sm:px-12 md:px-10 md:py-12 lg:px-12">
            <div>
              <h1 className="max-w-sm text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
                Let’s connect<br />with us
              </h1>
              <p className="mt-5 max-w-xs text-sm leading-5 text-[#555]">
                Discover Serenia up close. Whether you want to ask a question or schedule a private tour our team is ready to assist you.
              </p>
            </div>

            <div className="mt-auto grid border border-gray-200 sm:grid-cols-2">
              <a
                href="mailto:sereniasupport@serenia.com"
                className="flex min-h-18 items-center gap-4 border-b border-gray-200 px-4 py-3 text-xs sm:border-b-0 sm:border-r"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5v10.5H3.75zM4.5 7.5l7.5 5.25 7.5-5.25" />
                </svg>
                <span>
                  <span className="block text-gray-500">Email address</span>
                  <span className="mt-1 block font-medium text-[#56593B]">sereniasupport@serenia.com</span>
                </span>
              </a>
              <a
                href="tel:+13453345005"
                className="flex min-h-18 items-center gap-4 px-4 py-3 text-xs"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.1 3.75h2.7l1.35 4.5-1.9 1.6a15.4 15.4 0 0 0 4.9 4.9l1.6-1.9 4.5 1.35v2.7a2.1 2.1 0 0 1-2.3 2.1A16.9 16.9 0 0 1 5 6.05a2.1 2.1 0 0 1 2.1-2.3Z" />
                </svg>
                <span>
                  <span className="block text-gray-500">Phone number</span>
                  <span className="mt-1 block font-medium text-[#56593B]">(+1) 345 - 3345 - 005</span>
                </span>
              </a>
            </div>
          </div>

          <div className="bg-[#fafafa] px-6 py-10 sm:px-12 md:px-10 md:py-12 lg:px-12">
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl bg-white shadow-[0_1px_5px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-3 text-sm text-gray-600">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5h13.5v15H5.25zM8.25 8.25h7.5M8.25 11.25h7.5M8.25 14.25h4.5" />
                </svg>
                <h2>Quick contact</h2>
              </div>

              <div className="space-y-3 px-5 py-5">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium">Full Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    required
                    className="h-9 w-full border border-gray-300 px-2 text-xs outline-none focus:border-[#56593B]"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      required
                      className="h-9 w-full border border-gray-300 px-2 text-xs outline-none focus:border-[#56593B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-medium">Phone number</label>
                    <div className="flex h-9">
                      <select
                        name="countryCode"
                        aria-label="Country calling code"
                        className="w-20 shrink-0 border border-gray-300 bg-white px-2 text-xs outline-none focus:border-[#56593B]"
                        defaultValue="+1"
                      >
                        {countryCallingCodes.map((country) => (
                          <option key={country.countryCode} value={`+${country.countryCallingCode}`} title={country.countryNameEn}>
                            {country.flag} +{country.countryCallingCode}
                          </option>
                        ))}
                      </select>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel-national"
                        placeholder="Enter your number"
                        required
                        className="min-w-0 flex-1 border border-l-0 border-gray-300 px-2 text-xs outline-none focus:border-[#56593B]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Enter your message"
                    required
                    className="h-[5.6rem] w-full resize-y border border-gray-300 px-2 py-2 text-xs outline-none focus:border-[#56593B]"
                  />
                </div>

                <button type="submit" className="w-full bg-[#56593B] py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#474a31]">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
