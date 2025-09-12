import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-testid="text-hero-title"
          >
            Welcome to{" "}
            <span className="text-primary">SleeckOS</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="text-hero-tagline"
          >
            Master modern operating systems development with cutting-edge courses designed for the next generation of tech professionals.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="hover-elevate text-lg px-8 py-3"
              onClick={() => scrollToSection('courses')}
              data-testid="button-explore-courses"
            >
              Explore Courses
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover-elevate text-lg px-8 py-3"
              onClick={() => scrollToSection('about')}
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </motion.div>
          
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, repeat: Infinity, repeatType: "reverse" }}
            onClick={() => scrollToSection('about')}
            data-testid="button-scroll-down"
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}