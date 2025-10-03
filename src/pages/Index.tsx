import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { LoginCardsSection } from "@/components/landing/LoginCardsSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { FeaturesCarousel } from "@/components/landing/FeaturesCarousel";
import { EcosystemSection } from "@/components/landing/EcosystemSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <LoginCardsSection />
      <ComparisonSection />
      <FeaturesCarousel />
      <EcosystemSection />
      <Footer />
    </div>
  );
};

export default Index;
