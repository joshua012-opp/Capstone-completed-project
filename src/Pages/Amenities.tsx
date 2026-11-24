import React, { useState } from 'react';
import amenity1 from '../assets/amenities 1.jpg';
import amenity2 from '../assets/amenities 2.jpg';
import amenity3 from '../assets/amenities 3.jpg';
import amenity4 from '../assets/amenities 4.jpg';
import amenity5 from '../assets/amenities 5.jpg';
import amenity6 from '../assets/amenities 6.jpg';
import amenity7 from '../assets/amenities 7.jpg';
import amenity8 from '../assets/amenities 8.jpg';
import arunaLandscape from '../assets/aruna lanscape.jpg';
import arunaJogging from '../assets/aruna jogging.jpg';
import lioraPool from '../assets/liora swimming pool.jpg';
import luxuryGolf from '../assets/luxery golf.jpg';
import lioraEstate from '../assets/Liora estate.png';
import navaHeights from '../assets/nava heights.jpg';
import arunaResidence from '../assets/Aruna Residence.jpg';
import veloraPark from '../assets/velora.jpg';
import serayaGrove from '../assets/seraya.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

type Facility = {
  name: string;
  description: string;
  image: string;
};

type ClusterFacilities = {
  name: string;
  image: string;
  facilities: Facility[];
};

const galleryImages = [
  { src: amenity1, alt: 'Modern community facility' },
  { src: amenity2, alt: 'Bright indoor fitness space' },
  { src: amenity3, alt: 'Contemporary residential clubhouse' },
  { src: arunaJogging, alt: 'Jogging path surrounded by greenery' },
  { src: amenity4, alt: 'Outdoor recreation area' },
  { src: amenity5, alt: 'Open-air sports court' },
  { src: amenity6, alt: 'Landscaped community grounds' },
  { src: amenity7, alt: 'Swimming pool and relaxation area' },
  { src: amenity8, alt: 'Community recreation facilities' },
  { src: arunaLandscape, alt: 'Aruna landscaped park' },
];

const generalFacilities: Facility[] = [
  { name: 'Sports Facilities', description: 'Spaces designed for an active, balanced lifestyle.', image: amenity2 },
  { name: 'The Lifestyle Center', description: 'A welcoming place to relax, connect, and recharge.', image: amenity3 },
  { name: "Children's Playground", description: 'Safe outdoor play areas for little adventurers.', image: amenity5 },
  { name: 'Golf Central Playground', description: 'A modern resort-style setting with dedicated golf areas and calming green spaces.', image: luxuryGolf },
  { name: 'Retail & Lifestyle Center', description: 'Everyday essentials and convenient neighborhood services.', image: amenity6 },
  { name: 'Cluster Clubhouse', description: 'Private community spaces made for gathering.', image: amenity1 },
  { name: 'Jogging Track', description: 'A scenic path for daily walks and morning runs.', image: arunaJogging },
];

const clusterFacilities: ClusterFacilities[] = [
  {
    name: 'Liora estate',
    image: lioraEstate,
    facilities: [
      { name: 'Infinity Swimming Pool', description: 'A stylish pool that blends seamlessly with the horizon, offering breathtaking views. Designed for relaxation and leisure swims, it creates a serene atmosphere where you can unwind and enjoy moments of tranquility.', image: lioraPool },
      { name: "Residents' Lounge & Coffee Corner", description: 'A comfortable place to meet neighbors, enjoy a coffee, or spend a quiet afternoon.', image: amenity1 },
      { name: "Children's Creative Playground", description: 'A playful, family-friendly space designed for creativity and active fun.', image: amenity5 },
      { name: 'Private Jogging Loop', description: 'A landscaped route for a refreshing walk or run within the community.', image: arunaJogging },
    ],
  },
  {
    name: 'Nava heights',
    image: navaHeights,
    facilities: [
      { name: 'Sky Deck Viewing Terrace', description: 'Elevated views and open-air seating for relaxed gatherings.', image: amenity4 },
      { name: 'Rooftop Yoga & Wellness Area', description: 'A peaceful rooftop space for stretching, yoga, and mindful breaks.', image: amenity2 },
      { name: 'Indoor Gym & Fitness Studio', description: 'A bright, well-equipped space for everyday workouts.', image: amenity3 },
      { name: 'BBQ & Outdoor Dining Pavilion', description: 'An outdoor dining spot for shared meals and celebrations.', image: amenity6 },
    ],
  },
  {
    name: 'Aruna residence',
    image: arunaResidence,
    facilities: [
      { name: 'Central Playground with Smart Play Equipment', description: 'A welcoming place for children to play and families to spend time together.', image: amenity5 },
      { name: 'Multipurpose Community Hall', description: 'Flexible indoor space for neighborhood activities and events.', image: amenity1 },
      { name: 'Mini Market & Daily Needs Kiosk', description: 'Convenient access to everyday essentials close to home.', image: amenity6 },
      { name: 'Cycling Track', description: 'A dedicated route through the landscaped community.', image: arunaLandscape },
    ],
  },
  {
    name: 'Velora park',
    image: veloraPark,
    facilities: [
      { name: 'Basketball Court', description: 'A community court for friendly games and active afternoons.', image: amenity8 },
      { name: 'Skate & Roller Park', description: 'A dedicated outdoor area to practice and play.', image: amenity5 },
      { name: 'Open Green Amphitheater', description: 'A landscaped gathering space for community events.', image: arunaLandscape },
      { name: 'Community Garden Plots', description: 'Shared green plots for growing plants and connecting with neighbors.', image: amenity6 },
    ],
  },
  {
    name: 'Seraya grove',
    image: serayaGrove,
    facilities: [
      { name: 'Exclusive Clubhouse', description: 'A private venue for community events and family celebrations.', image: amenity1 },
      { name: 'Reading Pavilion & Library Corner', description: 'A quiet, comfortable corner for reading and study.', image: amenity3 },
      { name: 'Pet-Friendly Park', description: 'Open green space for residents and their pets to enjoy.', image: arunaLandscape },
      { name: "Outdoor Swimming Pool with Kids' Splash Area", description: 'A refreshing pool area with space for the whole family.', image: lioraPool },
    ],
  },
];

