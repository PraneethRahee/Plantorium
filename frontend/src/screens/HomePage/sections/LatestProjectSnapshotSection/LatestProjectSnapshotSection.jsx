import { useState, useMemo } from "react";
import { Button } from "../../../../components/ui/button";
import { useContent } from "../../../../context/ContentContext";

const DEFAULT_PROJECT_IMAGES = [
  { src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80", alt: "Garden landscape design" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", alt: "Modern courtyard planting" },
  { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80", alt: "Lush green garden path" },
  { src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80", alt: "Urban planting project" },
  { src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80", alt: "Botanical installation" },
  { src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80", alt: "Residential landscape" },
];

const IMAGE_HEIGHT = 180;
const GAP = 16;
const VISIBLE_COUNT = 3;
const containerHeight = VISIBLE_COUNT * IMAGE_HEIGHT + (VISIBLE_COUNT - 1) * GAP;

export const LatestProjectSnapshotSection = () => {
  const { content, getImageUrl } = useContent();
  const latest = content?.latest || {};
  const heading = latest.heading || "Latest Project Snapshot";
  const subheading = latest.subheading || "Share basic details we'll assess feasibility and next step";
  const iconUrl = getImageUrl(content?.hero?.iconUrl);
  const [hoveredImg, setHoveredImg] = useState(null);
  const projectImages = useMemo(() => {
    const raw = content?.latest?.projectImages || [];
    return raw.map((img) => ({ ...img, src: getImageUrl(img.src) }));
  }, [content?.latest?.projectImages, getImageUrl]);
  const colLeft = projectImages.slice(0, 3);
  const colRight = projectImages.slice(3, 6);

  return (
    <section className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .snapshot-scroll-up {
          animation: scroll-up 15s linear infinite;
        }
        .snapshot-scroll-down {
          animation: scroll-down 15s linear infinite;
        }
        .scroll-col:hover .snapshot-scroll-up,
        .scroll-col:hover .snapshot-scroll-down {
          animation-play-state: paused;
        }
      `}</style>

      {hoveredImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none transition-opacity duration-300">
          <img
            src={getImageUrl(hoveredImg.src)}
            alt={hoveredImg.alt}
            className="max-w-[70vw] max-h-[70vh] object-cover rounded-xl shadow-2xl"
          />
        </div>
      )}

      <div className="bg-[#546232] py-[120px] px-6 md:px-[150px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
          <div className="flex flex-col gap-[54px]">
            <div className="flex flex-col gap-5">
              <h2 className="font-global-tokens-headings-h-1 font-[number:var(--global-tokens-headings-h-1-font-weight)] text-white text-[length:var(--global-tokens-headings-h-1-font-size)] tracking-[var(--global-tokens-headings-h-1-letter-spacing)] leading-[var(--global-tokens-headings-h-1-line-height)] [font-style:var(--global-tokens-headings-h-1-font-style)]">
                {heading}
              </h2>
              <p className="font-global-tokens-body-b-1 font-[number:var(--global-tokens-body-b-1-font-weight)] text-white/80 text-[length:var(--global-tokens-body-b-1-font-size)] tracking-[var(--global-tokens-body-b-1-letter-spacing)] leading-[var(--global-tokens-body-b-1-line-height)] [font-style:var(--global-tokens-body-b-1-font-style)]">
                {subheading}
              </p>
            </div>

            <Button className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300 w-fit">
              <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#172b4d] text-lg tracking-[0] leading-[21.6px]">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                  Contact Us
                </div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Contact Us
                </div>
              </span>
              {iconUrl && (
                <img
                  className="w-3.5 h-3.5 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-45"
                  alt="Icon"
                  src={iconUrl}
                />
              )}
            </Button>
          </div>

          <div className="overflow-hidden" style={{ height: containerHeight }}>
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="scroll-col overflow-hidden">
                <div className="snapshot-scroll-up flex flex-col">
                  {[...colLeft, ...colLeft].map((img, i) => (
                    <div
                      key={i}
                      className="w-full shrink-0 rounded-lg overflow-hidden cursor-pointer"
                      style={{ height: IMAGE_HEIGHT, marginBottom: GAP }}
                      onMouseEnter={() => setHoveredImg(img)}
                      onMouseLeave={() => setHoveredImg(null)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="scroll-col overflow-hidden">
                <div className="snapshot-scroll-down flex flex-col">
                  {[...colRight, ...colRight].map((img, i) => (
                    <div
                      key={i}
                      className="w-full shrink-0 rounded-lg overflow-hidden cursor-pointer"
                      style={{ height: IMAGE_HEIGHT, marginBottom: GAP }}
                      onMouseEnter={() => setHoveredImg(img)}
                      onMouseLeave={() => setHoveredImg(null)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
