import { Link } from "react-router-dom"

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Docs", href: "/docs" },
      { name: "Support", href: "/support" },
      { name: "Community", href: "/community" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container max-w-7xl mx-auto px-1 xs:px-2 sm:px-4 py-6 xs:py-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 xs:gap-6">
          <div className="col-span-1 xs:col-span-2 sm:col-span-3 md:col-span-2 mb-4 xs:mb-0">
            <Link to="/" className="text-sm xs:text-base font-bold mb-3 xs:mb-4 inline-block">
              TimeTrack
            </Link>
            <p className="text-xs xs:text-sm text-muted-foreground max-w-sm">
              The most accurate time tracking app for individuals and teams.
            </p>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-2 xs:space-y-3">
              <h3 className="text-xs xs:text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-1 xs:space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.href}
                      className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} TimeTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
