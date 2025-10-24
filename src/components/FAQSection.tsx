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
      answer: "Yes, foreigners can buy property in many areas of Dubai with full ownership rights, including villas, apartments, and offices.",
    },
    {
      question: "Why is property inspection necessary when buying a home in Dubai?",
      answer: "Due to Dubai's extreme climate and construction processes, many properties have hidden defects. Professional inspection identifies all structural, electrical, and plumbing issues before purchase, preventing unexpected expenses and risks.",
    },
    {
      question: "What are the most common property problems encountered in Dubai homes?",
      answer: "The most frequent issues include air conditioning failures, water leaks and flooding, moisture and mold growth, electrical-mechanical malfunctions, pest problems, insulation and noise issues, and billing and maintenance fee complications.",
    },
    {
      question: "What faults can property inspection reveal?",
      answer: "Inspections can identify plumbing problems, foundation cracks, moisture and humidity issues, window/door air leaks, mechanical-electrical faults, construction quality deficiencies, and other hidden technical problems.",
    },
    {
      question: "What does property inspection provide for investors?",
      answer: "It prevents unexpected high repair costs, helps determine true property value, provides negotiation leverage, and ensures long-term investment safety.",
    },
    {
      question: "Does the inspection damage the property and when is the report provided?",
      answer: "Modern equipment ensures no damage to the property during inspection. Detailed reports with images are typically provided within 1-2 days.",
    },
    {
      question: "What are the total costs involved when buying property in Dubai?",
      answer: "Property purchases include transfer fees, registration costs, agent commissions, annual maintenance fees, and community maintenance expenses.",
    },
    {
      question: "What are the main risks that can harm investments?",
      answer: "High maintenance and repair costs, design and construction faults, slow resolution of structural problems, value loss during market fluctuations, and low occupancy rates are important risks for investors.",
    },
    {
      question: "What happens if issues are found after inspection?",
      answer: "Depending on the problem, options include price reduction, repair requests, cost sharing, or purchase cancellation. Buyers can add inspection conditions to contracts.",
    },
    {
      question: "What are the most appropriate precautions for investors in Dubai?",
      answer: "Having professional inspections, choosing reliable contractors/companies, carefully reviewing maintenance and fee contracts, and conducting business through official institutions are the most important steps for investors.",
    },
    {
      question: "What is a home inspection?",
      answer: "A home inspection is a comprehensive examination of a property's structural components and accessible systems to identify existing or potential defects. It helps buyers understand property condition before purchase, covering structural elements, electrical systems, plumbing, HVAC, roof condition, and more.",
    },
    {
      question: "How long does a property inspection take?",
      answer: "A typical inspection takes 2-4 hours depending on property size. Apartments usually take 1.5-4 hours, while villas require more time due to pools, gardens, and external structures. Reports are provided within 2-3 days after the inspection.",
    },
    {
      question: "What does a property inspector examine?",
      answer: "Inspectors examine structural integrity, electrical systems, plumbing, HVAC systems, doors and windows, roof and gutters, paint quality, kitchen/bathroom fixtures, fire safety systems, and MEP installations.",
    },
    {
      question: "Do new properties in Dubai need inspection?",
      answer: "Yes, absolutely. Even new properties require snagging inspections before handover. Construction defects, incomplete work, and finishing issues are common in new properties. Professional inspections during the defects liability period ensure developers fix issues at no cost.",
    },
    {
      question: "When should property inspection be scheduled?",
      answer: "Schedule inspections before developer handover, before purchasing resale properties, after renovations, during the Defects Liability Period, and before warranty expiration to identify covered issues.",
    },
    {
      question: "What are the most common defects in Dubai properties?",
      answer: "Common issues include paint imperfections, plumbing problems, electrical faults, door/window misalignment, HVAC malfunctions, flooring problems, structural cracks, moisture damage, carpentry defects, and safety compliance issues.",
    },
    {
      question: "Why is indoor air quality a concern in Dubai?",
      answer: "Dubai's unique climate and urban environment create specific indoor air quality challenges: Frequent dust storms carry fine particles indoors, Constant air conditioning use can spread pollutants if not maintained, Low humidity (often below 20%) keeps dust airborne longer, Construction activities release dust and particulate matter, Poor ventilation in sealed buildings traps pollutants, Chemical emissions from building materials and furnishings (VOCs), and High outdoor temperatures keep people indoors 90% of the time, increasing exposure to indoor pollutants.",
    },
    {
      question: "What are the main indoor air pollutants in Dubai homes?",
      answer: "Common indoor pollutants include: Particulate Matter (PM2.5 and PM10) from dust storms and outdoor pollution, Volatile Organic Compounds (VOCs) from paints, cleaning products, and furnishings, Mold and mildew in poorly ventilated areas, especially bathrooms, Dust mites and allergens in carpets and bedding, Bacteria and pollutants from dirty AC ducts and filters, Chemical emissions from building materials, Tobacco smoke, and Carbon monoxide from gas appliances. Studies show TVOC levels in Dubai apartments can be 9 times higher than recommended standards.",
    },
    {
      question: "How does poor air quality affect health?",
      answer: "Poor indoor air quality in Dubai is linked to: Respiratory problems (asthma, bronchitis, allergic rhinitis, COPD), Cardiovascular issues (increased risk of heart disease and stroke), Allergies and irritation (itchy eyes, runny nose, throat irritation), Chronic inflammation and reduced lung function, Increased hospital visits for respiratory distress, especially in children, Exacerbation of pre-existing conditions, Fatigue and reduced quality of life, and Long-term exposure increases risk of chronic diseases. Dubai Health Authority reports show a surge in asthma cases linked to poor indoor air quality.",
    },
    {
      question: "What can I do to improve indoor air quality in my Dubai home?",
      answer: "Recommended strategies include: Regular AC maintenance (clean ducts, replace filters every 1–3 months, inspect coils), Use HEPA air purifiers to reduce airborne particles, Ensure proper ventilation when weather permits, Use dehumidifiers to prevent mold growth, Choose eco-friendly cleaning products to reduce VOCs, Regular deep cleaning to remove dust and allergens, Install and maintain smoke detectors and air quality monitors, Keep indoor humidity between 30–50%, Avoid indoor smoking, and Professional air quality testing to identify specific pollutants.",
    },
    {
      question: "Should I test my property for air quality before buying?",
      answer: "Yes, air quality testing is increasingly important in Dubai, especially for: Newly constructed apartments (which often have elevated VOC levels), Properties with visible mold or moisture issues, Homes with persistent musty odors, Properties near construction sites or high-traffic areas, If family members have allergies or respiratory conditions, and Before moving in with young children or elderly family members. Professional air quality testing measures PM2.5, PM10, VOCs, formaldehyde, carbon monoxide, humidity levels, and identifies mold and bacterial contamination.",
    },
    {
      question: "Is there a proven link between air pollution and chronic respiratory diseases?",
      answer: "Yes, extensive scientific research demonstrates a clear link between air pollution exposure and chronic respiratory diseases. Studies show: Long-term exposure to PM2.5 increases risk of COPD, asthma, and chronic bronchitis by 30–50%, Each 10 μg/m³ increase in PM2.5 is associated with significant decline in lung function (FEV1 and FVC), Air pollution is responsible for approximately 50% of COPD cases globally, Exposure to PM10, NO2, and SO2 significantly increases asthma exacerbations and hospitalizations, Children exposed to traffic-related air pollution have higher rates of asthma development, and Indoor biological contaminants (mold, dust mites, endotoxins) significantly increase allergic disease risk.",
    },
    {
      question: "How does air pollution affect cardiovascular health?",
      answer: "Scientific evidence shows strong associations between air pollution and cardiovascular disease: Each 10 μg/m³ increase in PM2.5 increases cardiovascular death risk by 0.68–1.5%, Long-term PM2.5 exposure increases risk of ischemic heart disease, heart failure, and arrhythmias by 8–18%, Fine particles enter the bloodstream causing inflammation, atherosclerosis, and blood clot formation, Acute exposure to PM2.5 results in 69% higher cardiovascular deaths compared to respiratory deaths, Air pollution contributes to hypertension, type 2 diabetes, and stroke, Reducing air pollution decreases immediate risk of acute coronary syndromes and heart failure, and Ambient air pollution is a leading contributor to premature mortality globally.",
    },
    {
      question: "What are the mechanisms linking air pollution to chronic diseases?",
      answer: "Air pollution causes chronic disease through multiple biological pathways: Oxidative Stress: Pollutants generate reactive oxygen species (ROS) that damage cells and DNA, Chronic Inflammation: PM2.5 triggers inflammatory responses, activating immune cells and inflammatory cytokines (IL-6, IL-8, TNF-α), Endothelial Dysfunction: Particles damage blood vessel linings, contributing to atherosclerosis, Autonomic Imbalance: Pollution affects heart rate variability and blood pressure regulation, Airway Remodeling: Chronic inflammation leads to structural changes in airways, reducing lung capacity, Metabolic Disruption: Pollutants interfere with insulin signaling and glucose metabolism, Gene Expression Changes: Air pollution can alter gene expression and epigenetic markers, and Impaired Immune Function: Weakens pulmonary defenses making lungs more susceptible to infections.",
    },
    {
      question: "Are certain populations more vulnerable to air pollution effects?",
      answer: "Yes, research identifies several high-risk groups: Children (developing respiratory systems are more susceptible to long-term damage), Elderly (aged 65+) with weakened immune systems and pre-existing conditions, Pregnant women (pollution affects fetal development and birth outcomes), People with pre-existing respiratory conditions (asthma, COPD, chronic bronchitis), Individuals with cardiovascular disease (higher risk of acute events), Those with high genetic risk factors, Outdoor workers with sustained exposure, People living near high-traffic areas or industrial zones, Low-income populations with limited access to clean environments, and Smokers and former smokers (compounded respiratory vulnerability).",
    },
    {
      question: "Can improving air quality reduce chronic disease risk?",
      answer: "Yes, numerous studies demonstrate significant health benefits from air quality improvements: Reducing PM2.5 exposure decreases asthma incidence by up to 10–20%, Clean Air Act regulations prevented an estimated 130,000 myocardial infarction events in the USA in one year, Each interquartile range reduction in PM2.5 (approximately 8% reduction) lowers asthma risk by 11%, Improved air quality leads to measurable improvements in lung function (FEV1 and FVC), Decreased pollution exposure reduces hospitalization rates for COPD and heart failure, Children in areas with improving air quality show better lung development, and Long-term air quality improvements slow atherosclerosis progression.",
    },
    {
      question: "What does scientific research recommend for protection?",
      answer: "Evidence-based recommendations include: Monitor air quality levels and limit outdoor activities during high pollution days, Use HEPA air purifiers in homes and workplaces (proven to reduce symptoms in clinical trials), Ensure proper ventilation while minimizing outdoor pollutant entry, Regular AC maintenance to prevent indoor pollutant circulation, Live away from high-traffic roads and industrial emission sources (>300m distance recommended), Support policy measures for stricter emission standards and clean energy, Regular health screenings for vulnerable populations, Integrate air quality data into clinical decision-making, Public health education on pollution risks and protective behaviors, and Create green spaces and urban forests which act as natural air filters.",
    },
  ];

  const faqs = showAll ? allFaqs : allFaqs.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-secondary/30 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
              Frequently Asked
              <span className="block text-accent mt-2">Questions</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
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
