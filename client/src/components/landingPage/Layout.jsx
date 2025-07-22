import { Header } from "./Header"
import { Hero } from "./Hero"
import { Features } from "./Features"
import { Testimonials } from "./Testimonials"
import { Pricing } from "./Pricing"
import { CTA } from "./CTA"
import { Footer } from "./Footer"
import { InteractiveDemo } from "./InteractiveDemo"
import { ThemeProvider } from "@/hooks/theme-provider"
import { AnimatedBackground } from "./AnimatedBackground"
import { LogoMarquee } from "./LogoMarquee"
import { ImageGallery } from "./ImageGallery"

function LandingPageLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col mx-auto  overflow-x-hidden">
        <AnimatedBackground />
        <Header />
        <main className="flex-1 mx-auto  p-4 lg:p-0">
          <Hero />
          <LogoMarquee />
          <Features />
          <ImageGallery />
          <InteractiveDemo />
          <Testimonials />
          <Pricing />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default LandingPageLayout