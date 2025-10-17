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
      question: "Yabancılar Dubai'de ev alabilir mi?",
      answer: "Evet, yabancılar birçok bölgede tam mülkiyetle konut, villa veya ofis satın alabilir.",
    },
    {
      question: "Dubai'de ev alırken neden ekspertiz/inspection yaptırmak gerekir?",
      answer: "Dubai iklimi ve inşaat süreçleri sebebiyle birçok evde gizli kusurlar olabilir. Inspection işlemiyle, alım öncesi yapısal, teknik ve tesisatla ilgili tüm sorunlar tespit edilir, beklenmedik masraflar ve riskler önlenir.",
    },
    {
      question: "Dubai'de evlerde en çok hangi sorunlarla karşılaşılır?",
      answer: "En yaygın problemler arasında klima arızaları, su baskınları ve sızıntılar, rutubet ve küf, elektrik-mekanik arızalar, haşere sorunları, yalıtım ve gürültü problemleri, fatura ve aidat karmaşası öne çıkmaktadır.",
    },
    {
      question: "Ev inspectionu hangi kusurları ortaya çıkarır?",
      answer: "Tesisat sorunları, temel yapı çatlakları, nem ve rutubet, pencere/kapı sızdırmazlığı, mekanik-elektrik hataları, inşaat kalitesindeki eksiklikler ve görünmeyen teknik problemleri tespit eder.",
    },
    {
      question: "Ev inspectionu almak yatırımcıya ne sağlar?",
      answer: "Yüksek, beklenmedik onarım giderlerinin önüne geçmeyi, gerçek değeri belirlemeyi, müzakere gücü kazanmayı ve uzun vadeli yatırım güvenliği sağlamayı sağlar.",
    },
    {
      question: "Inspection sırasında eve zarar gelir mi, rapor ne zaman alınır?",
      answer: "Modern cihazlarla yapılan inspectionlarda eve zarar gelmez. Detaylı rapor genellikle 1-2 gün içinde görsellerle birlikte sunulur.",
    },
    {
      question: "Dubai'de ev alırken toplam hangi masraflar çıkar?",
      answer: "Satın alımda transfer ücreti, kayıt ücreti, ajans komisyonu, yıllık aidat ve topluluk bakım giderleri gibi masraflar çıkar.",
    },
    {
      question: "Yatırıma zarar verebilecek başlıca riskler nelerdir?",
      answer: "Yüksek bakım ve onarım maliyetleri, tasarım ve inşaat kusurları, yapısal arızaların hızlı çözülmemesi, piyasa dalgalanmalarında değer kaybı ve işgal oranı düşüklüğü gibi riskler yatırımcı için önemlidir.",
    },
    {
      question: "Inspection sonrası sorun bulunursa satıcıyla nasıl bir süreç olur?",
      answer: "Soruna göre fiyat indirimi, onarım talebi, masraf paylaşımı veya alım iptali gibi opsiyonlar ortaya çıkar. Alıcı sözleşmeye inspection şartı ekleyebilir.",
    },
    {
      question: "Dubai'de yatırımcılar için en doğru önlemler hangileridir?",
      answer: "Profesyonel inspection yaptırmak, güvenilir müteahhit/firma seçmek, bakım ve aidat kontratlarını dikkatlice incelemek ve resmi kurumlarla işlem yapmak yatırımcı için en önemli adımlardır.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sık Sorulan
              <span className="block text-accent">Sorular</span>
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
