import About from "@/components/About";
import AdminPanel from "@/components/AdminPanel";
import Benefits from "@/components/Benefits";
import CautionSection from "@/components/CautionSection";
import Conditions from "@/components/Conditions";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import OrderTracking from "@/components/OrderTracking";
import SecretOrderView from "@/components/SecretOrderView";
import Testimonials from "@/components/Testimonials";
import { Toaster } from "@/components/ui/sonner";
import { InternetIdentityProvider } from "@/hooks/useInternetIdentity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <About />
        <Conditions />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Contact />
        <OrderTracking />
        <CautionSection />
      </main>
      <Footer />
      <SecretOrderView />
    </>
  );
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return pathname;
}

export default function App() {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        {pathname === "/admin" ? <AdminPanel /> : <LandingPage />}
        <Toaster />
      </InternetIdentityProvider>
    </QueryClientProvider>
  );
}
