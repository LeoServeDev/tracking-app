"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "@/hooks/theme-provider"

export function AnimatedBackground() {
  const [currentImage, setCurrentImage] = useState(0)
  const { theme } = useTheme()

  const lightBackgrounds = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ]

  const darkBackgrounds = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ]

  const backgrounds = theme === "dark" ? darkBackgrounds : lightBackgrounds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgrounds.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [backgrounds.length])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {backgrounds.map((image, index) => (
        <motion.div
          key={image}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentImage ? (theme === "dark" ? 0.4 : 0.6) : 0,
            scale: index === currentImage ? 1 : 1.05,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            filter: theme === "dark" ? "brightness(0.3)" : "brightness(0.8)",
          }}
        />
      ))}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          theme === "dark" ? "from-background/80 to-background/95" : "from-background/60 to-background/80"
        }`}
      />
    </div>
  )
}
