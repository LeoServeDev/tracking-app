import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useNavigate } from "react-router-dom"

const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    title: "Team Collaboration",
    description: "See how teams collaborate across different apps"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    title: "Daily Reports",
    description: "Beautiful visualizations of your daily activity"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    title: "Weekly Insights",
    description: "Track your productivity trends week over week"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    title: "App Usage",
    description: "Detailed breakdown of time spent in each app"
  }
]

export function ImageGallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  const navigate = useNavigate()

  const handleViewAllClick = () => {
    navigate('/login')
  }

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-background">
      <div className="container px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Visualize Your Productivity</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            See your work patterns through beautiful data visualizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-medium text-sm sm:text-base">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <button 
            onClick={handleViewAllClick}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            View All Gallery
          </button>
        </motion.div>
      </div>
    </section>
  )
}