function FacilityAccordion({ facility, initiallyOpen = false }: { facility: Facility; initiallyOpen?: boolean }): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="border-b border-dashed border-gray-200 last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm"
      >
        <span>{facility.name}</span>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[#f2f2f0] text-[#555]">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="mb-3 text-xs leading-5 text-gray-500">{facility.description}</p>
          <img src={facility.image} alt={facility.name} className="aspect-video w-full object-cover" />
        </div>
      )}
    </div>
  );
}

export default function Amenities(): React.JSX.Element {
  const [selectedFacility, setSelectedFacility] = useState(3);
  const activeFacility = generalFacilities[selectedFacility];

  return (
    <div className="min-h-screen bg-white font-sans text-[#141414] antialiased">
      <Header />
      <main>
        <section className="overflow-hidden pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="mx-auto max-w-2xl px-5 text-center">
            <h1 className="text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl">
              Facilities<br />designed around<br />your needs
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-5 text-gray-500">
              Discover thoughtfully planned amenities and modern facilities designed to support a vibrant, comfortable, and connected lifestyle within Serenia.
            </p>
          </div>

          <div className="amenity-gallery mt-8">
            {galleryImages.map((image, index) => (
              <div
                key={image.alt}
                className={`amenity-gallery__item amenity-gallery__item-${index + 1}`}
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </section>

        <section className="pb-10 pt-2">
          <div className="mx-auto mb-8 max-w-lg px-5 text-center">
            <h2 className="text-2xl font-medium sm:text-3xl">General facilities</h2>
            <p className="mt-2 text-sm leading-5 text-gray-500">
              Facilities and amenities available in all types of clusters, from Type-A to Type-C.
            </p>
          </div>

          <div className="grid overflow-hidden md:grid-cols-2">
            <div className="relative min-h-90 md:min-h-104">
              <img src={activeFacility.image} alt={activeFacility.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                <div>
                  <h3 className="text-lg font-medium">{activeFacility.name}</h3>
                  <p className="mt-1 max-w-md text-xs leading-5 text-white/85">{activeFacility.description}</p>
                </div>
                <span className="hidden shrink-0 text-xs sm:block">{String(selectedFacility + 1).padStart(2, '0')} / 07</span>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-white">
              {generalFacilities.map((facility, index) => (
                <button
                  type="button"
                  key={facility.name}
                  onClick={() => setSelectedFacility(index)}
                  aria-pressed={selectedFacility === index}
                  className={`relative flex min-h-14 items-center justify-center border-b border-gray-100 px-5 text-center text-sm transition-colors last:border-b-0 hover:text-[#141414] sm:px-8 ${selectedFacility === index ? 'font-medium text-[#141414]' : 'text-[#697487]'}`}
                >
                  <span>{facility.name}</span>
                  <span className="absolute right-5 text-xs text-gray-400 sm:right-8">{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-16">
            <div className="mb-8 grid gap-4 md:grid-cols-2 md:items-center">
              <h2 className="max-w-sm text-2xl font-medium leading-tight sm:text-3xl">
                Exclusive facilities in each cluster
              </h2>
              <p className="max-w-md text-sm leading-5 text-gray-500 md:ml-auto">
                Every cluster is thoughtfully designed with its own set of facilities, ensuring comfort and convenience for residents in every neighborhood.
              </p>
            </div>

            <div className="space-y-4">
              {clusterFacilities.map((cluster) => (
                <article key={cluster.name} className="grid gap-5 border border-gray-100 bg-white p-5 sm:p-6 md:grid-cols-2 md:gap-8">
                  <div className="flex min-h-32 flex-col">
                    <h3 className="text-base font-medium capitalize">{cluster.name}</h3>
                    <img src={cluster.image} alt={`${cluster.name} community`} className="mt-4 hidden h-36 w-full object-cover md:block" />
                  </div>
                  <div className="border border-gray-200 px-4">
                    {cluster.facilities.map((facility, index) => (
                      <FacilityAccordion
                        key={facility.name}
                        facility={facility}
                        initiallyOpen={cluster.name === 'Liora estate' && index === 0}
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
