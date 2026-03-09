import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Badge } from "../../../../components/ui/badge";
import { useContent } from "../../../../context/ContentContext";

const DEFAULT_FEATURES = [
  { title: "Site-First Decisions", description: "We adapt to the reality of the terrain.", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80" },
  { title: "Practical Plant Judgement", description: "Selecting species that actually survive.", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80" },
  { title: "Clean Coordination", description: "Seamless integration with other vendors.", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80" },
  { title: "Defined Responsibility", description: "No gray areas in ownership.", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80" },
];

export const ProjectAndInquirySection = () => {
  const { content, getImageUrl } = useContent();
  const project = content?.project || {};
  const badgeText = project.badgeText || "Who We Work With";
  const heading = project.heading || "Work with Havier to tackle your toughest.";
  const subheading = project.subheading || "No over-promising. We deliver exactly what's needed for commercial viability and aesthetic endurance.";
  const features = (project.features || []).map((f) => ({
    ...f,
    image: getImageUrl(f.image) || f.image,
  }));
  const [activeIndex, setActiveIndex] = useState(0);
  const featureRefs = useRef([]);
  const imageRef = useRef(null);
  const prevIndex = useRef(0);

  useEffect(() => {
    const observers = [];

    featureRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (prevIndex.current === activeIndex) return;
    const img = imageRef.current;
    if (!img) return;

    gsap.fromTo(
      img,
      { opacity: 0, scale: 1.1, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    prevIndex.current = activeIndex;
  }, [activeIndex]);

  return (
    <section className="flex flex-col w-full items-center justify-center px-6 md:px-[150px] py-[120px] bg-white overflow-x-clip">
      <header className="flex flex-col items-center gap-6 mb-[120px] translate-y-[-1rem] animate-fade-in opacity-0">
        <Badge
          variant="outline"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[300px] border-[#44546f] h-auto"
        >
          <span className="[font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#44546f] text-lg tracking-[0] leading-[18px]">
            {badgeText}
          </span>
        </Badge>

        <h2 className="font-global-tokens-headings-h-2 font-[number:var(--global-tokens-headings-h-2-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-2-font-size)] text-center tracking-[var(--global-tokens-headings-h-2-letter-spacing)] leading-[var(--global-tokens-headings-h-2-line-height)] [font-style:var(--global-tokens-headings-h-2-font-style)]">
          {heading}
        </h2>

        <p className="max-w-3xl font-global-tokens-body-b-1 font-[number:var(--global-tokens-body-b-1-font-weight)] text-[#758195] text-[length:var(--global-tokens-body-b-1-font-size)] text-center tracking-[var(--global-tokens-body-b-1-letter-spacing)] leading-[var(--global-tokens-body-b-1-line-height)] [font-style:var(--global-tokens-body-b-1-font-style)]">
          {subheading}
        </p>
      </header>

      <div className="w-full mb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[120px] items-start">
          <div className="flex flex-col gap-[350px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            {features.map((feature, index) => (
              <article
                key={index}
                ref={(el) => (featureRefs.current[index] = el)}
                className={`flex flex-col gap-5 transition-opacity duration-500 ${activeIndex === index ? "opacity-100" : "opacity-30"}`}
              >
                <div className="flex flex-col gap-[54px]">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-global-tokens-headings-h-3 font-[number:var(--global-tokens-headings-h-3-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-3-font-size)] tracking-[var(--global-tokens-headings-h-3-letter-spacing)] leading-[var(--global-tokens-headings-h-3-line-height)] [font-style:var(--global-tokens-headings-h-3-font-style)]">
                      {feature.title}
                    </h3>
                    <p className="font-global-tokens-body-b-1 font-[number:var(--global-tokens-body-b-1-font-weight)] text-[#758195] text-[length:var(--global-tokens-body-b-1-font-size)] tracking-[var(--global-tokens-body-b-1-letter-spacing)] leading-[var(--global-tokens-body-b-1-line-height)] [font-style:var(--global-tokens-body-b-1-font-style)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="lg:sticky lg:top-[120px] self-start translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div className="w-full aspect-[782/640] rounded-md overflow-hidden">
              {features[activeIndex] && (
              <img
                ref={imageRef}
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="w-full h-full object-cover"
              />
              )}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
