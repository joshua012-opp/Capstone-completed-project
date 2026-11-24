import React from 'react';
import visionImage from '../assets/Group.png';

export default function VisionSection(): React.JSX.Element {
  return (
    <section className="bg-[#111111] text-white min-h-screen px-6 md:px-12 pt-10 relative">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-medium leading-tight max-w-md">
            Shaping the<br />
            timeless of the<br />
            living spaces
          </h1>
        </div>

        <div className="max-w-xs">
          <p className="text-xs text-gray-300 leading-relaxed mb-3">
            With a vision to redefine urban living, Serenia brings together world-class design, trusted quality, and thoughtful planning.
          </p>
          <p className="text-xs text-gray-300 leading-relaxed mb-7">
            Guided by innovation and sustainability, Serenia continuously strives to deliver living spaces that harmonize comfort and value.
          </p>
          <div className="flex gap-2">
            <button className="bg-white text-black px-4 py-2 text-xs">View our vision</button>
            <button className="bg-[#383838] text-white px-4 py-2 text-xs">Explore community</button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full top-75">
        <img src={visionImage} alt="Modern building" className="w-full h-auto object-contain" />
      </div>
    </section>
  );
}