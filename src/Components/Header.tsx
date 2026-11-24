import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useRequestDialogs } from './RequestDialogs';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/Logo Container.png';
import navArrow from '../assets/Vector.png';
import lioraEstateImage from '../assets/Liora estate.png';
import navaHeightsImage from '../assets/nava heights.jpg';
import arunaResidenceImage from '../assets/Aruna Residence.jpg';
import veloraParkImage from '../assets/velora.jpg';
import serayaGroveImage from '../assets/seraya.jpg';

const propertyOptions = [
  {
    name: 'Liora estate',
    image: lioraEstateImage,
    description:
      'Premium homes with modern architecture, a private clubhouse, and 24/7 security — offering style and peace of mind.',
    features: ['3–5 Bedroom options', 'Private gate & 24/7 security', 'Near lifestyle center'],
  },
  {
    name: 'Nava heights',
    image: navaHeightsImage,
    description:
      'Eco-minded homes with wide open spaces, scenic jogging tracks, and elevated views that bring nature closer.',
    features: ['2–4 Bedroom options', 'Wide roads & open spaces', 'Scenic jogging tracks'],
  },
  {
    name: 'Aruna residence',
    image: arunaResidenceImage,
    description:
      'Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.',
    features: ['2–4 Bedroom options', 'Family-friendly facilities', 'Easy access to main boulevard'],
  },
  {
    name: 'Velora park',
    image: veloraParkImage,
    description:
      'Contemporary homes with pocket parks and direct access to nearby shopping and dining destinations.',
    features: ['2–4 Bedroom options', 'Pocket parks & community spaces', 'Trendy design homes'],
  },
  {
    name: 'Seraya grove',
    image: serayaGroveImage,
    description:
      'A vibrant community blending modern homes with lush greenery, schools, and welcoming shared spaces.',
    features: ['3–4 Bedroom options', 'Central park & kids area', 'Easy access to public facilities'],
  },
];

