import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import lioraEstateImage from '../assets/Liora estate.png';
import navaHeightsImage from '../assets/nava heights.jpg';
import arunaResidenceImage from '../assets/Aruna Residence.jpg';
import veloraParkImage from '../assets/velora.jpg';
import serayaGroveImage from '../assets/seraya.jpg';

function FeatureMark(): React.JSX.Element {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#56593B]/10 text-[#56593B]" aria-hidden="true">
      <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="m5 12 4 4L19 6" />
      </svg>
    </span>
  );
}

export default function Properties(): React.JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [successToast, setSuccessToast] = useState(
    (location.state as { clusterWizardToast?: string } | null)?.clusterWizardToast ?? '',
  );

  useEffect(() => {
    if (!successToast) return undefined;
    const timeout = window.setTimeout(() => {
      setSuccessToast('');
      navigate(location.pathname, { replace: true, state: null });
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [location.pathname, navigate, successToast]);

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans antialiased">
      {/* Shared Header */}
      <Header />
      {successToast && (
        <div role="status" className="fixed right-4 top-20 z-70 max-w-sm rounded-xl border border-[#d9ddc9] bg-white px-4 py-3 text-xs text-[#4f5835] shadow-lg">
          {successToast}
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-16 py-12">
        
        {/* Page Title & Subtitle Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-normal tracking-tight mb-4">
            Every community <br /> have their unique
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            Explore thoughtfully designed residences that combine comfort, style, and a sense of belonging.
          </p>
        </div>

        {/* Filters and Search Bar Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-12 bg-white p-4 border border-[#E7E8E8] rounded-xl">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Location Filter */}
            <div className="flex items-center justify-between border border-[#E7E8E8] px-4 py-2.5 rounded-lg text-sm bg-white min-w-40 cursor-pointer">
              <span className="text-gray-600">Location : <span className="text-black font-medium">All location</span></span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Price Filter */}
            <div className="flex items-center justify-between border border-[#E7E8E8] px-4 py-2.5 rounded-lg text-sm bg-white min-w-40 cursor-pointer">
              <span className="text-gray-600">Price : <span className="text-black font-medium">All price</span></span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search cluster name" 
              className="w-full pl-10 pr-4 py-2.5 border border-[#E7E8E8] rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Property Listings Feed */}
        <div className="space-y-8">
          
          {/* Listing Card 1: Liora estate */}
          <div className="bg-white border border-[#E7E8E8] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
            
            {/* Image Container (Left Side) */}
            <div className="lg:col-span-7 relative bg-gray-100 rounded-xl overflow-hidden h-80 lg:h-95">
              <img 
                src={lioraEstateImage}
                alt="Liora estate" 
                className="w-full h-full object-cover"
              />
              {/* Image Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              </div>
            </div>

            {/* Content Container (Right Side) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
              <div>
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 bg-[#FEF6E6] text-[#B8860B] text-xs font-medium px-2.5 py-1 rounded-md mb-4">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Elegant living, redefined
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2">Liora estate</h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.
                </p>

                {/* Features List */}
                <div className="space-y-2.5 text-sm text-gray-700 border-t border-b border-[#E7E8E8] py-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>3-5 Bedroom options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>Private gate & 24/7 security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>Near lifestyle center</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Button row */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="block text-xs text-gray-500">Starts from</span>
                  <span className="text-xl font-bold text-black">$120,000</span>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F2F2F2] hover:bg-gray-200 text-sm font-medium rounded-lg transition-colors">
                  Discover 
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>

          </div>

          {/* Listing Card 2: Nava heights */}
          <div className="bg-white border border-[#E7E8E8] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
            
            {/* Image Container */}
            <div className="lg:col-span-7 relative bg-gray-100 rounded-xl overflow-hidden h-80 lg:h-95">
              <img 
                src={navaHeightsImage}
                alt="Nava heights" 
                className="w-full h-full object-cover"
              />
              {/* Image Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              </div>
            </div>

            {/* Content Container */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
              <div>
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 bg-[#FEF6E6] text-[#B8860B] text-xs font-medium px-2.5 py-1 rounded-md mb-4">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Nature meets lifestyle
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2">Nava heights</h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Designed for eco-living with wide open spaces, scenic jogging tracks, and elevated views that bring nature closer to home.
                </p>

                {/* Features List */}
                <div className="space-y-2.5 text-sm text-gray-700 border-t border-b border-[#E7E8E8] py-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>2-4 Bedroom options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>Wide roads & open spaces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>Scenic jogging tracks</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Button row */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="block text-xs text-gray-500">Starts from</span>
                  <span className="text-xl font-bold text-black">$98,000</span>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F2F2F2] hover:bg-gray-200 text-sm font-medium rounded-lg transition-colors">
                  Discover 
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>

          </div>

          {/* Listing Card 3: Aruna residence */}
          <div className="bg-white border border-[#E7E8E8] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
            
            {/* Image Container */}
            <Link to="/aruna-residence" aria-label="View Aruna Residence details" className="lg:col-span-7 relative block bg-gray-100 rounded-xl overflow-hidden h-80 lg:h-95">
              <img 
                src={arunaResidenceImage}
                alt="Aruna residence" 
                className="w-full h-full object-cover"
              />
              {/* Image Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              </div>
            </Link>

            {/* Content Container */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
              <div>
                {/* Tag */}
                <div className="inline-flex items-center gap-1.5 bg-[#FEF6E6] text-[#B8860B] text-xs font-medium px-2.5 py-1 rounded-md mb-4">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  The modern comfort
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2">
                  <Link to="/aruna-residence" className="hover:text-[#56593B]">Aruna residence</Link>
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.
                </p>

                {/* Features List */}
                <div className="space-y-2.5 text-sm text-gray-700 border-t border-b border-[#E7E8E8] py-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>2-4 Bedroom options</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>Family-friendly facilities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatureMark />
                    <span>Easy access to main boulevard</span>
                  </div>
                </div>
              </div>

              {/* Bottom Price & Button row */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="block text-xs text-gray-500">Starts from</span>
                  <span className="text-xl font-bold text-black">$85,000</span>
                </div>
                <Link to="/aruna-residence" className="flex items-center gap-2 px-5 py-2.5 bg-[#F2F2F2] hover:bg-gray-200 text-sm font-medium rounded-lg transition-colors">
                  Discover 
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>

          </div>

          {/* Listing Card 4: Velora park */}
<div className="bg-white border border-[#E7E8E8] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
  
  {/* Image Container */}
  <div className="lg:col-span-7 relative bg-gray-100 rounded-xl overflow-hidden h-80 lg:h-95">
    <img 
      src={veloraParkImage}
      alt="Velora park" 
      className="w-full h-full object-cover"
    />
    {/* Image Slider Indicators */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
    </div>
  </div>

  {/* Content Container */}
  <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
    <div>
      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 bg-[#FEF6E6] text-[#B8860B] text-xs font-medium px-2.5 py-1 rounded-md mb-4">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
        Dynamic living, urban vibe
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Velora park</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Contemporary cluster with stylish facades, pocket parks, and direct access to shopping and dining hubs.
      </p>

      {/* Features List */}
      <div className="space-y-2.5 text-sm text-gray-700 border-t border-b border-[#E7E8E8] py-4 mb-6">
        <div className="flex items-center gap-2">
          <FeatureMark />
          <span>2-4 Bedroom options</span>
        </div>
        <div className="flex items-center gap-2">
          <FeatureMark />
          <span>Pocket parks & community spaces</span>
        </div>
        <div className="flex items-center gap-2">
          <FeatureMark />
          <span>Trendy design homes</span>
        </div>
      </div>
    </div>

    {/* Bottom Price & Button row */}
    <div className="flex items-center justify-between pt-2">
      <div>
        <span className="block text-xs text-gray-500">Starts from</span>
        <span className="text-xl font-bold text-black">$105,000</span>
      </div>
      <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F2F2F2] hover:bg-gray-200 text-sm font-medium rounded-lg transition-colors">
        Discover 
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>

  </div>
</div>

{/* Listing Card 5: Seraya grove */}
<div className="bg-white border border-[#E7E8E8] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
  
  {/* Image Container */}
  <div className="lg:col-span-7 relative bg-gray-100 rounded-xl overflow-hidden h-80 lg:h-95">
    <img 
      src={serayaGroveImage}
      alt="Seraya grove" 
      className="w-full h-full object-cover"
    />
    {/* Image Slider Indicators */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
      <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
    </div>
  </div>

  {/* Content Container */}
  <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
    <div>
      {/* Tag */}
      <div className="inline-flex items-center gap-1.5 bg-[#FEF6E6] text-[#B8860B] text-xs font-medium px-2.5 py-1 rounded-md mb-4">
        <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
        Living with natural touch
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Seraya grove</h2>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        A vibrant cluster blending modern housing with lush greenery, close to schools and community spaces.
      </p>

      {/* Features List */}
      <div className="space-y-2.5 text-sm text-gray-700 border-t border-b border-[#E7E8E8] py-4 mb-6">
        <div className="flex items-center gap-2">
          <FeatureMark />
          <span>3-4 Bedroom options</span>
        </div>
        <div className="flex items-center gap-2">
          <FeatureMark />
          <span>Central park & kids area</span>
        </div>
        <div className="flex items-center gap-2">
          <FeatureMark />
          <span>Easy access to public facilities</span>
        </div>
      </div>
    </div>

    {/* Bottom Price & Button row */}
    <div className="flex items-center justify-between pt-2">
      <div>
        <span className="block text-xs text-gray-500">Starts from</span>
        <span className="text-xl font-bold text-black">$95,000</span>
      </div>
      <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F2F2F2] hover:bg-gray-200 text-sm font-medium rounded-lg transition-colors">
        Discover 
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>

  </div>
</div>

        </div>

      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}