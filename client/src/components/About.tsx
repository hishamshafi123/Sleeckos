import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Cpu, Shield, Users } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Code,
      title: "Modern Development",
      description: "Learn cutting-edge programming techniques and best practices for OS development."
    },
    {
      icon: Cpu,
      title: "System Architecture",
      description: "Deep dive into computer architecture and low-level system design principles."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Build secure systems with comprehensive security patterns and methodologies."
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Join a vibrant community of developers and industry professionals."
    }
  ]

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-about-title">
            About SleeckOS
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-description">
            SleeckOS is dedicated to advancing the next generation of operating system development. 
            Our comprehensive platform combines theoretical knowledge with hands-on practical experience, 
            preparing developers for the challenges of modern system programming.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 border-card-border">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" data-testid={`icon-${feature.title.toLowerCase().replace(' ', '-')}`} />
                  <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid={`text-feature-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-feature-desc-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}