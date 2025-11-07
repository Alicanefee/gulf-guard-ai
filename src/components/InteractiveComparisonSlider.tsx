import { useState, useRef, useEffect } from "react";
import { RiskSection } from "./RiskSection";
import { DiagnosticsSection } from "./DiagnosticsSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const InteractiveComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ minHeight: '800px' }}
    >
      {/* Right Side - Risk Section (You Found Your Dream Home) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        <RiskSection />
      </div>

      {/* Left Side - Diagnostics Section */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <DiagnosticsSection />
      </div>

      {/* Draggable Divider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 cursor-ew-resize"
        style={{
          left: `${sliderPosition}%`,
          width: '4px',
          transform: 'translateX(-50%)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Line */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: 'hsl(var(--precision-blue))',
            boxShadow: '0 0 20px rgba(0, 174, 239, 0.5)'
          }}
        />
        
        {/* Draggable Handle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: 'hsl(var(--clinical-white))',
            border: '3px solid hsl(var(--precision-blue))',
            boxShadow: '0 4px 20px rgba(0, 174, 239, 0.3)',
          }}
        >
          <div className="flex items-center gap-1">
            <ChevronLeft className="w-5 h-5" style={{ color: 'hsl(var(--precision-blue))' }} />
            <ChevronRight className="w-5 h-5" style={{ color: 'hsl(var(--precision-blue))' }} />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-8 left-8 z-30 pointer-events-none">
        <div 
          className="font-inter text-sm font-semibold px-4 py-2 rounded"
          style={{
            backgroundColor: 'hsl(var(--authority-blue))',
            color: 'hsl(var(--clinical-white))',
            opacity: sliderPosition < 50 ? 1 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        >
          Building Diagnostics
        </div>
      </div>
      
      <div className="absolute top-8 right-8 z-30 pointer-events-none">
        <div 
          className="font-inter text-sm font-semibold px-4 py-2 rounded"
          style={{
            backgroundColor: 'hsl(var(--precision-blue))',
            color: 'hsl(var(--clinical-white))',
            opacity: sliderPosition > 50 ? 1 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        >
          Protect Your Investment
        </div>
      </div>
    </section>
  );
};
