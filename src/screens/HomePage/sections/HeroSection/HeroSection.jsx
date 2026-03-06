import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

const navigationItems = [{ label: "Home" }, { label: "About" }];

const sliderImages = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80",
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&q=80",
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80",
  "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1920&q=80",
];

const statsData = [ 
  {
    value: "100+",
    label: "Over All Project",
  },
  {
    value: "30+",
    label: "Commercial & Residential",
  },
  {
    value: "12+",
    label: "Years of Experience",
  },
  {
    value: "100%",
    label: "Customer  Satisfaction",
  },
];

export const HeroSection = () => {
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
              src={src}
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
              <div className="relative w-16 h-16 bg-[url(https://c.animaapp.com/mm91avyrvgFAYy/img/image-1.png)] bg-[100%_100%]">
                <img
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-16 h-16"
                  alt="Logo"
                  src="https://c.animaapp.com/mm91avyrvgFAYy/img/image-2-1.png"
                />
              </div>

              <img
                className="w-[155px] h-7"
                alt="Brand name"
                src="https://c.animaapp.com/mm91avyrvgFAYy/img/image-2.png"
              />
            </div>

            <div className="inline-flex items-center gap-[107px]">
              <nav className="inline-flex items-center gap-[29px]">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-center w-[84px] font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-5-font-size)] text-center tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] [font-style:var(--global-tokens-headings-h-5-font-style)] transition-colors hover:text-[#0f1d33]"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <Button className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300">
                <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#172b4d] text-lg tracking-[0] leading-[21.6px]">
                  <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                    Contact Us
                  </div>
                  <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                    Contact Us
                  </div>
                </span>
                <img
                  className="w-3.5 h-3.5 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-45"
                  alt="Icon"
                  src="https://c.animaapp.com/mm91avyrvgFAYy/img/icon.svg"
                />
              </Button>
            </div>
          </div>
        </nav>

        <div className="flex flex-col items-start gap-[40px] px-6 md:px-[150px] pt-[40px] pb-[40px] flex-1 min-h-0">
          <div className="inline-flex flex-col items-start gap-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="max-w-[852px] font-[number:var(--global-tokens-headings-h-1-font-weight)] text-[length:var(--global-tokens-headings-h-1-font-size)] tracking-[var(--global-tokens-headings-h-1-letter-spacing)] leading-[var(--global-tokens-headings-h-1-line-height)] font-global-tokens-headings-h-1 text-white [font-style:var(--global-tokens-headings-h-1-font-style)]">
              Reliable Planting Execution
            </h1>

            <Button className="group inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300">
              <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#172b4d] text-lg tracking-[0] leading-[21.6px]">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                  Contact Us
                </div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  Contact Us
                </div>
              </span>
              <img
                className="w-3.5 h-3.5 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-45"
                alt="Icon"
                src="https://c.animaapp.com/mm91avyrvgFAYy/img/icon.svg"
              />
            </Button>
          </div>

          <Card className="flex items-stretch gap-0 p-8 bg-[#f6fde5] border-0 shadow-none rounded-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <CardContent className="flex flex-col items-start gap-6 p-0">
              <img
                className="w-[136px] h-6"
                alt="Company logo"
                src="https://c.animaapp.com/mm91avyrvgFAYy/img/68353460ec4b1d80f6269120-marquee-logo-05-svg.svg"
              />

              <blockquote className="max-w-[540px] font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-[#2c3e5d] text-[length:var(--global-tokens-headings-h-5-font-size)] tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] [font-style:var(--global-tokens-headings-h-5-font-style)]">
                &quot;We came to them with a complex logistics
                <br />
                challenge. Not only did they understand it faster
                <br />
                than anyone else, they built a solution that&apos;s
                <br />
                saving us time, money, and emissions—every
                <br />
                single day.&quot;
              </blockquote>
            </CardContent>

            <div className="mx-6 w-px self-stretch border-l border-dashed border-[#a7c463]" />

            <div className="flex flex-col w-[193.09px] items-start gap-8 px-8 py-0">
              <div className="w-[72px] h-[95px] rounded-[200px] bg-[url(https://c.animaapp.com/mm91avyrvgFAYy/img/682fc478e24a522dd72e41e2-customer-03-webp.png)] bg-cover bg-[50%_50%]" />

              <div className="self-stretch font-global-tokens-body-b-3 font-[number:var(--global-tokens-body-b-3-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-body-b-3-font-size)] tracking-[var(--global-tokens-body-b-3-letter-spacing)] leading-[var(--global-tokens-body-b-3-line-height)] [font-style:var(--global-tokens-body-b-3-font-style)]">
                mark rowland
                <br />
                director of communications
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
