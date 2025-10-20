import { Building2, Award, Shield, Users } from "lucide-react";
import heroImage from "@/assets/dubai-skyline-hero.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Biz Kimiz
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            10 yıllık mühendislik tecrübesiyle, uluslararası sertifikalara sahip uzman ev değerlendirmecisi olarak, 
            her aşamada güven veren, sektörde fark yaratan bir hizmet sunuyoruz.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none md:flex md:items-center md:gap-8">
            <div className="md:flex-1">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Hikayemiz</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Dubai'de ev sahibi olmak, hayallerinizi gerçekleştirmek demektir. Ancak bu büyük yatırımı yaparken, 
                doğru rehberliğe ihtiyacınız var. İşte tam bu noktada devreye giriyoruz.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                2015 yılından beri, binlerce ailenin ev alımı sürecinde yanlarında olduk. Her bir denetim, 
                sadece bir rapor değil; ailelerin geleceğine yapılan bir yatırımdır. Çünkü biz, evinizin 
                güvenliğinin ve değerinin önemini biliyoruz.
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:w-1/2 lg:w-1/3 md:flex-shrink-0">
              <img src={heroImage} alt="Dubai skyline" className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Değerlerimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <img src={heroImage} alt="office" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <h3 className="font-semibold text-lg">Güvenilirlik</h3>
              <p className="text-sm text-muted-foreground">
                Her denetimde tam şeffaflık ve dürüstlük
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <img src={heroImage} alt="team" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <h3 className="font-semibold text-lg">Uzmanlık</h3>
              <p className="text-sm text-muted-foreground">
                10 yıllık tecrübe ve uluslararası sertifikalar
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <img src={heroImage} alt="clients" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <h3 className="font-semibold text-lg">Müşteri Odaklı</h3>
              <p className="text-sm text-muted-foreground">
                2,400+ mutlu müşteri ailesi
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">İnovasyon</h3>
              <p className="text-sm text-muted-foreground">
                AI destekli analiz ve modern teknoloji
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Sertifikalarımız</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">InterNACHI Certified</h3>
              <p className="text-sm text-muted-foreground">Uluslararası ev denetimi sertifikası</p>
            </div>
            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">Dubai Municipality</h3>
              <p className="text-sm text-muted-foreground">Belediye onaylı denetim hizmeti</p>
            </div>
            <div className="border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">RERA Registered</h3>
              <p className="text-sm text-muted-foreground">Gayrimenkul düzenleme otoritesi kaydı</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Hayalinizdeki Evi Güvenle Alın
          </h2>
          <p className="text-lg text-primary-foreground/90">
            Profesyonel denetim hizmetimizle, yatırımınızı koruma altına alın. 
            Bugün randevunuzu alın, gönül rahatlığıyla ev sahibi olun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/#booking')}
              className="font-semibold"
            >
              Hemen Randevu Al
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/')}
              className="border-primary-foreground/20 hover:bg-primary-foreground/10"
            >
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
