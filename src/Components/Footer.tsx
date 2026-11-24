import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequestDialogs } from './RequestDialogs';
import footerImage from '../assets/footer.png';
import whiteLogo from '../assets/white logo.png';

export default function Footer(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const { openTourRequest } = useRequestDialogs();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscribed email:', email);
  };

  return (
    <footer className="w-full bg-[#141414] text-white">
      <section className="mx-auto grid max-w-350 grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-2 md:px-10 lg:px-16 lg:py-16">
        <div className="max-w-md">
          <h2 className="mb-6 text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Create rare<br />moments with<br />your family<br />now
          </h2>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={openTourRequest} className="inline-flex items-center justify-center bg-white px-5 py-3 text-xs font-medium text-black transition hover:bg-gray-200">
              Schedule a tour
            </button>
            <a href="#clusters" className="inline-flex items-center justify-center bg-[#414141] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#555]">
              View clusters
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-107.5 items-center justify-center py-5">
          <div className="absolute inset-0 border border-[#444] bg-[repeating-linear-gradient(120deg,transparent_0px,transparent_7px,#444_8px,#444_9px)] opacity-80"></div>
          <div className="relative z-10 w-[72%] border border-[#555] bg-[#171717] p-4 sm:p-5">
            <img src={footerImage} alt="Serenia residential homes" className="aspect-4/4.5 w-full object-cover" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-350 bg-[#202020]">
        <div className="grid grid-cols-1 gap-10 border-b border-[#383838] px-6 py-9 sm:px-10 md:grid-cols-2 md:gap-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8">
            <a href="/" className="flex w-fit items-center gap-2 text-xl font-semibold">
              <img src={whiteLogo} alt="Logo" />
              <span>Serenia</span>
            </a>
            <div className="flex flex-col gap-2 text-[11px] text-gray-300">
              <a href="mailto:sereniasupport@serenia.com" className="w-fit transition hover:text-white">sereniasupport@serenia.com</a>
              <a href="tel:+13453345005" className="w-fit transition hover:text-white">(+1) 345 - 3345 - 005</a>
            </div>
          </div>

          <div className="md:ml-auto md:w-full md:max-w-87.5">
            <h3 className="mb-4 max-w-50 text-base font-normal leading-snug">
              Subscribe to get the<br />
              latest information from<br />
              us
            </h3>
            <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-2 sm:flex-row">
              <input 
                type="email" 
                name="email" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required 
                aria-label="Your email address"
                className="min-w-0 flex-1 border border-[#414141] bg-[#171717] px-3 py-3 text-xs text-white outline-none placeholder:text-gray-500 focus:border-white" 
              />
              <button type="submit" className="bg-white px-5 py-3 text-xs font-medium text-black transition hover:bg-gray-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 px-6 py-9 sm:grid-cols-3 sm:px-10 lg:grid-cols-5 lg:px-12">
          <div>
            <h4 className="mb-4 text-[10px] font-normal uppercase text-gray-500">Company</h4>
            <ul className="space-y-3 text-[11px] text-gray-300">
              <li><a href="#about" className="transition hover:text-white">About us</a></li>
              <li><a href="#careers" className="transition hover:text-white">Careers</a></li>
              <li><a href="#press" className="transition hover:text-white">Press &amp; Media</a></li>
              <li><a href="#opportunities" className="transition hover:text-white">Opportunity</a></li>
              <li><Link to="/login" className="transition hover:text-white">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-normal uppercase text-gray-500">Services</h4>
            <ul className="space-y-3 text-[11px] text-gray-300">
              <li><a href="#properties" className="transition hover:text-white">Property listings</a></li>
              <li><a href="#progress" className="transition hover:text-white">Progress tracking</a></li>
              <li><a href="#tours" className="transition hover:text-white">Virtual tours</a></li>
              <li><a href="#consultation" className="transition hover:text-white">Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-normal uppercase text-gray-500">Resources</h4>
            <ul className="space-y-3 text-[11px] text-gray-300">
              <li><a href="#blog" className="transition hover:text-white">Blog &amp; articles</a></li>
              <li><a href="#faqs" className="transition hover:text-white">FAQs</a></li>
              <li><a href="#guides" className="transition hover:text-white">Guide &amp; Tutorials</a></li>
              <li><a href="#help" className="transition hover:text-white">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-normal uppercase text-gray-500">Legal</h4>
            <ul className="space-y-3 text-[11px] text-gray-300">
              <li><a href="#privacy" className="transition hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="transition hover:text-white">Terms &amp; Conditions</a></li>
              <li><a href="#cookies" className="transition hover:text-white">Cookie policy</a></li>
              <li><a href="#disclaimer" className="transition hover:text-white">Disclaimer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-normal uppercase text-gray-500">Legal</h4>
            <ul className="space-y-3 text-[11px] text-gray-300">
              <li><a href="#privacy" className="transition hover:text-white">Privacy Policy</a></li>
              <li><a href="#terms" className="transition hover:text-white">Terms &amp; Conditions</a></li>
              <li><a href="#cookies" className="transition hover:text-white">Cookie policy</a></li>
              <li><a href="#disclaimer" className="transition hover:text-white">Disclaimer</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}