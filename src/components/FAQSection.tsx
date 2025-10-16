import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQSection = () => {
  const faqs = [
    {
      question: "How long does a typical inspection take?",
      answer: "Standard villa inspections take 2-3 hours, apartments 1.5-2 hours. Complex properties or larger villas may require 3-4 hours. We never rush - thoroughness is our priority.",
    },
    {
      question: "What standards do you follow?",
      answer: "We comply with ISO/IEC 17025:2017 for testing laboratories, InterNACHI standards, and Dubai Municipality building codes. All equipment is calibrated annually.",
    },
    {
      question: "Do I need to be present during inspection?",
      answer: "Not required, but recommended. Being present allows you to ask questions and understand issues firsthand. We provide photo/video documentation regardless.",
    },
    {
      question: "What if serious issues are found?",
      answer: "We document everything with photos, thermal images, and measurements. Your report includes severity ratings, repair cost estimates, and negotiation guidance.",
    },
    {
      question: "Can you inspect during handover?",
      answer: "Yes! Pre-handover inspections are ideal. We identify developer defects before you sign, giving you leverage for corrections or compensation.",
    },
    {
      question: "Do you test for mold in Dubai's humidity?",
      answer: "Absolutely. We use moisture meters, thermal imaging, and air quality testing (including mold spore counts). Dubai's humidity makes this critical.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfer, credit cards, and cash. Payment is due on inspection day, before the report is released.",
    },
    {
      question: "Can I use the report for legal purposes?",
      answer: "Yes. Our reports meet Dubai Court standards and have been used in numerous property disputes and insurance claims.",
    },
    {
      question: "Do you offer re-inspections after repairs?",
      answer: "Yes, at 50% of the original package price. We verify repairs meet standards and provide updated documentation.",
    },
    {
      question: "What areas of Dubai do you cover?",
      answer: "All of Dubai, including Palm Jumeirah, Dubai Marina, Downtown, Arabian Ranches, and surrounding Emirates by arrangement.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked
              <span className="block text-accent">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common queries about our inspection service
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 hover:border-accent/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <div className="bg-secondary/50 p-8 rounded-lg border-2 border-dashed border-border">
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our AI assistant and support team are available 24/7
              </p>
              <Button variant="premium" size="lg">
                Chat with us now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
