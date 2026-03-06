export const ScrollProgress = ({ fillRef }) => {
  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={fillRef} className="scroll-progress__fill" />
    </div>
  );
};
