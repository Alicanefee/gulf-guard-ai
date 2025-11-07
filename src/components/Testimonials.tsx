import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Ahmed Al-Maktoum",
    property: "4BR Villa, Palm Jumeirah",
    rating: 5,
    quote: "They found AED 180,000 worth of hidden water damage that would have cost me much more later. The thermal imaging revealed problems invisible to the naked eye.",
    savings: "AED 180,000",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    name: "Sarah Thompson",
    property: "2BR Apartment, Dubai Marina",
    rating: 5,
    quote: "As a first-time buyer, I was nervous. Their detailed report and professional guidance gave me the confidence to negotiate AED 85,000 off the asking price.",
    savings: "AED 85,000",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    name: "Mohammed Al-Rashid",
    property: "Investment Portfolio, Business Bay",
    rating: 5,
    quote: "I've used them for 7 property inspections. Their AI analysis predicted maintenance issues that saved me AED 320,000 across my portfolio.",
    savings: "AED 320,000",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    name: "Julia Schmidt",
    property: "3BR Townhouse, Arabian Ranches",
    rating: 5,
    quote: "The mold testing revealed air quality issues affecting my children's health. They provided immediate solutions and contractor recommendations.",
    savings: "AED 65,000",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  },
  {
    name: "Raj Patel",
    property: "Penthouse, Downtown Dubai",
    rating: 5,
    quote: "Worth every dirham. The 3D scan documented everything. When issues appeared 6 months later, their warranty covered the repairs completely.",
    savings: "AED 125,000",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20" style={{ backgroundColor: '#F0F2F5' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 
            className="font-inter text-3xl md:text-4xl font-bold uppercase mb-6"
            style={{ 
              color: 'hsl(var(--authority-blue))',
              letterSpacing: '1px'
            }}
          >
            What Our Clients Say
          </h2>
          <p className="font-lora text-lg mb-8" style={{ color: 'hsl(var(--text-gray))' }}>
            Real stories from real investors who protected their investments
          </p>
          
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div 
                className="font-inter text-3xl font-bold"
                style={{ color: 'hsl(var(--precision-blue))' }}
              >
                4.8/5
              </div>
              <div className="text-sm" style={{ color: 'hsl(var(--text-gray))' }}>
                Average Rating
              </div>
            </div>
            <div>
              <div 
                className="font-inter text-3xl font-bold"
                style={{ color: 'hsl(var(--precision-blue))' }}
              >
                450+
              </div>
              <div className="text-sm" style={{ color: 'hsl(var(--text-gray))' }}>
                Verified Reviews
              </div>
            </div>
            <div>
              <div 
                className="font-inter text-3xl font-bold"
                style={{ color: 'hsl(var(--precision-blue))' }}
              >
                AED 2.5M+
              </div>
              <div className="text-sm" style={{ color: 'hsl(var(--text-gray))' }}>
                Saved for Clients
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              style={{ 
                backgroundColor: 'white',
                borderRadius: '8px'
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 
                    className="font-inter font-semibold"
                    style={{ color: 'hsl(var(--authority-blue))' }}
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: 'hsl(var(--text-gray))' }}
                  >
                    {testimonial.property}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-current" 
                        style={{ color: 'hsl(var(--premium-gold))' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p 
                className="font-lora text-base italic mb-4"
                style={{ color: 'hsl(var(--text-gray))' }}
              >
                "{testimonial.quote}"
              </p>
              <div 
                className="inline-block px-3 py-1 rounded text-sm font-inter font-semibold"
                style={{ 
                  backgroundColor: 'hsl(var(--premium-gold))',
                  color: 'hsl(var(--authority-blue))'
                }}
              >
                Saved: {testimonial.savings}
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials Carousel - Mobile */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card 
                    className="p-6"
                    style={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 
                          className="font-inter font-semibold"
                          style={{ color: 'hsl(var(--authority-blue))' }}
                        >
                          {testimonial.name}
                        </h4>
                        <p 
                          className="text-sm"
                          style={{ color: 'hsl(var(--text-gray))' }}
                        >
                          {testimonial.property}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-4 h-4 fill-current" 
                              style={{ color: 'hsl(var(--premium-gold))' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p 
                      className="font-lora text-base italic mb-4"
                      style={{ color: 'hsl(var(--text-gray))' }}
                    >
                      "{testimonial.quote}"
                    </p>
                    <div 
                      className="inline-block px-3 py-1 rounded text-sm font-inter font-semibold"
                      style={{ 
                        backgroundColor: 'hsl(var(--premium-gold))',
                        color: 'hsl(var(--authority-blue))'
                      }}
                    >
                      Saved: {testimonial.savings}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
