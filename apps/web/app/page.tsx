import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Problems } from "../components/Problems";
import { Features } from "../components/Features";
import { HowTo } from "../components/HowTo";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problems />
        <Features />
        <HowTo />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
