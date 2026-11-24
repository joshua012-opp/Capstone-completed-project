import React from 'react';
import { Link } from 'react-router-dom';
import { useRequestDialogs } from '../Components/RequestDialogs';
import arunaHeroImage from '../assets/Aruna Residence.jpg';
import arunaWideImage from '../assets/image.png';
import arunaTypeAImage from '../assets/aruna type A.png';
import arunaTypeBImage from '../assets/Aruna type B.png';
import arunaTypeCImage from '../assets/aruna type C.png';
import greenLivingImage from '../assets/aruna green.png';
import minimalistDesignImage from '../assets/aruna minimalist.png';
import familyLifestyleImage from '../assets/aruna lifestyle.png';
import landscapedParksImage from '../assets/aruna lanscape.jpg';
import joggingTrackImage from '../assets/aruna jogging.jpg';
import playgroundImage from '../assets/aruna slide.jpg';
import locationsImage from '../assets/aruna locations.png';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

type HomeType = {
  name: string;
  description: string;
  units: string;
  image: string;
  specifications: [string, string][];
};

const homeTypes: HomeType[] = [
  {
    name: 'Aruna Type-A',
    description: 'Compact & efficient living - minimalist housing for practical young families.',
    units: '12 Unit available',
    image: arunaTypeAImage,
    specifications: [['Land area', '2,000 ft²'], ['Building Area', '1,200 ft²'], ['Bedrooms', '3 bedrooms'], ['Bathrooms', '2 bathrooms'], ['Carport', 'For 1 car'], ['Floors', '2 floors']],
  },
  {
    name: 'Aruna Type-B',
    description: 'Spacious & stylish living - perfect for growing families who need more room and modern comfort.',
    units: '8 Unit available',
    image: arunaTypeBImage,
    specifications: [['Land area', '2,500 ft²'], ['Building Area', '1,600 ft²'], ['Bedrooms', '4 bedrooms'], ['Bathrooms', '3 bathrooms'], ['Carport', 'For 2 cars'], ['Floors', '2 floors']],
  },
  {
    name: 'Aruna Type-C',
    description: 'Premium & elegant living - designed for larger households seeking luxury and comfort.',
    units: '11 Unit available',
    image: arunaTypeCImage,
    specifications: [['Land area', '3,000 ft²'], ['Building Area', '2,000 ft²'], ['Bedrooms', '2 bedrooms'], ['Bathrooms', '1 bathroom'], ['Carport', 'For 1 car'], ['Floors', '2 floors']],
  },
];

const reasons = [
  {
    title: 'Green living environment',
    description: 'Surrounded by landscaped parks and open spaces, offering fresh air and a healthier lifestyle.',
    image: greenLivingImage,
  },
  {
    title: 'Modern minimalist design',
    description: 'Homes designed for comfort and functionality, blending aesthetics with practical living.',
    image: minimalistDesignImage,
  },
  {
    title: 'Family-oriented lifestyle',
    description: 'Safe playgrounds and community spaces that nurture connection, growth, and togetherness.',
    image: familyLifestyleImage,
  },
];

const nearbyPlaces = [
  'Greenfield International School',
  'Suntree Mall & Lifestyle Center',
  'Royal Care Hospital',
  'Selhurst Central Station',
];

const amenities = [
  { name: 'Landscaped Parks', description: 'Green spaces with trees and walking paths.', image: landscapedParksImage },
  { name: 'Jogging track', description: 'Dedicated path for running and walking.', image: joggingTrackImage },
  { name: 'Central Playground', description: 'A shared play area for children and families.', image: playgroundImage },
];

const overviewSpecifications = [
  ['Bedrooms', '2–4 Bedroom options'],
  ['Wall', 'Lightweight bricks, plaster, paint'],
  ['Floor', '60×60 granite tiles'],
  ['Stairs', 'Lightweight steel frame'],
  ['Door/Window', 'Solid wood & aluminium'],
  ['Electricity Supply', '2200 VA'],
];

