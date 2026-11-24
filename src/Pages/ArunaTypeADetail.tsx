import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequestDialogs } from '../Components/RequestDialogs';
import arunaTypeAImage from '../assets/aruna type A.png';
import arunaTypeBImage from '../assets/Aruna type B.png';
import arunaTypeCImage from '../assets/aruna type C.png';
import arunaEstateImage from '../assets/Aruna Residence.jpg';
import bedroomImage1 from '../assets/aruna bed 1.png';
import bedroomImage2 from '../assets/aruna bed 2.jpg';
import bedroomImage3 from '../assets/aruna bed 3.png';
import bedroomImage4 from '../assets/aruna bed 4.jpg';
import locationsImage from '../assets/aruna locations.png';
import videoPreviewImage from '../assets/aruna video.png';
import floorPlanImage from '../assets/aruna floor plan.png';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const exteriorImages = [
  { src: arunaTypeAImage, alt: 'Aruna Type A residence exterior' },
  { src: arunaTypeBImage, alt: 'Aruna Type B residence exterior' },
  { src: arunaTypeCImage, alt: 'Aruna Type C residence exterior' },
  { src: arunaEstateImage, alt: 'Aruna Residence homes' },
];

const bedroomImages = [
  { src: bedroomImage1, alt: 'Aruna bedroom with garden view' },
  { src: bedroomImage2, alt: 'Aruna bedroom wardrobe and interior' },
  { src: bedroomImage3, alt: 'Aruna bedroom interior' },
  { src: bedroomImage4, alt: 'Aruna bedroom detail' },
];

const paymentDetails = [
  ['Monthly installment', 'From $750 / month'],
  ['Down Payment', 'Min. 20%'],
  ['Loan Tenure', '10 / 15 / 20 years'],
  ['Interest Rate', '5% fixed (first 3 years)'],
  ['Payment Methods', 'Bank transfer'],
  ['Additional Fees', 'Notary, Tax, Admin'],
  ['Special Offers', 'Free Legal Fee'],
];

const locationDetails = [
  ['Greenfield International School', '2.1 km · 5 min drive'],
  ['Selhurst Mall & Lifestyle Center', '3.4 km · 10 min drive'],
  ['Royal Care Hospital', '4.8 km · 12 min drive'],
  ['Selhurst Central Station', '2.7 km · 8 min drive'],
];

const specificationGroups = [
  {
    title: 'Interior Features',
    rows: [
      ['Flooring', 'Polished 60×60 cm granite tiles throughout living and dining areas.'],
      ['Lighting', 'LED fixtures with dimmable switches in living room and bedrooms.'],
      ['Appliances', 'Built-in electric stove, range hood, and sink in an open-concept kitchen.'],
      ['Design Details', 'Vinyl-coated living area and large windows for natural light.'],
      ['Smart Elements', 'Wi-Fi-enabled lighting control and keyless smart door lock.'],
    ],
  },
  {
    title: 'Property & Layout',
    rows: [
      ['Bedrooms', '3 bedrooms'],
      ['Bathrooms', '2 bathrooms'],
      ['Building area', '1,200 ft²'],
      ['Land area', '2,000 ft²'],
    ],
  },
  {
    title: 'Construction & Materials',
    rows: [
      ['Walls', 'Lightweight bricks, plaster, and paint.'],
      ['Doors & windows', 'Solid wood doors and aluminium window frames.'],
      ['Stairs', 'Lightweight steel frame.'],
    ],
  },
  {
    title: 'Utilities & Green Energy',
    rows: [
      ['Electricity supply', '2,200 VA'],
      ['Natural lighting', 'Large windows and a functional open layout.'],
    ],
  },
  {
    title: 'Community & Amenities',
    rows: [
      ['Outdoor spaces', 'Landscaped parks, jogging track, and central playground.'],
      ['Community', 'Family-oriented shared spaces within Aruna Residence.'],
    ],
  },
];

const galleryTabs = ['Outside', 'Bedroom', 'Bathroom', 'Kitchen', 'Backyard', 'Family room', 'Street'];

