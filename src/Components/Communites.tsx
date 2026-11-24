import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import lioraEstate from '../assets/Liora estate.png';
import navaHeights from '../assets/nava heights.jpg';
import arunaResidence from '../assets/Aruna Residence.jpg';
import veloraPark from '../assets/velora.jpg';
import serayaGrove from '../assets/seraya.jpg';
import communityBadge from '../assets/Vector (1).png';

const communities = [
  {
    name: 'Liora estate',
    image: lioraEstate,
    tag: 'Elegant living, redefined',
    description: 'Premium homes with modern architecture, a private clubhouse, and 24/7 security — offering style and peace of mind.',
    features: ['3–5 Bedroom options', 'Private gate & 24/7 security', 'Near lifestyle center'],
    price: '$120,000',
    href: '/properties',
  },
  {
    name: 'Nava heights',
    image: navaHeights,
    tag: 'Nature meets lifestyle',
    description: 'Designed for eco-living with wide open spaces, scenic jogging tracks, and elevated views that bring nature closer to home.',
    features: ['2–4 Bedroom options', 'Wide roads & open spaces', 'Scenic jogging tracks'],
    price: '$98,000',
    href: '/properties',
  },
  {
    name: 'Aruna residence',
    image: arunaResidence,
    tag: 'The modern comfort',
    description: 'Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.',
    features: ['2–4 Bedroom options', 'Family-friendly facilities', 'Easy access to main boulevard'],
    price: '$85,000',
    href: '/aruna-residence',
  },
  {
    name: 'Velora park',
    image: veloraPark,
    tag: 'Dynamic living, urban vibe',
    description: 'Contemporary homes with pocket parks and direct access to nearby shopping and dining destinations.',
    features: ['2–4 Bedroom options', 'Pocket parks & community spaces', 'Trendy design homes'],
    price: '$105,000',
    href: '/properties',
  },
  {
    name: 'Seraya grove',
    image: serayaGrove,
    tag: 'Living with natural touch',
    description: 'A vibrant community blending modern homes with lush greenery, schools, and welcoming shared spaces.',
    features: ['3–4 Bedroom options', 'Central park & kids area', 'Easy access to public facilities'],
    price: '$95,000',
    href: '/properties',
  },
];

export default function Communities(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: 2 });
  const [selectedIndex, setSelectedIndex] = useState(2);
  const community = communities[selectedIndex];

  useEffect(() => {
    if (!emblaApi) return undefined;

    const updateSelectedIndex = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    updateSelectedIndex();
    emblaApi.on('select', updateSelectedIndex);
    emblaApi.on('reInit', updateSelectedIndex);

    return () => {
      emblaApi.off('select', updateSelectedIndex);
      emblaApi.off('reInit', updateSelectedIndex);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return undefined;

    const intervalId = window.setInterval(() => emblaApi.scrollNext(), 3000);
    return () => window.clearInterval(intervalId);
  }, [emblaApi, selectedIndex]);

  return (
    <section className="bg-gray-50 px-4 py-12 md:px-8 lg:px-16 lg:pt-16 lg:pb-16">
      <h2 className="max-w-xl mx-auto text-center text-[28px] md:text-4xl lg:text-5xl leading-[1.2] font-medium">
        Discover signature communities
      </h2>

      <div className="mt-10 lg:mt-16 flex flex-col lg:flex-row bg-white p-3 shadow-[0_1px_6px_rgba(0,0,0,0.12)]">
        {/* Image */}
        <div className="relative h-72 w-full md:h-96 lg:h-144 lg:w-1/2">
          <div
            ref={emblaRef}
            aria-label="Signature communities"
            aria-roledescription="carousel"
            className="h-full overflow-hidden"
          >
            <div className="flex h-full touch-pan-y">
              {communities.map((item) => (
                <div key={item.name} className="h-full min-w-0 flex-[0_0_100%]">
                  <Link to={item.href} aria-label={`View ${item.name}`} className="block h-full">
                    <img src={item.image} alt={`${item.name} residences`} className="h-full w-full object-cover" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
            {communities.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show ${item.name}`}
                aria-current={selectedIndex === index ? 'true' : undefined}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  selectedIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
              type="button"
              aria-label="Previous community"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex h-9 w-9 items-center justify-center bg-white text-[#282820] transition-colors hover:bg-[#f1f0eb]"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next community"
              onClick={() => emblaApi?.scrollNext()}
              className="flex h-9 w-9 items-center justify-center bg-white text-[#282820] transition-colors hover:bg-[#f1f0eb]"
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="px-5 pt-6 lg:px-10 lg:pt-5">
            <span className="inline-flex items-center gap-2 h-8 px-3 bg-[#FDF1DC] text-[13px] text-[#8A4B0F]">
              <img src={communityBadge} alt="" className="w-3.5 h-3.5" />
              {community.tag}
            </span>
            <h3 className="mt-5 text-2xl lg:text-[28px] font-medium">
              <Link to={community.href} className="hover:text-[#56593B]">{community.name}</Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {community.description}
            </p>
          </div>

          <ul className="px-5 mt-8 lg:px-10 lg:mt-auto lg:pb-8 flex flex-col gap-3 text-sm text-gray-700">
            {community.features.map((feature, index) => (
              <li key={feature} className="flex items-center gap-3">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  {index === 0 ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7M3 14h18M3 18v2M21 18v2" />
                  ) : index === 1 ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l9 16H3L12 4z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                  )}
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 lg:mt-0 flex items-center justify-between px-5 py-5 lg:px-10 lg:py-6 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500">Starts from</p>
              <p className="mt-1 text-xl lg:text-2xl font-medium">{community.price}</p>
            </div>
            <Link to={community.href} className="inline-flex items-center gap-2 h-12 px-6 bg-[#F2F2F2] hover:bg-gray-200 text-sm transition-colors">
              Discover
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}