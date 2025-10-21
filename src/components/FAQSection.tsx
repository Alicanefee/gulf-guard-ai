import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQSection = () => {
  const [showAll, setShowAll] = useState(false);

  const allFaqs = [
    {
      question: "Can foreigners buy property in Dubai?",
      answer: "Yes, foreigners can buy full ownership property in many areas of Dubai, including villas, apartments, and offices.",
    },
    {
      question: "Why is property inspection important in Dubai?",
      answer: "Dubai's extreme climate and rapid construction create hidden defects in many properties. Professional inspection reveals structural, electrical, and plumbing issues, helping you avoid unexpected repair costs and make informed purchase decisions.",
    },
    {
      question: "What are the most common property issues in Dubai?",
      answer: "The most frequent problems include HVAC failures, water leaks and damage, mold and humidity, electrical-mechanical faults, insulation and noise issues, plus complications with bills and maintenance fees.",
    },
    {
      question: "What defects can property inspection reveal?",
      answer: "Inspections can detect plumbing issues, structural cracks, moisture and humidity problems, window/door leaks, electrical-mechanical faults, construction quality deficiencies, and other hidden technical problems.",
    },
    {
      question: "What benefits does property inspection provide for investors?",
      answer: "It helps prevent unexpected repair costs, determine true property value, gain negotiation leverage, and ensure long-term investment security.",
    },
    {
      question: "How long does an inspection take and when do you get the report?",
      answer: "A typical inspection takes 2-4 hours using advanced equipment. Detailed reports with photos and video documentation are delivered within 24-48 hours.",
    },
    {
      question: "What are the total costs when buying property in Dubai?",
      answer: "Property purchases include transfer fees, registration costs, agency commissions, annual maintenance fees, and community maintenance expenses.",
    },
    {
      question: "What makes Gulf Guard AI's inspection service different?",
      answer: "We combine AI-powered risk assessment with certified inspector expertise, offering 3D scanning, air quality testing, and comprehensive reporting. Our service includes post-inspection support and is specifically designed for Dubai's unique property market.",
    },
  ];

  const faqs = showAll ? allFaqs : allFaqs.slice(0, 4);

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

          {!showAll && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(true)}
                className="group"
              >
                View More Questions
                <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
            </div>
          )}

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
