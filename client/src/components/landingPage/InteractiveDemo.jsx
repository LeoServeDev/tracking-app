"use client"

import { motion, useAnimation } from "framer-motion"
import { useState } from "react"
import { Monitor, Clock, PieChart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const apps = [
  { name: "Figma", category: "Design", color: "bg-purple-500" },
  { name: "VSCode", category: "Development", color: "bg-blue-500" },
  { name: "Slack", category: "Communication", color: "bg-red-500" },
  { name: "Chrome", category: "Browsing", color: "bg-yellow-500" },
  { name: "Spotify", category: "Music", color: "bg-green-500" },
]

export function InteractiveDemo() {
  const [isTracking, setIsTracking] = useState(false)
  const [activeApp, setActiveApp] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const controls = useAnimation()

  const startTracking = async () => {
    setIsTracking(true)
    setShowReport(false)

    for (let i = 0; i < apps.length; i++) {
      setActiveApp(i)
      await controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 },
      })
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    setActiveApp(null)
    setIsTracking(false)
    setShowReport(true)
  }

  return (
    <section className="py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/40">
      <div className="container max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4">
            How TimeTrack Works
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            See TimeTrack in action with our interactive demo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="space-y-4 xs:space-y-6 order-2 lg:order-1">
            <div className="flex flex-col items-center space-y-3 xs:space-y-4">
              <motion.div
                animate={controls}
                className="relative w-full max-w-sm xs:max-w-md sm:max-w-lg h-48 xs:h-56 sm:h-64 md:h-72 bg-background rounded-lg border shadow-inner flex items-center justify-center"
              >
                {activeApp !== null ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <div
                      className={`h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 ${apps[activeApp].color} rounded-lg flex items-center justify-center mx-auto mb-3 xs:mb-4`}
                    >
                      <Monitor className="text-white h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-base xs:text-lg sm:text-xl font-medium">{apps[activeApp].name}</h3>
                    <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">{apps[activeApp].category}</p>
                    <div className="mt-3 xs:mt-4 flex items-center justify-center space-x-2">
                      <Clock className="h-3 w-3 xs:h-4 xs:w-4" />
                      <span className="text-xs xs:text-sm">Tracking time...</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center px-4">
                    {isTracking ? (
                      <div className="space-y-2 xs:space-y-3">
                        <div className="h-6 w-6 xs:h-8 xs:w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-xs xs:text-sm sm:text-base">Analyzing your activity...</p>
                      </div>
                    ) : showReport ? (
                      <div className="space-y-3 xs:space-y-4">
                        <PieChart className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 mx-auto text-primary" />
                        <h3 className="text-base xs:text-lg sm:text-xl font-medium">Your Daily Report</h3>
                        <div className="space-y-1 xs:space-y-2">
                          {apps.map((app, index) => (
                            <div key={index} className="flex items-center justify-between text-xs xs:text-sm">
                              <span>{app.name}</span>
                              <span className="font-mono">{(index + 1) * 23} min</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 xs:space-y-4">
                        <Zap className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 mx-auto text-primary" />
                        <h3 className="text-base xs:text-lg sm:text-xl font-medium">Ready to Track</h3>
                        <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">
                          Click below to start demo
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>

              <Button
                onClick={startTracking}
                disabled={isTracking}
                className="w-full max-w-sm xs:max-w-md text-xs xs:text-sm sm:text-base"
              >
                {isTracking ? "Tracking..." : showReport ? "Run Demo Again" : "Start Demo"}
              </Button>
            </div>
          </div>

          <div className="space-y-4 xs:space-y-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 xs:p-5 sm:p-6 bg-background rounded-lg border shadow-sm"
            >
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-3 xs:mb-4">Automatic Time Tracking</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mb-3 xs:mb-4">
                TimeTrack runs securely in the background, automatically recording the time you spend in each
                application.
              </p>
              <ul className="space-y-2 xs:space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 xs:h-5 xs:w-5 text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-2 text-xs xs:text-sm sm:text-base">No manual timers needed</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 xs:h-5 xs:w-5 text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-2 text-xs xs:text-sm sm:text-base">Accurate to the second</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-4 w-4 xs:h-5 xs:w-5 text-green-500 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="ml-2 text-xs xs:text-sm sm:text-base">Works across all your devices</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 xs:p-5 sm:p-6 bg-background rounded-lg border shadow-sm"
            >
              <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-3 xs:mb-4">Detailed Reports</h3>
              <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mb-3 xs:mb-4">
                Get insights into how you spend your time with beautiful, easy-to-understand reports.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-muted rounded">
                  <div className="text-xs xs:text-sm">Daily</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-xs xs:text-sm">Weekly</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="text-xs xs:text-sm">Monthly</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
