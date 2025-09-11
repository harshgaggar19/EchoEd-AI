import { DemoVideoSection } from "@/components/DemoVideoSection";
import { Footer } from "@/components/Footer";
import HomeSection from "@/components/HomeSection";
import Navbar from "@/components/Navbar";
import Phone from "@/components/Phone";
import Price from "@/components/Price";
export default function page() {
  return (
    <main className=" w-screen overflow-hidden bg-black">
      <Navbar />
      <div className="w-screen h-screen overflow-hidden">
        <Phone />
      </div>
      <HomeSection />
      <DemoVideoSection />
      <Price />
      <Footer />
    </main>
  );
}
