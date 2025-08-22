import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import "@/i18n";

export default function IndexPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
