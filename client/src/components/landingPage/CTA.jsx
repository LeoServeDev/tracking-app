"use client"

import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="rounded-lg xs:rounded-xl bg-primary p-4 xs:p-6 sm:p-8 text-primary-foreground shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4">
                Ready to take control of your time?
              </h2>
              <p className="text-xs xs:text-sm sm:text-base">
                Join thousands of professionals who have already transformed their productivity with TimeTrack.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Button
                variant="secondary"
                size="lg"
                className="text-xs xs:text-sm sm:text-base px-4 xs:px-6 sm:px-8 h-10 xs:h-11 sm:h-12"
              >
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