export default function ArunaResidence(): React.JSX.Element {
  const amenitiesTrack = React.useRef<HTMLDivElement>(null);
  const { openTourRequest, openBrochureRequest } = useRequestDialogs();

  const scrollAmenities = (direction: -1 | 1) => {
    amenitiesTrack.current?.scrollBy({
      left: direction * (amenitiesTrack.current.clientWidth * 0.75),
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#141414] antialiased">
      <Header />
      <main>
        <section className="relative h-82.5 overflow-hidden md:h-107.5">
          <img src={arunaHeroImage} alt="Aruna Residence homes" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
        </section>

        <section className="relative z-10 mx-4 -mt-24 grid bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:mx-auto md:-mt-36 md:max-w-5xl md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-6 md:px-10">
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
              <Link to="/properties" className="hover:text-[#56593B]">All clusters</Link>
              <span>/</span>
              <span className="rounded-full bg-[#f2f2ef] px-3 py-1 text-[#56593B]">Aruna residence</span>
            </div>
            <h1 className="text-4xl font-medium leading-[1.05] md:text-[40px]">Aruna<br />residence</h1>
            <p className="mt-4 text-sm text-gray-600">Starts from <span className="ml-1 font-medium text-[#56593B]">$98,000</span></p>
          </div>
          <dl className="divide-y divide-dashed divide-gray-200 px-6 py-5 md:px-9">
            {overviewSpecifications.map(([label, value]) => (
              <div key={label} className="flex min-h-8 items-center justify-between gap-4 py-1.5 text-sm">
                <dt className="flex items-center gap-2 text-gray-600"><span className="text-[#56593B]" aria-hidden="true">⌂</span>{label}</dt>
                <dd className="text-right text-gray-700">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto max-w-5xl px-4 pt-0 md:px-0">
          <img src={arunaWideImage} alt="Modern Aruna Residence homes" className="h-48 w-full object-cover object-center md:h-60" />
        </section>

        <section className="mx-auto max-w-2xl px-5 py-12 text-center md:py-16">
          <span className="inline-flex items-center gap-2 rounded bg-[#FDF1DC] px-3 py-2 text-sm text-[#8A4B0F]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8A4B0F]" aria-hidden="true" />The modern comfort
          </span>
          <h2 className="mx-auto mt-5 max-w-xl text-xl font-medium leading-7 md:text-2xl">Aruna Residence offers modern residences with an elegant touch,</h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">designed to provide maximum comfort for families. With functional layouts, optimal natural lighting, and high-quality materials.</p>
          <button type="button" onClick={openBrochureRequest} className="mt-5 inline-flex items-center gap-2 bg-[#f2f2f2] px-4 py-2 text-sm hover:bg-gray-200">Request brochure <span aria-hidden="true">›</span></button>
        </section>

        <section id="home-types" className="bg-[#f8f8f6] py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-16">
            <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <h2 className="max-w-xs text-2xl font-medium leading-tight">Available<br />home types</h2>
              <p className="max-w-sm text-sm leading-5 text-gray-500">Find the type of house that suits your needs in this cluster, use the 360° preview for a better experience.</p>
            </div>
            <div className="space-y-4">
              {homeTypes.map((homeType) => (
                <article key={homeType.name} className="grid gap-3 bg-white p-3 shadow-[0_1px_5px_rgba(0,0,0,0.08)] md:grid-cols-2 md:gap-4">
                  <div className="flex flex-col p-3 md:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-medium">{homeType.name}</h3>
                        <p className="mt-1 max-w-xs text-sm leading-5 text-gray-500">{homeType.description}</p>
                      </div>
                      <span className="shrink-0 rounded bg-[#FDF1DC] px-2 py-1 text-sm text-[#8A4B0F]">{homeType.units}</span>
                    </div>
                    <dl className="mt-4 divide-y divide-gray-100 text-sm">
                      {homeType.specifications.map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4 py-2"><dt className="text-gray-500">{label}</dt><dd className="text-gray-700">{value}</dd></div>
                      ))}
                    </dl>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {homeType.name === 'Aruna Type-A' ? (
                        <Link to="/aruna-residence/type-a" className="bg-[#56593B] px-4 py-2 text-sm text-white hover:bg-[#474a31]">View details</Link>
                      ) : (
                        <button type="button" onClick={openTourRequest} className="bg-[#56593B] px-4 py-2 text-sm text-white hover:bg-[#474a31]">Schedule tour</button>
                      )}
                      <a href="#contact" className="bg-[#f2f2f2] px-4 py-2 text-sm hover:bg-gray-200">Preview 360°</a>
                    </div>
                  </div>
                  {homeType.name === 'Aruna Type-A' ? (
                    <Link to="/aruna-residence/type-a" aria-label="View Aruna Type-A details" className="relative block min-h-64 overflow-hidden bg-gray-100 md:min-h-80">
                      <img src={homeType.image} alt="Aruna Type-A home exterior" className="h-full min-h-64 w-full object-cover md:min-h-80" />
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1.5 text-sm text-[#56593B]">View Type-A details</span>
                    </Link>
                  ) : (
                    <div className="relative min-h-64 overflow-hidden bg-gray-100 md:min-h-80">
                      <img src={homeType.image} alt={`${homeType.name} home exterior`} className="h-full min-h-64 w-full object-cover md:min-h-80" />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#141414] py-12 text-white md:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-16">
            <h2 className="max-w-xs text-2xl font-medium leading-tight">The reasons why<br />you must choose this<br />cluster</h2>
            <div className="mt-6 grid items-start gap-4 md:grid-cols-3">
              {reasons.map((reason, index) => (
                <article key={reason.title} className={`min-h-44 max-w-sm bg-[#222] p-5 ${index === 1 ? 'md:mt-10' : ''} ${index === 2 ? 'md:mt-20' : ''}`}>
                  <img src={reason.image} alt="" className="h-12 w-12 object-contain" />
                  <h3 className="mt-5 text-sm font-medium">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-5 text-gray-400">{reason.description}</p>
                  <a href="#contact" className="mt-4 inline-block bg-[#3a3a3a] px-3 py-2 text-sm hover:bg-[#4a4a4a]">Learn more</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-7 px-4 py-12 md:grid-cols-2 lg:px-16 lg:py-16">
          <div>
            <span className="inline-flex rounded bg-[#FDF1DC] px-3 py-2 text-sm text-[#8A4B0F]">Strategic location</span>
            <h2 className="mt-3 max-w-xs text-2xl font-medium leading-tight">Discover the<br />Aruna residence</h2>
            <p className="mt-2 text-sm text-gray-500">Serene surroundings, convenient nearby destinations.</p>
          </div>
          <ul className="divide-y divide-gray-200">
            {nearbyPlaces.map((place) => <li key={place} className="flex items-center justify-between gap-4 py-4 text-sm"><span>{place}</span><span className="text-gray-400" aria-hidden="true">⌄</span></li>)}
          </ul>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-16">
          <img src={locationsImage} alt="Map showing Aruna Residence and nearby locations" className="h-64 w-full object-cover md:h-80" />
        </section>

        <section className="bg-[#f8f8f6] py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-16">
            <h2 className="mx-auto max-w-xs text-center text-2xl font-medium leading-tight">Facility &amp; amenities in this cluster</h2>
            <div ref={amenitiesTrack} className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3">
              {amenities.map((amenity) => (
                <article key={amenity.name} className="w-[min(82vw,390px)] shrink-0 snap-start bg-white p-3 shadow-[0_1px_5px_rgba(0,0,0,0.07)]">
                  <h3 className="text-sm font-medium">{amenity.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{amenity.description}</p>
                  <img src={amenity.image} alt={amenity.name} className="mt-3 aspect-4/3 w-full object-cover" />
                </article>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-6">
              <div className="h-px flex-1 bg-gray-300"><div className="h-px w-1/5 bg-[#141414]" /></div>
              <button type="button" aria-label="Previous amenities" onClick={() => scrollAmenities(-1)} className="border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">←</button>
              <button type="button" aria-label="Next amenities" onClick={() => scrollAmenities(1)} className="border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">→</button>
            </div>
          </div>
        </section>
        <footer id="contact"><Footer /></footer>
      </main>
    </div>
  );
}
