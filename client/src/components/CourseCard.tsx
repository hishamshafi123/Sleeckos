import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import { useRef, useState } from "react"

interface CourseCardProps {
  title: string
  description: string
  duration: string
  students: number
  rating: number
  level: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  icon: React.ComponentType<{ className?: string }>
  onEnroll?: () => void
}

export default function CourseCard({
  title,
  description,
  duration,
  students,
  rating,
  level,
  tags,
  icon: Icon,
  onEnroll
}: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), { stiffness: 100, damping: 15 })
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 100, damping: 15 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'from-green-500/20 to-green-600/20 border-green-500/30'
      case 'Intermediate': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
      case 'Advanced': return 'from-red-500/20 to-red-600/20 border-red-500/30'
      default: return 'from-primary/20 to-primary/30 border-primary/30'
    }
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ 
        scale: 1.03,
        z: 50
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group"
    >
      <Card className="h-full relative overflow-hidden border-card-border bg-gradient-to-br from-card/80 to-card backdrop-blur-sm">
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            background: isHovered 
              ? "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))"
              : "linear-gradient(45deg, transparent, transparent, transparent)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-lg"
                animate={{
                  scale: isHovered ? 1.5 : 1,
                  opacity: isHovered ? 0.8 : 0
                }}
                transition={{ duration: 0.4 }}
              />
              <Icon className="h-14 w-14 text-primary relative z-10" data-testid={`icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Badge 
                variant="secondary" 
                className={`bg-gradient-to-r ${getLevelColor(level)} font-medium px-3 py-1 shadow-sm`}
                data-testid={`badge-level-${level.toLowerCase()}`}
              >
                {level}
              </Badge>
            </motion.div>
          </div>
          
          <motion.h3 
            className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300" 
            data-testid={`text-course-title-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {title}
          </motion.h3>
          
          <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed" data-testid={`text-course-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-xs font-medium border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10 transition-all duration-200" 
                  data-testid={`badge-tag-${index}`}
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-6 space-x-6">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-4 w-4 text-primary" />
              <span data-testid="text-duration" className="font-medium">{duration}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="h-4 w-4 text-primary" />
              <span data-testid="text-students" className="font-medium">{students.toLocaleString()}</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span data-testid="text-rating" className="font-medium">{rating}</span>
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="w-full hover-elevate font-semibold py-3 bg-primary hover:bg-primary/90 text-primary-foreground group/btn relative overflow-hidden" 
              onClick={onEnroll}
              data-testid="button-enroll"
            >
              <span className="relative z-10 flex items-center justify-center">
                Enroll Now
                <motion.div
                  className="ml-2"
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </span>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}