export default function Header(): React.JSX.Element {
  const { pathname } = useLocation();
  const { openTourRequest } = useRequestDialogs();
  const auth = useAuth();
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(2);
  const selectedProperty = propertyOptions[selectedPropertyIndex];

  useEffect(() => {
    setPropertiesOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!propertiesOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPropertiesOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [propertiesOpen]);

  return (
    <header className="relative z-50 flex h-16 items-center justify-between border-b border-[#E7E8E8] bg-white px-4 lg:h-18 lg:px-16">
      <a href="#">
        <img src={logo} alt="Serenia Logo" />
      </a>

      {/* Nav (desktop) */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm lg:flex">
        <div className={`flex h-18 items-center border-b transition-colors hover:text-black ${
          propertiesOpen || pathname === '/properties' ? 'border-[#141414]' : 'border-transparent'
        }`}>
          <Link
            to="/properties"
            onClick={() => setPropertiesOpen(false)}
            aria-current={pathname === '/properties' ? 'page' : undefined}
            className="flex h-full items-center"
          >
            Properties
          </Link>
          <button
            type="button"
            aria-label={propertiesOpen ? 'Close properties menu' : 'Open properties menu'}
            aria-expanded={propertiesOpen}
            aria-controls="properties-megamenu"
            aria-haspopup="true"
            onClick={() => setPropertiesOpen((open) => !open)}
            className="flex h-full items-center pl-1.5"
          >
            <img src={navArrow} alt="" className={`h-2 w-2 transition-transform ${propertiesOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <Link to="/amenities">Amenities</Link>
        <Link
          to="/gallery"
          aria-current={pathname === '/gallery' ? 'page' : undefined}
          className={`flex items-center gap-1.5 ${pathname === '/gallery' ? 'border-b border-[#141414]' : ''}`}
        >
          Gallery <img src={navArrow} alt="" className="w-2 h-2" />
        </Link>
        <a href="#">Blogs</a>
      </nav>

      {propertiesOpen && (
        <>
          <button
            type="button"
            aria-label="Close properties menu"
            onClick={() => setPropertiesOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-40 hidden bg-black/30 backdrop-blur-[5px] lg:top-18 lg:block"
          />
          <section
            id="properties-megamenu"
            aria-label="Property destinations"
            className="absolute left-1/2 top-full z-60 hidden h-70 max-h-[calc(100vh-88px)] w-[76vw] min-w-190 max-w-270 -translate-x-1/2 grid-cols-[minmax(200px,0.9fr)_minmax(250px,1fr)_minmax(275px,1.1fr)] overflow-hidden bg-white shadow-2xl lg:grid"
          >
            <div className="flex min-h-0 flex-col border-r border-[#e7e7e5]">
              {propertyOptions.map((property, index) => (
                <Link
                  key={property.name}
                  to="/aruna-residence"
                  onMouseEnter={() => setSelectedPropertyIndex(index)}
                  onFocus={() => setSelectedPropertyIndex(index)}
                  onClick={() => setPropertiesOpen(false)}
                  aria-label={`Open ${property.name}; goes to Aruna residence`}
                  className={`flex min-h-0 flex-1 items-center justify-center gap-1 border-b border-[#e7e7e5] px-4 text-sm transition-colors last:border-b-0 ${
                    selectedPropertyIndex === index
                      ? 'bg-[#fafafa] text-[#171717]'
                      : 'text-[#666660] hover:bg-[#fafafa] hover:text-[#171717]'
                  }`}
                >
                  <span className={selectedPropertyIndex === index ? 'font-semibold' : 'font-normal'}>
                    {property.name}
                  </span>
                  <sup className="text-[9px] text-[#a3a39d]">0{index + 1}</sup>
                </Link>
              ))}
            </div>

            <div className="min-h-0 overflow-hidden bg-[#f3f3f1]">
              <img
                src={selectedProperty.image}
                alt={`${selectedProperty.name} residences`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex min-h-0 flex-col justify-between p-6 xl:p-8">
              <div>
                <h2 className="text-xl font-medium text-[#171717]">{selectedProperty.name}</h2>
                <p className="mt-2 text-xs leading-5 text-[#6b6b66]">{selectedProperty.description}</p>
              </div>
              <ul className="space-y-2.5 text-[11px] text-[#4c4c48]">
                {selectedProperty.features.map((feature, index) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
                      {index === 0 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 15.5v-8m0 5h15v3m0-3V8m-15 4V10a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2m0 0v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
                      ) : index === 1 ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2 8 8-5 8 5v9H2zM7 17v-5h6v5m4-8 1.5-2" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" />
                      )}
                      {index === 2 && <circle cx="10" cy="8" r="2" />}
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* Right side (desktop) */}
      <div className="hidden items-center gap-8 text-sm lg:flex">
        <Link to="/contact-us">Contact us</Link>
        <Link
          to={auth.user ? '/dashboard' : '/login'}
          className="inline-flex items-center gap-1.5 text-xs text-[#56593B] transition-colors hover:text-[#77741f]"
        >
          {!auth.user && <Lock aria-hidden="true" className="h-3.5 w-3.5" />}
          {auth.user ? 'Go to Dashboard' : 'Client Portal'}
        </Link>
        <button type="button" onClick={openTourRequest} className="flex h-10 items-center bg-[#F2F2F2] px-5 transition-colors hover:bg-gray-200">Request tour</button>
      </div>

      {/* Hamburger (mobile) */}
      <button type="button" aria-label="Toggle menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}
        className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-200">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full z-50 border-t border-[#E7E8E8] bg-white px-5 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="flex flex-col text-sm text-[#33332b]">
            <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="border-b border-[#f0efe9] py-3">Properties</Link>
            <Link to="/amenities" onClick={() => setMobileMenuOpen(false)} className="border-b border-[#f0efe9] py-3">Amenities</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="border-b border-[#f0efe9] py-3">Gallery</Link>
            <a href="#blog" onClick={() => setMobileMenuOpen(false)} className="border-b border-[#f0efe9] py-3">Blogs</a>
            <Link to="/contact-us" onClick={() => setMobileMenuOpen(false)} className="border-b border-[#f0efe9] py-3">Contact us</Link>
            <button type="button" onClick={() => { setMobileMenuOpen(false); openTourRequest(); }} className="mt-3 flex h-10 items-center justify-center bg-[#F2F2F2] px-5 font-medium transition-colors hover:bg-gray-200">Request tour</button>
            <div className="mt-4 border-t border-[#e7e8e8] pt-3">
              <Link
                to={auth.user ? '/dashboard' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 py-2 text-xs text-[#56593B] transition-colors hover:text-[#77741f]"
              >
                {!auth.user && <Lock aria-hidden="true" className="h-3.5 w-3.5" />}
                {auth.user ? 'Go to Dashboard' : 'Client Portal'}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}