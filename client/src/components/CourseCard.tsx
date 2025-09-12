import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

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
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover-elevate transition-all duration-300 border-card-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Icon className="h-12 w-12 text-primary" data-testid={`icon-${title.toLowerCase().replace(/\s+/g, '-')}`} />
            <Badge variant="secondary" data-testid={`badge-level-${level.toLowerCase()}`}>
              {level}
            </Badge>
          </div>
          
          <h3 className="text-xl font-semibold text-card-foreground mb-3" data-testid={`text-course-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-course-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs" data-testid={`badge-tag-${index}`}>
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span data-testid="text-duration">{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span data-testid="text-students">{students.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span data-testid="text-rating">{rating}</span>
            </div>
          </div>
          
          <Button 
            className="w-full hover-elevate" 
            onClick={onEnroll}
            data-testid="button-enroll"
          >
            Enroll Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}