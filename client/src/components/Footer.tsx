import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Zap, Cpu, Code2, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "from-purple-500/20 to-blue-500/20" },
    { icon: Twitter, href: "#", label: "Twitter", color: "from-blue-400/20 to-cyan-400/20" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "from-blue-600/20 to-indigo-600/20" },
    { icon: Mail, href: "mailto:hello@sleeckos.com", label: "Email", color: "from-green-500/20 to-emerald-500/20" }
  ]

  const footerLinks = [
    {
      title: "AI Platform",
      icon: Zap,
      links: [
        { label: "Neural Courses", href: "#courses" },
        { label: "Quantum Pricing", href: "#pricing" },
        { label: "Tech Community", href: "#community" },
        { label: "API Documentation", href: "#docs" }
      ]
    },
    {
      title: "Innovation Hub",
      icon: Cpu,
      links: [
        { label: "About Vision", href: "#about" },
        { label: "Tech Blog", href: "#blog" },
        { label: "Join Elite Team", href: "#careers" },
        { label: "Neural Contact", href: "#contact" }
      ]
    },
    {
      title: "Advanced Support",
      icon: Code2,
      links: [
        { label: "AI Help Center", href: "#help" },
        { label: "Data Privacy", href: "#privacy" },
        { label: "Service Terms", href: "#terms" },
        { label: "System Status", href: "#status" }
      ]
    }
  ]

  const FloatingTechIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: number, y: number }) => (
    <motion.div
      className="absolute text-primary/10"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Icon className="h-4 w-4" />
    </motion.div>
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = footerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 20)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 20)
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-t from-card/50 to-background border-t border-primary/20 py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Tech Icons */}
      <FloatingTechIcon icon={Terminal} delay={0} x={5} y={20} />
      <FloatingTechIcon icon={Code2} delay={2} x={90} y={30} />
      <FloatingTechIcon icon={Cpu} delay={4} x={15} y={80} />
      <FloatingTechIcon icon={Zap} delay={1} x={85} y={70} />
      <FloatingTechIcon icon={Github} delay={3} x={50} y={10} />

      {/* Neural Network Background */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59, 130, 246) 1px, transparent 0)',
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Advanced Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                x: useTransform(mouseX, [-50, 50], [-5, 5]),
                y: useTransform(mouseY, [-50, 50], [-5, 5])
              }}
            >
              <motion.div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-black text-foreground" data-testid="text-footer-brand">
                  Sleeck<span className="text-primary">OS</span>
                </h3>
              </motion.div>
              
              <motion.p 
                className="text-muted-foreground mb-8 leading-relaxed"
                data-testid="text-footer-description"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
              >
                Pioneering the future of OS development through{" "}
                <motion.span 
                  className="text-primary font-semibold"
                  animate={{
                    textShadow: [
                      "0 0 0px rgb(59, 130, 246)",
                      "0 0 10px rgb(59, 130, 246)",
                      "0 0 0px rgb(59, 130, 246)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  quantum AI systems
                </motion.span>
                {" "}and next-generation educational experiences.
              </motion.p>
              
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    onMouseEnter={() => setHoveredSocial(social.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`hover-elevate relative overflow-hidden border border-primary/20 bg-gradient-to-r ${social.color}`}
                      asChild
                      data-testid={`button-social-${social.label.toLowerCase()}`}
                    >
                      <a href={social.href} aria-label={social.label}>
                        <motion.div
                          animate={hoveredSocial === social.label ? {
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.2, 1]
                          } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <social.icon className="h-5 w-5" />
                        </motion.div>
                        
                        {/* Glow effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-primary/20 rounded-md"
                          animate={{
                            opacity: hoveredSocial === social.label ? 0.3 : 0,
                            scale: hoveredSocial === social.label ? 1.2 : 0.8
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Advanced Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <div key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: (sectionIndex + 1) * 0.15, ease: "easeOut" }}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: sectionIndex }}
                  >
                    <section.icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <h4 
                    className="text-foreground font-bold text-lg" 
                    data-testid={`text-footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {section.title}
                  </h4>
                </motion.div>
                
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: (sectionIndex + 1) * 0.1 + linkIndex * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium group flex items-center gap-2"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        whileHover={{ color: "rgb(59, 130, 246)" }}
                      >
                        <motion.div
                          className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.3, repeat: Infinity }}
                        />
                        {link.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Quantum Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="border-t border-gradient-to-r from-transparent via-primary/30 to-transparent pt-10 relative"
        >
          {/* Animated border line */}
          <motion.div 
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 2, delay: 1 }}
          />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Terminal className="h-5 w-5 text-primary" />
              </motion.div>
              <p className="text-muted-foreground font-medium" data-testid="text-copyright">
                © {currentYear} SleeckOS • Quantum-Powered Future
              </p>
            </motion.div>
            
            <div className="flex items-center space-x-8">
              {["privacy", "terms", "cookies"].map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link}`}
                  className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group"
                  data-testid={`link-${link}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}