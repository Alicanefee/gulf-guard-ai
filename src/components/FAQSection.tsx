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
      question: "Why is property inspection important in Dubai?",
      answer: "Dubai's extreme climate and rapid construction create hidden defects in many properties. Professional inspection reveals structural, electrical, and plumbing issues, helping you avoid unexpected repair costs and make informed purchase decisions.",
    },
    {
      question: "What are the most common property issues in Dubai?",
      answer: "The most frequent problems include HVAC failures, water leaks and damage, mold and humidity, electrical-mechanical faults, insulation and noise issues, plus complications with bills and maintenance fees.",
    },
    {
      question: "How long does an inspection take and when do you get the report?",
      answer: "A typical inspection takes 2-4 hours using advanced equipment. Detailed reports with photos and video documentation are delivered within 24-48 hours.",
    },
    {
      question: "What makes Gulf Guard AI's inspection service different?",
      answer: "We combine AI-powered risk assessment with certified inspector expertise, offering 3D scanning, air quality testing, and comprehensive reporting. Our service includes post-inspection support and is specifically designed for Dubai's unique property market.",
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

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              View More Questions
            </Button>
          </div>

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
