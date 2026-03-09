import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { useContent } from "../../../../context/ContentContext";

const DEFAULT_NAV = [{ label: "Home" }, { label: "About" }];
const DEFAULT_SLIDER = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&q=80",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80",
  "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1920&q=80",
];
const DEFAULT_STATS = [
  { value: "100+", label: "Over All Project" },
  { value: "30+", label: "Commercial & Residential" },
  { value: "12+", label: "Years of Experience" },
  { value: "100%", label: "Customer  Satisfaction" },
];

export const HeroSection = () => {
  const { content, getImageUrl } = useContent();
  const hero = content?.hero || {};
  const navigationItems = hero.navigationItems?.length ? hero.navigationItems : DEFAULT_NAV;
  const sliderImages = (hero.sliderImages || []).map((s) => getImageUrl(s));
  const statsData = hero.statsData?.length ? hero.statsData : DEFAULT_STATS;
  const mainHeading = hero.mainHeading || "Reliable Planting Execution";
  const logoUrl = getImageUrl(hero.logoUrl);
  const logoBgUrl = getImageUrl(hero.logoBackgroundUrl);
  const brandLogoUrl = getImageUrl(hero.brandLogoUrl);
  const iconUrl = getImageUrl(hero.iconUrl);
  const testimonial = hero.testimonial || {};
  const marqueeLogoUrl = getImageUrl(hero.marqueeLogoUrl);
  const customerImageUrl = getImageUrl(testimonial.customerImageUrl);
  const slidesRef = useRef([]);
  const currentSlideIndex = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const slides = slidesRef.current.filter(Boolean);
    if (slides.length === 0) return;

    slides.forEach((slide, index) => {
      if (index !== 0) {
        const img = slide.querySelector("img");
        if (img) {
          gsap.set(img, { scale: 2, top: "4em" });
        }
      }
    });

    function showSlide(index) {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const slide = slides[index];
      const img = slide.querySelector("img");

      gsap.to(img, {
        scale: 1,
        top: "0%",
        duration: 2,
        ease: "power3.inOut",
      });

      gsap.to(slide, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }

    function resetToFirst() {
      if (isAnimating.current) return;
      isAnimating.current = true;

      for (let i = slides.length - 1; i >= 1; i--) {
        const slide = slides[i];
        const img = slide.querySelector("img");

        gsap.to(img, {
          scale: 2,
          top: "4em",
          duration: 2,
          ease: "power3.inOut",
        });

        gsap.to(slide, {
          clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
          duration: 2,
          ease: "power4.inOut",
          onComplete:
            i === 1
              ? () => {
                  isAnimating.current = false;
                }
              : undefined,
        });
      }

      currentSlideIndex.current = 0;
    }

    const autoPlay = setInterval(() => {
      if (isAnimating.current) return;

      if (currentSlideIndex.current < slides.length - 1) {
        showSlide(currentSlideIndex.current + 1);
        currentSlideIndex.current++;
      } else {
        resetToFirst();
      }
    }, 5000);

    return () => {
      clearInterval(autoPlay);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        {sliderImages.map((src, i) => (
          <div
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath:
                i === 0
                  ? "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)"
                  : "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
            }}
          >
            <img
              src={getImageUrl(src)}
              alt={`slide-${i + 1}`}
              className="absolute w-full h-full object-cover"
              style={{ top: 0 }}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_43%,rgba(0,0,0,0.05)_61%)]" />
      <div className="relative z-10 flex flex-col h-full">
        <nav className="w-full px-6 md:px-[150px] pt-6 shrink-0 translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="flex items-center justify-between px-5 py-3.5 bg-white rounded-[300px] border border-solid border-[#a7c463]">
            <div className="inline-flex items-center gap-3">
              {logoUrl && (
                <div
                  className="relative w-16 h-16 bg-[100%_100%]"
                  style={{ backgroundImage: logoBgUrl ? `url(${logoBgUrl})` : undefined }}
                >
                  <img
                    className="absolute top-1/2 -translate-y-1/2 left-0 w-16 h-16"
                    alt="Logo"
                    src={logoUrl}
                  />
                </div>
              )}
              {brandLogoUrl && (
                <img
                  className="w-[155px] h-7"
                  alt="Brand name"
                  src={brandLogoUrl}
                />
              )}
            </div>

            <div className="inline-flex items-center gap-[107px]">
              <nav className="inline-flex items-center gap-[29px]">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    className="group/nav flex items-center justify-center font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-black text-[length:var(--global-tokens-headings-h-5-font-size)] text-center tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] [font-style:var(--global-tokens-headings-h-5-font-style)] transition-all duration-300 hover:text-[#5a8c2e] hover:tracking-wide"
                  >
                    <span className="relative inline-block py-1 transition-transform duration-300 group-hover/nav:scale-[1.02]">
                      {item.label}
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a7c463] origin-center scale-x-0 transition-transform duration-300 ease-out group-hover/nav:scale-x-100 rounded-full" />
                    </span>
                  </button>
                ))}
              </nav>

              <Button className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300">
                <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#2d3b18] text-lg tracking-[0] leading-[21.6px]">
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
          </div>
        </nav>

        <div className="flex flex-col items-start gap-[40px] px-6 md:px-[150px] pt-[40px] pb-[40px] flex-1 min-h-0">
          <div className="inline-flex flex-col items-start gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="max-w-[852px] font-[number:var(--global-tokens-headings-h-1-font-weight)] text-[length:var(--global-tokens-headings-h-1-font-size)] tracking-[var(--global-tokens-headings-h-1-letter-spacing)] leading-[var(--global-tokens-headings-h-1-line-height)] font-global-tokens-headings-h-1 text-white [font-style:var(--global-tokens-headings-h-1-font-style)]">
              {mainHeading}
            </h1>

            <Button className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300">
              <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#2d3b18] text-lg tracking-[0] leading-[21.6px]">
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

          <Card className="flex items-stretch gap-0 p-8 bg-[#f6fde5] border-0 shadow-none rounded-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <CardContent className="flex flex-col items-start gap-6 p-0">
              {marqueeLogoUrl && (
                <img
                  className="w-[136px] h-6"
                  alt="Company logo"
                  src={marqueeLogoUrl}
                />
              )}

              <blockquote className="max-w-[540px] font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-[#2c3e5d] text-[length:var(--global-tokens-headings-h-5-font-size)] tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] [font-style:var(--global-tokens-headings-h-5-font-style)]">
                &quot;{testimonial.quote || "We came to them with a complex logistics challenge. Not only did they understand it faster than anyone else, they built a solution that's saving us time, money, and emissions—every single day."}&quot;
              </blockquote>
            </CardContent>

            <div className="mx-6 w-px self-stretch border-l border-dashed border-[#a7c463]" />

            <div className="flex flex-col w-[193.09px] items-start gap-8 px-8 py-0">
              {customerImageUrl && (
                <div
                  className="w-[72px] h-[95px] rounded-[200px] bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${customerImageUrl})` }}
                />
              )}

              <div className="self-stretch font-global-tokens-body-b-3 font-[number:var(--global-tokens-body-b-3-font-weight)] text-[#2d3b18] text-[length:var(--global-tokens-body-b-3-font-size)] tracking-[var(--global-tokens-body-b-3-letter-spacing)] leading-[var(--global-tokens-body-b-3-line-height)] [font-style:var(--global-tokens-body-b-3-font-style)]">
                {testimonial.customerName || "mark rowland"}
                <br />
                {testimonial.customerTitle || "director of communications"}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-auto mb-8 shrink-0 w-[80%] mx-auto flex items-stretch py-8 bg-[#12121252] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          {statsData.map((stat, index) => (
            <div key={index} className="flex items-stretch flex-1">
              <div className="flex flex-col items-center justify-center gap-1 flex-1 px-4">
                <div className="font-global-tokens-headings-h-3 font-[number:var(--global-tokens-headings-h-3-font-weight)] text-white text-[56px] tracking-[var(--global-tokens-headings-h-3-letter-spacing)] leading-[1.2] whitespace-nowrap [font-style:var(--global-tokens-headings-h-3-font-style)]">
                  {stat.value}
                </div>
                <div className="font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-white/80 text-[28px] tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[1.4] whitespace-nowrap [font-style:var(--global-tokens-headings-h-5-font-style)]">
                  {stat.label}
                </div>
              </div>
              {index < statsData.length - 1 && (
                <div className="w-px self-stretch bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
