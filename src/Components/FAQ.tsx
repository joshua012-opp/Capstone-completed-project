import React from 'react';

export default function FAQ(): React.JSX.Element {
  return (
    <section className="w-full bg-[#fafafa] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-275">
        <h2 className="mx-auto mb-9 max-w-87.5 text-center text-3xl font-normal leading-tight text-[#171717] sm:mb-10 sm:text-4xl">
          Frequently<br />asked<br />questions
        </h2>

        <div className="space-y-2">
          <details open className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              What types of properties does Serenia offer?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg leading-none">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              <p className="mb-2">We provide a wide range of properties, including:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Residential Homes</strong> – exclusive housing with modern design.</li>
                <li><strong>Apartments</strong> – vertical living with complete facilities.</li>
                <li><strong>Commercial Spaces</strong> – shop houses and business areas.</li>
                <li><strong>Integrated Townships</strong> – complete with malls, green parks, schools, and lifestyle facilities.</li>
              </ul>
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              Where are Serenia’s projects located?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              Serenia's developments are strategically located in carefully selected areas, offering convenient access to essential amenities and lifestyle destinations.
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              What are the benefits of owning a Serenia property?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              Enjoy modern designs, quality construction, convenient locations, lifestyle amenities, and potential long-term investment value.
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              How can I purchase a Serenia property?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              Contact our sales team to explore available properties, schedule a consultation, and arrange a viewing.
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              Does Serenia offer financing or mortgage options?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              We can guide prospective buyers through available financing and mortgage options.
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              Is Serenia suitable for both living and investment?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              Yes. Our properties are designed for comfortable modern living while offering potential real estate investment opportunities.
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              Does Serenia manage public facilities within its townships?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              Our township developments are designed with shared amenities and public facilities to support a comfortable community lifestyle.
            </div>
          </details>

          <details className="group bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm text-[#171717] sm:px-5 sm:text-base">
              Are there any promotions or special payment plans?
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#f3f3f3] text-lg">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="border-t border-gray-100 px-4 py-4 text-xs leading-relaxed text-[#555] sm:px-5 sm:text-sm">
              Contact our sales team for information about current promotions and available payment plans.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}