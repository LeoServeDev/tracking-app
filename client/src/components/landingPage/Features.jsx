"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const features = [
  {
    title: "Real-time Tracking",
    description: "Monitor your app usage in real-time with detailed session logs.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Time Analytics",
    description: "Understand how you spend your time with comprehensive reports.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
  {
    title: "Productivity Scores",
    description: "Get personalized productivity scores based on your activity.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
  },
]

export function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="features"
      className="mt-5 py-4 xs:py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-background/50 backdrop-blur-sm"
    >
      <div className="container max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="  xs:text-lg text-4xl md:text-2xl lg:text-3xl font-bold mb-5 xs:mb-3 sm:mb-4">
            Powerful Features
          </h2>
          <p className="text-[15px] xs:text-sm md:text-lg text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-3">
            Everything you need to understand and improve your digital habits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 h-full sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="overflow-hidden rounded-lg xs:rounded-xl h-[350px] bg-background shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="h-[250px] xs:h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 md:mt-0 p-3 xs:p-4 sm:p-5 md:p-6">
                <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold mb-1 xs:mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
