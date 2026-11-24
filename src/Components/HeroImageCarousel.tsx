import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import firstHeroImage from '../assets/image 2.jpg';
import secondHeroImage from '../assets/second hero.jpg';
import thirdHeroImage from '../assets/third hero.jpg';

const slides = [
  { src: firstHeroImage, alt: 'Serenia residential community at sunset' },
  { src: secondHeroImage, alt: 'Modern home kitchen and dining area' },
  { src: thirdHeroImage, alt: 'Contemporary Serenia residences' },
];

export default function HeroImageCarousel(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    <section aria-label="Featured Serenia residences" aria-roledescription="carousel" className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {slides.map((slide) => (
            <div key={slide.src} className="relative aspect-[16/9] min-w-0 flex-[0_0_100%]">
              <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/60 to-transparent" />

      <div className="absolute bottom-5 left-5 z-10 flex gap-2 sm:bottom-7 sm:left-7">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${index + 1}: ${slide.alt}`}
            aria-current={selectedIndex === index ? 'true' : undefined}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-14 w-20 overflow-hidden border-2 transition-opacity sm:h-20 sm:w-28 ${
              selectedIndex === index ? 'border-white opacity-100' : 'border-white/50 opacity-75 hover:opacity-100'
            }`}
          >
            <img src={slide.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 right-5 z-10 flex gap-2 sm:bottom-8 sm:right-7">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-9 w-9 items-center justify-center bg-white text-[#282820] transition-colors hover:bg-[#f1f0eb] sm:h-10 sm:w-10"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-9 w-9 items-center justify-center bg-white text-[#282820] transition-colors hover:bg-[#f1f0eb] sm:h-10 sm:w-10"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute inset-x-4 bottom-0 z-10 h-0.5 bg-white/45 sm:inset-x-6">
        <div
          className="h-full bg-white transition-[width] duration-300"
          style={{ width: `${((selectedIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
