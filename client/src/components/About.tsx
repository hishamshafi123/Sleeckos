import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cpu, Shield, Users, Sparkles } from "lucide-react"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const features = [
    {
      icon: Code,
      title: "AI-Powered Development",
      description: "Revolutionary programming techniques enhanced by artificial intelligence for next-gen OS development.",
      gradient: "from-blue-500/20 via-purple-500/20 to-blue-600/20"
    },
    {
      icon: Cpu,
      title: "Quantum Architecture",
      description: "Advanced quantum computing principles integrated with traditional system architecture design.",
      gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20"
    },
    {
      icon: Shield,
      title: "Neural Security",
      description: "AI-driven security systems that adapt and evolve to protect against emerging threats.",
      gradient: "from-red-500/20 via-orange-500/20 to-yellow-500/20"
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Connect with elite developers and AI researchers worldwide through our quantum-encrypted platform.",
      gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20"
    }
  ]

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 10)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 10)
    }
  }

  return (
    <section 
      id="about" 
      className="py-32 bg-gradient-to-br from-background via-background to-card/30 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
          style={{
            x: useTransform(mouseX, [-50, 50], [-5, 5]),
            y: useTransform(mouseY, [-50, 50], [-5, 5])
          }}
        >
          <motion.div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.span 
              className="text-sm uppercase tracking-[0.3em] text-primary font-bold"
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              Advanced Technology Platform
            </motion.span>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-black text-foreground mb-8 leading-tight tracking-tight"
            data-testid="text-about-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            About{" "}
            <motion.span 
              className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '300% 100%' }}
            >
              SleeckOS
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            data-testid="text-about-description"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            SleeckOS pioneers the future of operating system development through{" "}
            <motion.span 
              className="text-primary font-semibold"
              animate={{
                textShadow: [
                  "0 0 0px rgb(59, 130, 246)",
                  "0 0 20px rgb(59, 130, 246)",
                  "0 0 0px rgb(59, 130, 246)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              quantum-enhanced AI systems
            </motion.span>
            . Our revolutionary platform merges theoretical mastery with practical implementation, 
            preparing developers for the challenges of tomorrow's computational landscape.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateY: 45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ transformPerspective: 1000 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
            >
              <Card className="h-full relative overflow-hidden border-card-border/50 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm group">
                {/* Animated Border Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-60 transition-all duration-500`}
                  animate={{
                    background: hoveredCard === index 
                      ? `linear-gradient(45deg, ${feature.gradient.split(' ')[0].replace('from-', 'rgba(')}, ${feature.gradient.split(' ')[2].replace('to-', 'rgba(')})`
                      : `linear-gradient(45deg, transparent, transparent)`
                  }}
                />
                
                {/* Floating Particles */}
                <motion.div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/40 rounded-full"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${30 + (i % 3) * 20}%`
                      }}
                      animate={hoveredCard === index ? {
                        y: [0, -20, 0],
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.5, 1]
                      } : {}}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: hoveredCard === index ? Infinity : 0
                      }}
                    />
                  ))}
                </motion.div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                      animate={hoveredCard === index ? {
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 0.6, 0.3]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <feature.icon 
                      className="h-16 w-16 text-primary mx-auto relative z-10" 
                      data-testid={`icon-${feature.title.toLowerCase().replace(' ', '-')}`} 
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                    data-testid={`text-feature-${index}`}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground leading-relaxed"
                    data-testid={`text-feature-desc-${index}`}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}