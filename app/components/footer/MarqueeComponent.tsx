// Add this to your imports
import { useEffect, useState } from 'react';

// Add this component inside your Footer component, before the return statement
const MarqueeComponent = () => {
  const [Marquee, setMarquee] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only import on client side
    import('react-fast-marquee').then((MarqueeModule) => {
      setMarquee(() => MarqueeModule.default);
      setIsClient(true);
    });
  }, []);

  if (!isClient || !Marquee) {
    // Fallback for SSR - show static content
    return (
      <div className="py-2">
        <span className="text-3xl md:text-5xl mx-4">
          MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱ MOLLY FASHION CIRCLE ✱
        </span>
      </div>
    );
  }

  return (
    <Marquee speed={50} gradient={false} pauseOnHover={true} className="py-2">
      <span className="text-3xl md:text-5xl mx-8">MOLLY FASHION CIRCLE ✱</span>
      <span className="text-3xl md:text-5xl mx-8">MOLLY FASHION CIRCLE ✱</span>
      <span className="text-3xl md:text-5xl mx-8">MOLLY FASHION CIRCLE ✱</span>
      <span className="text-3xl md:text-5xl mx-8">MOLLY FASHION CIRCLE ✱</span>
      <span className="text-3xl md:text-5xl mx-8">MOLLY FASHION CIRCLE ✱</span>
    </Marquee>
  );
};

// Then replace your marquee section with:
{
  /* Marquee */
}
<div className="w-full text-white py-6 border-t border-t-white border-b border-b-white">
  <MarqueeComponent />
</div>;
