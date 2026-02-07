import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { ProductShowcase } from '../components/ProductShowcase';
import { AboutSection } from '../components/AboutSection';
import { StatementSection } from '../components/StatementSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <FeaturedProducts />
      <ProductShowcase />
      <AboutSection />
      <StatementSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}



