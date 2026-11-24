import React from 'react';
import { Link } from 'react-router-dom';
import bathroomImage from '../assets/bathroom2.png';
import kitchenImage from '../assets/kitchen 2.png';
import familyRoomImage from '../assets/family room 2.png';
import rooftopImage from '../assets/rooftop2.png';
import workspaceImage from '../assets/workspace.png';
import bedroomImage from '../assets/bedroom.png';
import stairsImage from '../assets/stairs.png';
import backyardImage from '../assets/backyard.png';
import interiorsImage from '../assets/interios.png';

interface GalleryItem {
  title: string;
  img: string;
}

const galleryItems: GalleryItem[] = [
  { title: "Bathroom", img: bathroomImage },
  { title: "Kitchen & Dining", img: kitchenImage },
  { title: "Family room", img: familyRoomImage },
  { title: "Rooftop", img: rooftopImage },
  { title: "Workspace", img: workspaceImage },
  { title: "Bedroom", img: bedroomImage },
  { title: "Stairs", img: stairsImage },
  { title: "Backyard", img: backyardImage },
  { title: "Interiors", img: interiorsImage },
];

export default function Gallery(): React.JSX.Element {
  return (
    <section className="w-full bg-[#141414] px-6 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-medium tracking-wide text-white sm:text-3xl">Our gallery</h2>
          <p className="mt-2 text-[10px] leading-relaxed text-gray-300">
            Temukan berbagai keindahan dari semua dalam<br />galery kami, baik itu exterior maupun interior
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="overflow-hidden bg-[#242424]">
              <h3 className="flex h-10 items-center justify-center text-xs text-white">{item.title}</h3>
              <div className="aspect-square overflow-hidden">
                <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 text-center">
          <p className="mt-8 text-[12px] leading-relaxed text-gray-300">
            And there are many other gallery<br />categories and photos, discover<br />now
          </p>
          <Link to="/gallery" className="inline-flex items-center gap-2 h-12 px-6 bg-[#F2F2F2] hover:bg-gray-200 text-sm transition-colors mt-4">
            View All Gallery's
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}