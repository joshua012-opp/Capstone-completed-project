import React from 'react';
import facilityImage from '../assets/luxery golf.jpg';

export default function Facilities(): React.JSX.Element {
  return (
    <section className="bg-white py-10 mt-75">
      <h2 className="text-center text-2xl md:text-3xl font-medium text-gray-900 mb-10">
        Facility & amenities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[450px] md:h-[600px] overflow-hidden">
          <img src={facilityImage} alt="Golf central playground" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h3 className="text-sm font-medium mb-2">Golf central playground</h3>
            <p className="text-[10px] leading-relaxed max-w-xs">
              A modern residents-only swimming pool with dedicated kids' area and relaxing lounge spaces.
            </p>
            <div className="flex gap-2 mt-5">
              <div className="h-[2px] bg-white w-1/4"></div>
              <div className="h-[2px] bg-white/40 w-1/4"></div>
              <div className="h-[2px] bg-white/40 w-1/4"></div>
              <div className="h-[2px] bg-white/40 w-1/4"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-400">
            <p className="text-xs">Sports Facilities <sup className="text-[8px] ml-1">01</sup></p>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-600">
            <p className="text-xs">The Lifestyle Center <sup className="text-[8px] ml-1">02</sup></p>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-700">
            <p className="text-sm">Children’s Playground <sup className="text-[8px] ml-1">03</sup></p>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-900">
            <p className="text-base">Golf central playground <sup className="text-[8px] ml-1">04</sup></p>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-700">
            <p className="text-sm">Retail & Lifestyle Center <sup className="text-[8px] ml-1">05</sup></p>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-500">
            <p className="text-xs">Cluster clubhouse <sup className="text-[8px] ml-1">06</sup></p>
          </div>
          <div className="flex-1 flex items-center justify-center border-b border-gray-200 py-6 text-gray-400">
            <p className="text-xs">Jogging track <sup className="text-[8px] ml-1">07</sup></p>
          </div>
        </div>
      </div>
    </section>
  );
}