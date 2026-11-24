import React from 'react';
import award1 from '../assets/1.2 sponsor (2).png';
import award2 from '../assets/2.6 sponsor.png';
import award3 from '../assets/1.3 sponsor.png';
import award4 from '../assets/1.4 sponsor.png';
import award5 from '../assets/1.5 sponsor.png';
import award6 from '../assets/1.6sponsor.png';

export default function Awards(): React.JSX.Element {
  return (
    <section className="bg-[#f8f8f8] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white grid grid-cols-1 md:grid-cols-4 border border-gray-100">
        <div className="md:col-span-2 md:row-span-3 flex flex-col justify-center p-8 md:p-12 mt-100">
          <h2 className="text-2xl md:text-3xl font-medium leading-tight text-gray-900 max-w-xs mb-5">
            Our awards &<br />
            global<br />
            recognition
          </h2>
          <p className="text-[11px] text-gray-600 leading-relaxed max-w-sm mb-8">
            Our achievements are recognized globally, reflecting our commitment to excellence, innovation, and quality.
          </p>
          <h3 className="text-xs font-medium text-gray-900 mb-3">More than 20 years, we known as</h3>
          <ul className="space-y-2 text-[10px] text-gray-600">
            <li className="flex items-center gap-2"><span className="text-[#c99743] text-sm">◉</span> The best housing in Asia</li>
            <li className="flex items-center gap-2"><span className="text-[#c99743] text-sm">◉</span> Housing with optimal resource management</li>
            <li className="flex items-center gap-2"><span className="text-[#c99743] text-sm">◉</span> Housing with an eco-friendly concept</li>
            <li className="flex items-center gap-2"><span className="text-[#c99743] text-sm">◉</span> Housing with the most demand in 2023</li>
          </ul>
        </div>

        <div className="border-l border-b border-gray-200 aspect-square overflow-hidden"><img src={award1} alt="Award 1" className="w-full h-full object-cover" /></div>
        <div className="border-l border-b border-gray-200 aspect-square overflow-hidden"><img src={award2} alt="Award 2" className="w-full h-full object-cover" /></div>
        <div className="border-l border-b border-gray-200 aspect-square overflow-hidden"><img src={award3} alt="Award 3" className="w-full h-full object-cover" /></div>
        <div className="border-l border-b border-gray-200 aspect-square overflow-hidden"><img src={award4} alt="Award 4" className="w-full h-full object-cover" /></div>
        <div className="border-l border-b border-gray-200 aspect-square overflow-hidden"><img src={award5} alt="Award 5" className="w-full h-full object-cover" /></div>
        <div className="border-l border-b border-gray-200 aspect-square overflow-hidden"><img src={award6} alt="Award 6" className="w-full h-full object-cover" /></div>
      </div>
    </section>
  );
}