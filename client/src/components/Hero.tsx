import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Zap, Code, Cpu } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: number, y: number }) => (
  <motion.div
    className="absolute text-primary/20"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180, 360],
      y: [0, -100, -200]
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon className="h-6 w-6" />
  </motion.div>
)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 10 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 10 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const letterVariants = {
    initial: { opacity: 0, y: 50, rotateX: 90 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    })
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Background Icons */}
      <FloatingIcon icon={Zap} delay={0} x={10} y={20} />
      <FloatingIcon icon={Code} delay={2} x={85} y={30} />
      <FloatingIcon icon={Cpu} delay={4} x={15} y={70} />
      <FloatingIcon icon={Zap} delay={3} x={90} y={80} />
      <FloatingIcon icon={Code} delay={1} x={50} y={10} />

      {/* Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: isHovered ? ['0px 0px', '50px 50px'] : ['0px 0px', '0px 0px']
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
        >
          {/* Enhanced Title Animation */}
          <div className="mb-8">
            <motion.div className="inline-block">
              <motion.span 
                className="block text-sm uppercase tracking-[0.3em] text-primary font-medium mb-4"
                initial={{ opacity: 0, letterSpacing: "1em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ duration: 1, delay: 0.5 }}
                data-testid="text-hero-subtitle"
              >
                Next Generation Technology
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-black text-foreground leading-tight tracking-tight"
              data-testid="text-hero-title"
            >
              {"Welcome to ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              <motion.span 
                className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent inline-block"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 100%" }}
              >
                {"SleeckOS".split("").map((char, i) => (
                  <motion.span
                    key={i + 20}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    custom={i + 20}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>
          </div>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            data-testid="text-hero-tagline"
          >
            Master modern operating systems development with{" "}
            <motion.span 
              className="text-primary font-semibold"
              animate={{ textShadow: ["0 0 0px rgb(59, 130, 246)", "0 0 10px rgb(59, 130, 246)", "0 0 0px rgb(59, 130, 246)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              AI-powered
            </motion.span>
            {" "}courses designed for the next generation of tech professionals.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                filter: "brightness(1.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="hover-elevate text-lg px-10 py-4 font-semibold bg-primary hover:bg-primary/90 border-0 shadow-lg"
                onClick={() => scrollToSection('courses')}
                data-testid="button-explore-courses"
              >
                <Zap className="mr-2 h-5 w-5" />
                Explore Courses
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgb(59, 130, 246)",
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="hover-elevate text-lg px-10 py-4 font-semibold border-2 border-primary/30 hover:border-primary/60 bg-background/50 backdrop-blur-sm"
                onClick={() => scrollToSection('about')}
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 2 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={() => scrollToSection('about')}
            data-testid="button-scroll-down"
            whileHover={{ scale: 1.2, y: -5 }}
          >
            <motion.div 
              className="p-2 rounded-full border-2 border-primary/30 hover:border-primary/60 bg-background/20 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 0px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}