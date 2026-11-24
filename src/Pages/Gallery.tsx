import React, { useState } from 'react';
import galleryContainer from '../assets/Gallery Main Container.png';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const categories = [
  'Outlook',
  'Park',
  'Bedroom',
  'Rooftop',
  'Playground',
  'Kitchen',
  'Bathroom',
  'Family room',
  'Clubhouse',
  'Street',
];

const galleryQuestions = [
  'Are the furniture and decorations in the gallery included in the purchase?',
  'Will the property I purchase look exactly like the gallery images?',
  'Can I visit a show unit to see the interiors in person?',
  'Can I request changes to the kitchen, bedroom, or living room layouts?',
  'Do you provide different design themes for the interiors?',
];

export default function GalleryPage(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('Kitchen');

  return (
    <div className="min-h-screen bg-white font-sans text-[#141414] antialiased">
      <Header />
      <main>
        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 sm:px-8 md:flex-row md:items-center md:justify-between md:py-10">
          <div>
            <h1 className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl">Our gallery</h1>
            <p className="mt-3 max-w-sm text-xs leading-5 text-[#555]">
              Explore our community’s charm with elegant homes and amenities, perfect for your family’s comfort.
            </p>
          </div>

          <label className="flex w-full flex-col gap-2 text-xs md:w-60">
            <span className="font-medium">Clusters</span>
            <span className="relative">
              <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm">⌂</span>
              <select
                name="cluster"
                defaultValue="All clusters"
                className="h-10 w-full appearance-none border border-gray-300 bg-white pl-9 pr-8 text-xs outline-none focus:border-[#56593B]"
              >
                <option>All clusters</option>
                <option>Liora estate</option>
                <option>Nava heights</option>
                <option>Aruna residence</option>
                <option>Velora park</option>
                <option>Seraya grove</option>
              </select>
              <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">⌄</span>
            </span>
          </label>
        </section>

        <section aria-label="Gallery categories" className="px-2">
          <div className="flex gap-1 overflow-x-auto bg-[#f3f3f3] p-1 sm:justify-between">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`min-w-20 flex-1 whitespace-nowrap px-3 py-2 text-[10px] transition-colors sm:min-w-0 ${selectedCategory === category ? 'bg-white text-[#141414]' : 'text-gray-500 hover:bg-white/70 hover:text-[#141414]'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section aria-label="Gallery image collage" className="px-2 pt-4">
          <img
            src={galleryContainer}
            alt="Serenia home gallery collage featuring kitchens and dining spaces"
            className="block h-auto w-full"
          />
        </section>

        <section className="mt-8 bg-[#fafafa] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mx-auto mb-9 max-w-sm text-center text-3xl font-normal leading-tight sm:mb-10 sm:text-4xl">
              FAQs after our<br />customer sees<br />gallery
            </h2>

            <div className="space-y-2">
              {galleryQuestions.map((question, index) => (
                <details key={question} open={index === 0} className="group bg-white">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm sm:px-5">
                    {question}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg leading-none">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:block">−</span>
                    </span>
                  </summary>
                  {index === 0 ? (
                    <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5">
                      <p>
                        The standard purchase includes the house structure and built-in features only. Furniture and decorations shown in the gallery are for illustration purposes and not part of the purchase.
                      </p>
                      <p className="mt-2">
                        However, we do offer optional furnishing packages if you would like a move-in-ready home. These packages typically include:
                      </p>
                      <ul className="my-2 list-disc space-y-1 pl-5">
                        <li><strong>Living Room:</strong> Sofa set, coffee table, TV cabinet, lighting fixtures.</li>
                        <li><strong>Dining Area:</strong> Dining table, chairs, accent decor.</li>
                        <li><strong>Bedrooms:</strong> Beds, wardrobes, side tables, bedding options.</li>
                        <li><strong>Kitchen &amp; Pantry:</strong> Extra storage units, selected appliances, bar stools (depending on package).</li>
                        <li><strong>Decorations:</strong> Wall art, rugs, and accessories to complete the look.</li>
                      </ul>
                      <p className="mt-2">
                        This way, you can either fully personalize your interiors or choose from our curated packages for added convenience.
                      </p>
                    </div>
                  ) : (
                    <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5">
                      Contact our team to discuss available home designs, show-unit visits, customization options, and furnishing packages.
                    </div>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