export default function ArunaTypeADetail(): React.JSX.Element {
  const [heroImage, setHeroImage] = useState(exteriorImages[0]);
  const [selectedGallery, setSelectedGallery] = useState('Bedroom');
  const [selectedBedroomImage, setSelectedBedroomImage] = useState(bedroomImages[0]);
  const [floor, setFloor] = useState<'Ground floor' | 'Upper floor'>('Ground floor');
  const { openTourRequest } = useRequestDialogs();

  return (
    <div className="min-h-screen bg-[#f7f7f6] font-sans text-[#171717] antialiased">
      <Header />

      <main className="mx-auto max-w-360 px-3 pb-0 pt-3 sm:px-5 lg:px-7">
        <div className="mb-3 flex items-center justify-between text-[10px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <Link to="/properties" className="hover:text-[#56593B]">All clusters</Link>
            <span>/</span>
            <Link to="/aruna-residence" className="hover:text-[#56593B]">Aruna residence</Link>
            <span>/</span>
            <span className="rounded-full bg-[#ededeb] px-2 py-1 text-gray-700">Type-A</span>
          </div>
          <button type="button" className="border border-gray-200 bg-white px-3 py-1.5 text-[10px]">Share&nbsp; ⋮</button>
        </div>

        <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(270px,0.92fr)]">
          <div className="min-w-0 space-y-3">
            <section className="relative overflow-hidden bg-white p-2">
              <img src={heroImage.src} alt={heroImage.alt} className="h-70 w-full object-cover sm:h-97.5 lg:h-120" />
              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded bg-black/35 p-1.5">
                {exteriorImages.map((image, index) => (
                  <button
                    type="button"
                    key={image.alt}
                    onClick={() => setHeroImage(image)}
                    aria-label={`Show exterior image ${index + 1}`}
                    className={`h-9 w-12 overflow-hidden border sm:h-12 sm:w-16 ${heroImage.src === image.src ? 'border-white' : 'border-white/50'}`}
                  >
                    <img src={image.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            <section id="property-details" className="bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-lg font-medium">Aruna - Type A</h1>
                  <p className="mt-1 text-[10px] text-gray-500">Serenia Residences, Harmony Street No. 52, Selhurst, London, England</p>
                </div>
                <span className="bg-[#f1f1ef] px-3 py-2 text-[10px]">12 unit available&nbsp; →</span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border border-gray-100 p-3 text-[10px] sm:grid-cols-3">
                {[
                  ['Land & building size', '2,000 ft²'],
                  ['House style', 'Modern minimalist'],
                  ['Total floor', 'Double floor'],
                  ['Bedrooms', '3 bedrooms'],
                  ['Bathrooms', '2 bathrooms'],
                  ['Cluster', 'Aruna residence'],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-[#56593B]" aria-hidden="true">⌂</span>
                    <div><dt className="text-gray-500">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>
                  </div>
                ))}
              </dl>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="text-sm font-medium">About properties</h2>
              <p className="mt-3 text-[10px] leading-[1.7] text-gray-600">
                Aruna Residence offers modern residences with minimalist designs that blend in with the green surroundings, providing comfort for dynamic families. Each unit is designed with an open layout that maximizes natural light and air circulation. With a spacious living room that connects directly to the backyard, this house supports a healthy and harmonious lifestyle.
              </p>
              <p className="mt-2 text-[10px] leading-[1.7] text-gray-600">
                The master bedroom features a private balcony, offering privacy and stunning views of the green surroundings. The modern kitchen with an open-concept design makes cooking more enjoyable while strengthening family bonding moments. Aruna Residence is the perfect choice for young families and professionals seeking a home with a strategic location.
              </p>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-medium">Locations</h2>
              <div className="grid gap-3 md:grid-cols-[1fr_1.05fr]">
                <img src={locationsImage} alt="Map showing Aruna Residence and nearby locations" className="aspect-4/3 h-full min-h-44 w-full object-cover" />
                <div className="border border-gray-100 p-3">
                  <h3 className="mb-2 text-[10px] font-medium">This residence is near with:</h3>
                  <ul className="divide-y divide-gray-100">
                    {locationDetails.map(([name, distance]) => (
                      <li key={name} className="flex items-center justify-between gap-2 py-2.5 text-[10px]">
                        <div><p className="font-medium">{name}</p><p className="mt-1 text-gray-400">{distance}</p></div>
                        <span className="text-gray-500" aria-hidden="true">⌖</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-medium">Gallery</h2>
              <div className="grid grid-cols-4 border-b border-gray-200 text-center text-[10px] sm:grid-cols-7">
                {galleryTabs.map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setSelectedGallery(tab)}
                    className={`px-1 py-2 ${selectedGallery === tab ? 'border-b-2 border-[#56593B] bg-[#f4f4f2] font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {selectedGallery === 'Bedroom' ? (
                <div className="mt-3 grid grid-cols-[minmax(0,2fr)_minmax(90px,0.8fr)] gap-2">
                  <img src={selectedBedroomImage.src} alt={selectedBedroomImage.alt} className="aspect-4/3 h-full w-full object-cover" />
                  <div className="grid grid-rows-3 gap-2">
                    {bedroomImages.filter((image) => image.src !== selectedBedroomImage.src).map((image) => (
                      <button type="button" key={image.src} onClick={() => setSelectedBedroomImage(image)} className="min-h-0 overflow-hidden">
                        <img src={image.src} alt={image.alt} className="h-full min-h-20 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex min-h-52 items-center justify-center bg-[#f5f5f3] text-xs text-gray-500">
                  {selectedGallery} photos will be added when available.
                </div>
              )}
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-medium">Full specifications</h2>
              <div className="space-y-2">
                {specificationGroups.map((group, index) => (
                  <details key={group.title} open={index === 0} className="border border-gray-200">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3 text-[10px] font-medium">
                      {group.title}
                      <span className="flex h-4 w-4 items-center justify-center bg-[#f1f1ef] text-gray-600" aria-hidden="true">{index === 0 ? '−' : '+'}</span>
                    </summary>
                    <ul className="space-y-2 border-t border-gray-100 px-4 py-3">
                      {group.rows.map(([label, detail]) => (
                        <li key={label} className="grid grid-cols-[90px_1fr] gap-3 text-[10px] leading-4">
                          <span className="text-gray-500">• &nbsp;{label}</span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-medium">Floor plan</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="mb-2 grid grid-cols-2 bg-[#f1f1ef] text-center text-[10px]">
                    {(['Ground floor', 'Upper floor'] as const).map((floorOption) => (
                      <button
                        key={floorOption}
                        type="button"
                        onClick={() => setFloor(floorOption)}
                        className={`px-3 py-2 ${floor === floorOption ? 'bg-white font-medium shadow-sm' : 'text-gray-500'}`}
                      >
                        {floorOption}
                      </button>
                    ))}
                  </div>
                  {floor === 'Ground floor' ? (
                    <img src={floorPlanImage} alt="Aruna Residence ground floor plan" className="aspect-square w-full object-contain p-2" />
                  ) : (
                    <div className="flex aspect-square items-center justify-center bg-[#f5f5f3] text-xs text-gray-500">Upper floor plan coming soon.</div>
                  )}
                </div>
                <ol className="divide-y divide-gray-100 border border-gray-100 px-3">
                  {[
                    ['Bedroom', 'Private and bright sleeping space for rest'],
                    ['Kitchen', 'Functional modern kitchen for cooking'],
                    ['Family room', 'Spacious living area for gathering'],
                    ['Dining area', 'Cozy dining spot for meals'],
                    ['Sliding door', 'Wide access to fresh air and light'],
                    ['Balcony', 'Relaxing outdoor corner with view'],
                  ].map(([title, detail], index) => (
                    <li key={title} className="flex items-start gap-3 py-2.5 text-[10px]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f1f1ef]">{index + 1}</span>
                      <span><span className="font-medium">{title}</span><span className="mt-0.5 block leading-4 text-gray-500">{detail}</span></span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>

          <aside className="order-last space-y-3 lg:order-0 lg:pt-123">
            <section className="bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-medium">Price &amp; payment</h2>
              <div className="border border-gray-200 p-3">
                <p className="text-[10px] text-gray-500">Total Price</p>
                <p className="mt-1 text-xl font-semibold text-[#56593B]">$135,000</p>
                <dl className="mt-3 divide-y divide-gray-100 text-[10px]">
                  {paymentDetails.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-2 py-2">
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <button type="button" onClick={openTourRequest} className="mt-3 block w-full bg-[#56593B] px-3 py-2.5 text-center text-xs text-white hover:bg-[#474a31]">Schedule a tour</button>
              <a href="#property-details" className="mt-2 block bg-[#f1f1ef] px-3 py-2.5 text-center text-xs hover:bg-gray-200">View more detail</a>
            </section>

            <section className="bg-white p-3 shadow-sm">
              <h2 className="mb-2 text-sm font-medium">3D Preview</h2>
              <div className="relative overflow-hidden">
                <img src={videoPreviewImage} alt="Preview of the Aruna Residence 3D interior" className="aspect-4/3 w-full object-cover" />
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl text-[#56593B]" aria-hidden="true">▶</span>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-3 pb-3 pt-8 text-white">
                  <p className="text-sm font-medium">Great experience</p>
                  <p className="mt-1 text-[10px]">Get a 3D preview with this feature before you buy it.</p>
                </div>
              </div>
              <button type="button" className="mt-2 w-full bg-[#f1f1ef] px-3 py-2 text-xs hover:bg-gray-200">Try 360° preview</button>
            </section>
          </aside>
        </div>

        <div id="contact" className="mt-8"><Footer /></div>
      </main>
    </div>
  );
}
