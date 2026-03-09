import { useEffect, useRef } from "react";
import { ArrowRightIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../../../../components/ui/button";
import { useContent } from "../../../../context/ContentContext";

gsap.registerPlugin(ScrollTrigger);

const defaultOrbitImages = [
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=200&q=80",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=200&q=80",
  "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&q=80",
];

const rings = [
  { r: 250, angle: 180, size: 55 },
  { r: 350, angle: 210, size: 60 },
  { r: 450, angle: 170, size: 65 },
  { r: 550, angle: 190, size: 55 },
  { r: 650, angle: 200, size: 60 },
];

const CENTER_X = 900;
const CENTER_Y = 400;

export const SiteReviewSection = () => {
  const { content, getImageUrl } = useContent();
  const siteReview = content?.siteReview || {};
  const heading = siteReview.heading || "Let's review your site requirement";
  const subheading = siteReview.subheading || "Share basic details we'll assess feasibility and next step";
  const sectionRef = useRef(null);
  const groupRefs = useRef([]);
  const orbitImages = (siteReview.orbitImages || [])
    .slice(0, 5)
    .map((url) => getImageUrl(url));

  useEffect(() => {
    const groups = groupRefs.current.filter(Boolean);
    if (groups.length === 0) return;

    gsap.set(groups, { y: 600, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    groups.forEach((group, i) => {
      tl.to(group, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }, i * 0.2);
    });

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#546232] overflow-hidden min-h-[450px]">
      <div className="absolute right-0 top-0 h-full w-[65vw] pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full w-full"
          viewBox="0 0 900 600"
          preserveAspectRatio="xMaxYMid slice"
          fill="none"
        >
          {rings.map((ring, i) => {
            const rad = (ring.angle * Math.PI) / 180;
            const cx = CENTER_X + ring.r * Math.cos(rad);
            const cy = CENTER_Y + ring.r * Math.sin(rad);
            return (
              <g key={i} ref={(el) => (groupRefs.current[i] = el)}>
                <clipPath id={`orbit-clip-${i}`}>
                  <circle cx={cx} cy={cy} r={ring.size / 2} />
                </clipPath>
                <circle
                  cx={CENTER_X}
                  cy={CENTER_Y}
                  r={ring.r}
                  stroke="rgba(200,255,120,0.25)"
                  strokeWidth="1"
                />
                <image
                  href={orbitImages[i] || ""}
                  x={cx - ring.size / 2}
                  y={cy - ring.size / 2}
                  width={ring.size}
                  height={ring.size}
                  clipPath={`url(#orbit-clip-${i})`}
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 px-6 md:px-[150px] py-[100px]">
        <div className="flex flex-col gap-10 max-w-[600px]">
          <div className="flex flex-col gap-5 translate-y-[-1rem] animate-fade-in opacity-0">
            <h2 className="font-global-tokens-headings-h-1 font-[number:var(--global-tokens-headings-h-1-font-weight)] text-white text-[length:var(--global-tokens-headings-h-1-font-size)] tracking-[var(--global-tokens-headings-h-1-letter-spacing)] leading-[var(--global-tokens-headings-h-1-line-height)] [font-style:var(--global-tokens-headings-h-1-font-style)]">
              {heading?.replace(/\n/g, " ") || "Let's review your site requirement"}
            </h2>
            <p className="whitespace-nowrap font-global-tokens-body-b-1 font-[number:var(--global-tokens-body-b-1-font-weight)] text-white/70 text-[length:var(--global-tokens-body-b-1-font-size)] tracking-[var(--global-tokens-body-b-1-letter-spacing)] leading-[var(--global-tokens-body-b-1-line-height)] [font-style:var(--global-tokens-body-b-1-font-style)]">
              {subheading}
            </p>
          </div>

          <div className="flex items-center gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <Button className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300">
              <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#172b4d] text-lg tracking-[0] leading-[21.6px]">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-180%] group-hover:skew-y-12">
                  Schedule Discussion
                </div>
                <div className="absolute translate-y-[164%] skew-y-15 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Schedule Discussion
                </div>
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#172b4d] transition-transform duration-500 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-transparent border border-white/40 rounded-[300px] hover:bg-white/10 transition-all duration-300"
            >
              <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-white text-lg tracking-[0] leading-[21.6px]">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                  Request Call Back
                </div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Request Call Back
                </div>
              </span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-white/60 transition-transform duration-500 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
