import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"

export function LogoMarquee() {
  const CompanyLogos = {
    TechCorp: () => (
      <svg viewBox="0 0 100 50" className="h-4 watch:h-3">
        <rect x="10" y="10" width="30" height="30" rx="5" fill="#3B82F6" />
        <rect x="50" y="10" width="40" height="10" rx="5" fill="#3B82F6" />
        <rect x="50" y="30" width="40" height="10" rx="5" fill="#3B82F6" />
      </svg>
    ),
    DesignHub: () => (
      <svg viewBox="0 0 100 50" className="h-4 watch:h-3">
        <circle cx="25" cy="25" r="15" fill="#EC4899" />
        <path d="M60,10 L90,10 L75,40 Z" fill="#EC4899" />
      </svg>
    ),
    DevTeam: () => (
      <svg viewBox="0 0 100 50" className="h-4 watch:h-3">
        <rect x="10" y="10" width="20" height="30" rx="3" fill="#10B981" />
        <rect x="40" y="10" width="20" height="30" rx="3" fill="#10B981" />
        <rect x="70" y="10" width="20" height="30" rx="3" fill="#10B981" />
      </svg>
    ),
    CreativeX: () => (
      <svg viewBox="0 0 100 50" className="h-4 watch:h-3">
        <path d="M10,10 L40,40 M40,10 L10,40" stroke="#F59E0B" strokeWidth="6" />
        <path d="M60,10 L90,40 M90,10 L60,40" stroke="#F59E0B" strokeWidth="6" />
      </svg>
    ),
    PixelCo: () => (
      <svg viewBox="0 0 100 50" className="h-4 watch:h-3">
        <rect x="10" y="10" width="10" height="10" fill="#8B5CF6" />
        <rect x="30" y="10" width="10" height="10" fill="#8B5CF6" />
        <rect x="50" y="10" width="10" height="10" fill="#8B5CF6" />
        <rect x="10" y="30" width="10" height="10" fill="#8B5CF6" />
        <rect x="30" y="30" width="10" height="10" fill="#8B5CF6" />
        <rect x="50" y="30" width="10" height="10" fill="#8B5CF6" />
      </svg>
    ),
    CodeLabs: () => (
      <svg viewBox="0 0 100 50" className="h-4 watch:h-3">
        <path d="M20,25 L35,10 M20,25 L35,40 M50,25 L65,10 M50,25 L65,40 M80,25 L65,10 M80,25 L65,40" 
              stroke="#EF4444" strokeWidth="4" fill="none" />
      </svg>
    )
  }

  const companies = [
    { name: "TechCorp", Component: CompanyLogos.TechCorp },
    { name: "DesignHub", Component: CompanyLogos.DesignHub },
    { name: "DevTeam", Component: CompanyLogos.DevTeam },
    { name: "CreativeX", Component: CompanyLogos.CreativeX },
    { name: "PixelCo", Component: CompanyLogos.PixelCo },
    { name: "CodeLabs", Component: CompanyLogos.CodeLabs }
  ]

  return (
    <section className="py-2 watch:py-1 bg-muted/30 overflow-hidden">
      <div className="container">
        <p className="text-center text-xl watch:text-[0.6rem] uppercase tracking-wider text-muted-foreground watch:mb-1 mb-7">
          Trusted by teams at
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-[90vw] watch:max-w-[85vw] mx-auto"
        >
          <Marquee autoFill speed={60} className="py-1">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center mx-4 watch:mx-2">
                <company.Component />
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  )
}