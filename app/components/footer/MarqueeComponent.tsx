export default function InfiniteMarquee() {
  return (
    <div className="w-full flex items-center overflow-hidden">
      <div className="w-full overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          <span className="inline-block text-3xl md:text-5xl text-white tracking-wider">
            MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
            MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
            MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
          </span>
          <span className="inline-block text-3xl md:text-5xl text-white tracking-wider">
            MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
            MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
            MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
