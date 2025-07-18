"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals getting started with time tracking",
    features: ["Basic app usage tracking", "Daily time reports", "7-day history", "1 device"],
  },
  {
    name: "Pro",
    price: "$5",
    description: "For professionals who want deeper insights",
    features: [
      "Everything in Free",
      "Unlimited history",
      "Advanced analytics",
      "Productivity scores",
      "Up to 3 devices",
    ],
    featured: true,
  },
  {
    name: "Team",
    price: "$15",
    description: "For teams collaborating together",
    features: ["Everything in Pro", "Team dashboard", "Collaboration insights", "Admin controls", "Unlimited devices"],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/40">
      <div className="container max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground">
            No surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg xs:rounded-xl border bg-background p-4 xs:p-5 sm:p-6 shadow-sm ${
                plan.featured ? "ring-2 ring-primary" : ""
              }`}
            >
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-xs xs:text-sm sm:text-base text-muted-foreground">{plan.description}</p>
              <p className="mt-4 xs:mt-5 sm:mt-6 text-2xl xs:text-3xl sm:text-4xl font-bold">
                {plan.price}
                <span className="text-xs xs:text-sm font-normal text-muted-foreground">/month</span>
              </p>

              <ul className="mt-4 xs:mt-6 sm:mt-8 space-y-2 xs:space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-3 w-3 xs:h-4 xs:w-4 text-green-500 flex-shrink-0" />
                    <span className="text-xs xs:text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-4 xs:mt-6 sm:mt-8 w-full text-xs xs:text-sm sm:text-base ${
                  !plan.featured ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
