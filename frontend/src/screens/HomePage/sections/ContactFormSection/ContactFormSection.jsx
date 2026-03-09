import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { PlayIcon, PauseIcon, CheckCircleIcon, AlertCircleIcon, LoaderIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useContent } from "../../../../context/ContentContext";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

const defaultFormFields = [
  { placeholder: "Your Name", type: "text", name: "from_name" },
  { placeholder: "Email Address", type: "email", name: "reply_to" },
  { placeholder: "Company Name", type: "text", name: "company_name" },
];

export const ContactFormSection = () => {
  const { content, getImageUrl } = useContent();
  const iconUrl = getImageUrl(content?.hero?.iconUrl);
  const videoRef = useRef(null);
  const formRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sendStatus, setSendStatus] = useState("idle");
  const [sendError, setSendError] = useState(null);
  const formFields = content?.contact?.formFields?.length ? content.contact.formFields : defaultFormFields;
  const contactHeading = content?.contact?.heading || "Speak With Our Team";
  const contactDescription = content?.contact?.description || "Tell us about your project, enquiry, or capability requirements. A member of our team will respond promptly.";
  const SAMPLE_VIDEO_URL = "";
  const rawVideoUrl = content?.contact?.videoUrl || "";
  const videoSrc =
    rawVideoUrl.startsWith("http")
      ? rawVideoUrl
      : rawVideoUrl
        ? getImageUrl(rawVideoUrl) || rawVideoUrl
        : SAMPLE_VIDEO_URL;

  const handleVideoError = () => {
    if (videoRef.current && videoRef.current.src !== SAMPLE_VIDEO_URL) {
      videoRef.current.src = SAMPLE_VIDEO_URL;
      videoRef.current.load();
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sendStatus === "sending") return;
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSendStatus("error");
      setSendError("Contact form is not configured. Add EmailJS keys to .env.");
      setTimeout(() => {
        setSendStatus("idle");
        setSendError(null);
      }, 5000);
      return;
    }

    setSendStatus("sending");
    setSendError(null);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setSendStatus("success");
      formRef.current.reset();
      setTimeout(() => setSendStatus("idle"), 4000);
    } catch {
      setSendStatus("error");
      setSendError(null);
      setTimeout(() => setSendStatus("idle"), 4000);
    }
  };

  return (
    <section className="w-full px-6 md:px-[150px] py-[120px] bg-white">
      <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[120px] items-center">
          <div className="flex flex-col gap-[62px]">
            <header className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-global-tokens-headings-h-2 font-[number:var(--global-tokens-headings-h-2-font-weight)] text-[#172b4d] text-[length:var(--global-tokens-headings-h-2-font-size)] tracking-[var(--global-tokens-headings-h-2-letter-spacing)] leading-[var(--global-tokens-headings-h-2-line-height)] [font-style:var(--global-tokens-headings-h-2-font-style)]">
                  {contactHeading}
                </h2>
                <p className="font-global-tokens-body-b-1 font-[number:var(--global-tokens-body-b-1-font-weight)] text-[#758195] text-[length:var(--global-tokens-body-b-1-font-size)] tracking-[var(--global-tokens-body-b-1-letter-spacing)] leading-[var(--global-tokens-body-b-1-line-height)] [font-style:var(--global-tokens-body-b-1-font-style)]">
                  {contactDescription}
                </p>
              </div>
            </header>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input type="hidden" name="to_name" value="Plantorium" />
              {formFields.map((field, index) => (
                <Input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  className="h-[60px] rounded-md border-[#dcdfe4] font-global-tokens-body-b-2 font-[number:var(--global-tokens-body-b-2-font-weight)] text-[#758195] text-[length:var(--global-tokens-body-b-2-font-size)] tracking-[var(--global-tokens-body-b-2-letter-spacing)] leading-[var(--global-tokens-body-b-2-line-height)] [font-style:var(--global-tokens-body-b-2-font-style)]"
                />
              ))}

              <Textarea
                name="message"
                placeholder="Your Message"
                required
                className="h-[200px] rounded-md border-[#dcdfe4] font-global-tokens-body-b-2 font-[number:var(--global-tokens-body-b-2-font-weight)] text-[#758195] text-[length:var(--global-tokens-body-b-2-font-size)] tracking-[var(--global-tokens-body-b-2-letter-spacing)] leading-[var(--global-tokens-body-b-2-line-height)] [font-style:var(--global-tokens-body-b-2-font-style)] resize-none"
              />

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={sendStatus === "sending"}
                  className="group/btn inline-flex items-center gap-[18px] px-[25px] py-[19px] h-auto bg-[#d1f57c] rounded-[300px] hover:bg-[#c5e970] transition-all duration-300 w-fit disabled:opacity-70"
                >
                  <span className="relative inline-flex overflow-hidden [font-family:'Bricolage_Grotesque',Helvetica] font-semibold text-[#172b4d] text-lg tracking-[0] leading-[21.6px]">
                    {sendStatus === "sending" ? (
                      <div className="flex items-center gap-2">
                        <LoaderIcon className="w-4 h-4 animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover/btn:translate-y-[-160%] group-hover/btn:skew-y-12">
                          Submit
                        </div>
                        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover/btn:translate-y-0 group-hover/btn:skew-y-0">
                          Submit
                        </div>
                      </>
                    )}
                  </span>
                  {sendStatus !== "sending" && iconUrl && (
                    <img
                      className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:scale-150 group-hover/btn:rotate-45"
                      alt="Icon"
                      src={iconUrl}
                    />
                  )}
                </Button>

                {sendStatus === "success" && (
                  <span className="flex items-center gap-2 text-green-600 [font-family:'Funnel_Sans',Helvetica] text-sm font-medium animate-fade-in">
                    <CheckCircleIcon className="w-4 h-4" />
                    Message sent successfully!
                  </span>
                )}
                {sendStatus === "error" && (
                  <span className="flex items-center gap-2 text-red-500 [font-family:'Funnel_Sans',Helvetica] text-sm font-medium animate-fade-in">
                    <AlertCircleIcon className="w-4 h-4" />
                    {sendError || "Failed to send. Please try again."}
                  </span>
                )}
              </div>
            </form>
          </div>

          <div className="w-full aspect-square rounded-md overflow-hidden relative group mx-auto">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              onError={handleVideoError}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={togglePlay}
              className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[190px] h-[42px] bg-[#ffffff3d] hover:bg-[#ffffff4d] rounded-[200px] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] transition-all opacity-0 group-hover:opacity-100"
            >
              {isPlaying ? (
                <PauseIcon className="w-[13px] h-[18px] text-white fill-white mr-2" />
              ) : (
                <PlayIcon className="w-[13px] h-[18px] text-white fill-white mr-2" />
              )}
              <span className="[font-family:'Geist_Mono',Helvetica] font-medium text-white text-[13px] tracking-[0] leading-[18.2px]">
                {isPlaying ? "PAUSE" : "PLAY"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
