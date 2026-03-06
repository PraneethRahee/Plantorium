import { Badge } from "../../../../components/ui/badge";

const partnerLogos = [
  { name: "Notion", src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Google", src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png" },
  { name: "Slack", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  { name: "Spotify", src: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png" },
  { name: "Stripe", src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Figma", src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "GitHub", src: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" },
];

export const FeaturesSection = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center gap-16 py-[60px] bg-[#f6fde5]">
      <div className="flex flex-col items-center gap-6 px-4 md:px-[150px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <Badge
          variant="outline"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[300px] border-[#172b4d] bg-transparent hover:bg-transparent"
        >
          <span className="font-global-tokens-headings-h-5 font-[number:var(--global-tokens-headings-h-5-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-5-font-size)] tracking-[var(--global-tokens-headings-h-5-letter-spacing)] leading-[var(--global-tokens-headings-h-5-line-height)] [font-style:var(--global-tokens-headings-h-5-font-style)]">
            Trusted Partners
          </span>
        </Badge>

        <h2 className="font-global-tokens-headings-h-2 font-[number:var(--global-tokens-headings-h-2-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-2-font-size)] text-center tracking-[var(--global-tokens-headings-h-2-letter-spacing)] leading-[var(--global-tokens-headings-h-2-line-height)] [font-style:var(--global-tokens-headings-h-2-font-style)]">
          Work with Havier to tackle your toughest.
        </h2>
      </div>

      <div className="group/marquee w-full overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] [--gap:4rem] [--duration:30s] pb-8">
        <div className="flex w-max group-hover/marquee:[animation-play-state:paused] items-start pt-4">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex gap-[var(--gap)] animate-marquee shrink-0 pr-[var(--gap)]"
            >
              {partnerLogos.map((logo, i) => (
                <div
                  key={i}
                  className="group/logo flex flex-col items-center gap-3 px-8 shrink-0 transition-transform duration-300 hover:scale-125"
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
          ))}
        </div>
      </div>
    </section>
  );
};
