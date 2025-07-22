
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"
// import { MonitorCheck, Clock, BarChart2, Users } from "lucide-react"
// import { useInView } from "react-intersection-observer"

// export function Hero() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1
//   })

//   const appScreenshots = {
//     screen1: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
//     screen2: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
//   }

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   }

//   return (
//     <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 overflow-hidden">
//       <div ref={ref} className="mx-auto container flex max-w-[64rem] flex-col items-center gap-4 text-center relative z-10">
//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate={inView ? "show" : "hidden"}
//         >
//           <motion.h1 variants={item} className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
//             Track Time. Boost Productivity.
//           </motion.h1>
//           <motion.p variants={item} className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
//             TimeTrack helps individuals and teams measure their productivity by tracking app usage and activity duration.
//           </motion.p>
//           <motion.div variants={item} className="my-4 flex gap-4 justify-center">
//             <Button asChild size="lg">
//               <Link to="/signup">Get Started</Link>
//             </Button>
//             <Button variant="outline" asChild size="lg">
//               <Link to="/demo">Live Demo</Link>
//             </Button>
//           </motion.div>
//         </motion.div>
//       </div>
      
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="mx-auto flex justify-center relative z-10"
//       >
//         <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
//           {[
//             { icon: <MonitorCheck className="h-8 w-8 mb-2" />, text: "App Tracking" },
//             { icon: <Clock className="h-8 w-8 mb-2" />, text: "Time Analysis" },
//             { icon: <BarChart2 className="h-8 w-8 mb-2" />, text: "Productivity Reports" },
//             { icon: <Users className="h-8 w-8 mb-2" />, text: "Team Insights" }
//           ].map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 + index * 0.1 }}
//               className="flex flex-col items-center bg-background/80 backdrop-blur-sm p-4 rounded-lg border"
//             >
//               {feature.icon}
//               <span>{feature.text}</span>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Floating app screenshots */}
//       <motion.div
//         className="absolute right-10 top-1/4 w-48 rounded-xl shadow-2xl border hidden lg:block overflow-hidden"
//         initial={{ x: 100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.8, duration: 0.8 }}
//       >
//         <img 
//           src={appScreenshots.screen1} 
//           alt="App screenshot" 
//           className="w-full h-auto object-cover"
//         />
//       </motion.div>
//       <motion.div
//         className="absolute left-10 top-1/2 w-48 rounded-xl shadow-2xl border hidden lg:block overflow-hidden"
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 1, duration: 0.8 }}
//       >
//         <img 
//           src={appScreenshots.screen2} 
//           alt="App screenshot" 
//           className="w-full h-auto object-cover"
//         />
//       </motion.div>
//     </section>
//   )
// }

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { MonitorCheck, Clock, BarChart2, Users } from "lucide-react"

export function Hero() {
  const features = [
    { icon: <MonitorCheck className="h-4 w-4 sm:h-5 sm:w-5" />, text: "App Tracking" },
    { icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />, text: "Time Analysis" },
    { icon: <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5" />, text: "Reports" },
    { icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />, text: "Team Insights" }
  ]

  return (
    <section className="relative py-8 sm:py-12 md:py-20 lg:py-32">
      <div className="container px-3 sm:px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text bg-gradient-to-r from-primary to-primary/70 mb-4"
            >
              Track Time. Boost Productivity.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm xs:text-base sm:text-lg text-muted-foreground mb-6 max-w-lg mx-auto md:mx-0"
            >
              TimeTrack helps individuals and teams measure productivity by tracking app usage.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col xs:flex-row gap-3 justify-center md:justify-start lg:items-start sm:items-center "
            >
              <Button asChild size="sm" className="text-xs xs:text-sm hover:bg-white hover:text-black w-full">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild size="sm" className="text-xs xs:text-sm hover:bg-black w-full">
                <Link to="/demo">Live Demo</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap justify-center md:justify-start gap-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-1 px-3 py-2 bg-background/80 backdrop-blur-sm rounded-lg border text-xs xs:text-sm"
                >
                  {feature.icon}
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mt-8 md:mt-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
              alt="Dashboard preview" 
              className="w-full h-auto rounded-xl shadow-lg border"
            />
            <motion.img
              src="https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Mobile app preview"
              className="absolute -bottom-4 -right-4 w-16 xs:w-20 sm:w-24 md:w-32 lg:w-40 rounded-lg shadow-md border hidden xs:block"
              initial={{ x: 20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}