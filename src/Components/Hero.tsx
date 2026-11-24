import React from 'react';
import awards from '../assets/gold-award-laurel-wreath-accessories-decoration-chandelier 1.png';
import preferenceIcon from '../assets/Preference Icon.png';
import vectorIcon from '../assets/Vector.png';
import searchIcon from '../assets/search-line.png';

export default function Hero(): React.JSX.Element {
  return (
    <section className="flex flex-col md:flex-row">
      {/* Left */}
      <div className="md:w-1/2 px-4 py-8 md:px-8 lg:px-16 md:pt-6.5 md:pb-3.5">
        <div className="inline-flex items-center gap-2 h-9 px-3 bg-[#FDF1DC] text-sm text-[#8A4B0F]">
          <img src={awards} alt="Award" />
          <span>Winner of the IPA 2025</span>
        </div>

        <h1 className="mt-5 text-5xl lg:text-6xl xl:text-[64px] leading-[1.2] font-normal">
          Timeless <br className="hidden md:block" />living modern <br className="hidden md:block" />touch.
        </h1>

        <p className="mt-6 md:mt-8 max-w-sm text-sm leading-6.25 text-[#3d3d3d]">
          Explore thoughtfully designed residences that combine comfort, style, and a sense of belonging.
        </p>
      </div>

      {/* Right */}
      <div className="md:w-1/2 flex justify-center items-start bg-gray-50 px-4 py-8 md:px-8 lg:px-16 md:py-16">
        <div className="w-full max-w-148 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]">
          {/* Card header */}
          <div className="flex items-center gap-2 h-14 px-6 border-b border-[#E7E8E8] font-medium">
            <img src={preferenceIcon} alt="Preference" className="w-4 h-4" />
            <span>Find your house preference</span>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 p-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="cluster" className="text-xs font-semibold text-gray-500">Cluster</label>
              <div className="relative">
                <select
                  id="cluster"
                  className="w-full h-12 pl-3 pr-8 bg-white border border-gray-200 text-sm text-gray-800 appearance-none focus:outline-none focus:border-gray-400"
                >
                  <option value="ardenia-park">Ardenia park</option>
                </select>
                <img
                  src={vectorIcon}
                  alt=""
                  className="w-2 h-2 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="price-range" className="text-xs font-semibold text-gray-500">Price range</label>
              <div className="relative">
                <select
                  id="price-range"
                  className="w-full h-12 pl-3 pr-8 bg-white border border-gray-200 text-sm text-gray-800 appearance-none focus:outline-none focus:border-gray-400"
                >
                  <option value="85-120">$85.000 - $120.000</option>
                </select>
                <img
                  src={vectorIcon}
                  alt=""
                  className="w-2 h-2 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="bedroom" className="text-xs font-semibold text-gray-500">Bedroom</label>
              <div className="relative">
                <select
                  id="bedroom"
                  className="w-full h-12 pl-3 pr-8 bg-white border border-gray-200 text-sm text-gray-800 appearance-none focus:outline-none focus:border-gray-400"
                >
                  <option value="3">3</option>
                </select>
                <img
                  src={vectorIcon}
                  alt=""
                  className="w-2 h-2 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="address" className="text-xs font-semibold text-gray-500">Address</label>
              <div className="relative">
                <img
                  src={searchIcon}
                  alt="Search"
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
                <input
                  id="address"
                  type="text"
                  placeholder="Enter address"
                  className="w-full h-12 pl-9 pr-3 bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <button
              type="button"
              className="h-12 self-end md:col-span-2 xl:col-span-1 text-sm text-white bg-[#56593B] hover:bg-[#474a31] transition-colors"
            >
              Show the result
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}