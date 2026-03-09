import { Badge } from "../../../../components/ui/badge";
import { useContent } from "../../../../context/ContentContext";

export const FeaturesSection = () => {
  const { content, getImageUrl } = useContent();

  const features = content?.features || {};
  const badgeText = features.badgeText || "Trusted Partners";
  const heading =
    features.heading || "Work with Havier to tackle your toughest.";

  const partnerLogos = (features.partnerLogos || []).map((p) => ({
    ...p,
    src: getImageUrl(p.src) || p.src,
  }));

  return (
    <section className="flex flex-col w-full items-center justify-center gap-16 py-[60px] bg-[#f6fde5]">

      <div className="flex flex-col items-center gap-6 px-4 md:px-[150px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        
        <Badge
          variant="outline"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[300px] border-[#172b4d] bg-transparent hover:bg-transparent"
        >
          <span className="font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-5-font-size)] tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] [font-style:var(--global-tokens-headings-h-5-font-style)]">
            {badgeText}
          </span>
        </Badge>

        <h2 className="font-global-tokens-headings-h-2 font-[number:var(--global-tokens-headings-h-2-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-2-font-size)] text-center tracking-[var(--global-tokens-headings-h-2-letter-spacing)] leading-[var(--global-tokens-headings-h-2-line-height)] [font-style:var(--global-tokens-headings-h-2-font-style)]">
          {heading}
        </h2>

      </div>

      <div className="group/marquee w-full overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] pb-8">

        <div className="flex w-max animate-marquee-infinite group-hover/marquee:[animation-play-state:paused] items-center pt-4">

          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, i) => (
            <div
              key={i}
              className="group/logo flex flex-col items-center gap-3 shrink-0 w-fit mr-16 transition-transform duration-300 hover:scale-125"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 max-w-[160px] object-contain"
                loading="lazy"
              />

              <span className="text-[13px] font-bold tracking-wide uppercase whitespace-nowrap text-[#4a7c10] opacity-0 translate-y-3 scale-90 group-hover/logo:opacity-100 group-hover/logo:translate-y-0 group-hover/logo:scale-100 transition-all duration-500 ease-out">
                {logo.name}
              </span>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
};