"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/features/marketing/components/navbar";
import { Footer } from "@/features/marketing/components/footer";
import { HeroSection } from "@/features/marketing/components/hero-section";
import { FeaturesSection } from "@/features/marketing/components/features-section";
import { HowItWorksSection } from "@/features/marketing/components/how-it-works";
import {
  TestimonialsSection,
  UseCasesSection,
} from "@/features/marketing/components/social-proof";
import { FAQSection } from "@/features/marketing/components/pricing-faq";
import { CTASection } from "@/features/marketing/components/cta-section";

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full flex-col bg-background text-foreground">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>

      <Navbar scrolled={scrolled} />

      <main id="main-content" className="flex-1 overflow-y-auto pt-20 relative">
        <HeroSection />

        <FeaturesSection />

        <HowItWorksSection />

        <div className="flex flex-col lg:flex-row gap-16 py-20 px-6 md:px-8 lg:px-12">
          <div className="flex-1">
            <TestimonialsSection />
          </div>
          <div className="flex-1">
            <UseCasesSection />
          </div>
        </div>

        <FAQSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
