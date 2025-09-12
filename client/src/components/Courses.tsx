import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import CourseCard from "./CourseCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { 
  Code2, 
  Database, 
  Cloud, 
  Smartphone, 
  Shield, 
  BarChart3,
  Cpu,
  Terminal
} from "lucide-react"

// todo: remove mock functionality - replace with real course data
const mockCourses = [
  {
    title: "Operating System Fundamentals",
    description: "Learn the core concepts of operating systems including process management, memory allocation, and file systems.",
    duration: "8 weeks",
    students: 2340,
    rating: 4.9,
    level: "Beginner" as const,
    tags: ["OS", "Theory", "Fundamentals"],
    icon: Cpu,
    category: "fundamentals"
  },
  {
    title: "Kernel Development",
    description: "Advanced course on kernel programming, device drivers, and low-level system interactions.",
    duration: "12 weeks",
    students: 1250,
    rating: 4.8,
    level: "Advanced" as const,
    tags: ["C/C++", "Kernel", "Systems"],
    icon: Code2,
    category: "development"
  },
  {
    title: "System Security",
    description: "Comprehensive security principles for operating systems, including access control and cryptography.",
    duration: "10 weeks",
    students: 1890,
    rating: 4.7,
    level: "Intermediate" as const,
    tags: ["Security", "Cryptography", "Access Control"],
    icon: Shield,
    category: "security"
  },
  {
    title: "Database Systems",
    description: "Design and implementation of database management systems with focus on performance and scalability.",
    duration: "14 weeks",
    students: 1560,
    rating: 4.8,
    level: "Intermediate" as const,
    tags: ["SQL", "NoSQL", "Performance"],
    icon: Database,
    category: "data"
  },
  {
    title: "Cloud Computing",
    description: "Modern cloud architectures, containerization, and distributed system design patterns.",
    duration: "10 weeks",
    students: 2100,
    rating: 4.9,
    level: "Intermediate" as const,
    tags: ["Docker", "Kubernetes", "AWS"],
    icon: Cloud,
    category: "cloud"
  },
  {
    title: "Mobile OS Development",
    description: "Build custom mobile operating systems and understand mobile system architecture.",
    duration: "16 weeks",
    students: 980,
    rating: 4.6,
    level: "Advanced" as const,
    tags: ["Android", "iOS", "Mobile"],
    icon: Smartphone,
    category: "mobile"
  },
  {
    title: "System Performance Analysis",
    description: "Tools and techniques for analyzing and optimizing system performance in production environments.",
    duration: "6 weeks",
    students: 1440,
    rating: 4.8,
    level: "Intermediate" as const,
    tags: ["Performance", "Monitoring", "Analytics"],
    icon: BarChart3,
    category: "performance"
  },
  {
    title: "Command Line Mastery",
    description: "Master the command line interface and shell scripting for system administration and automation.",
    duration: "4 weeks",
    students: 3200,
    rating: 4.7,
    level: "Beginner" as const,
    tags: ["Bash", "Shell", "Automation"],
    icon: Terminal,
    category: "tools"
  }
]

const categories = ["all", "fundamentals", "development", "security", "data", "cloud", "mobile", "performance", "tools"]
const levels = ["all", "Beginner", "Intermediate", "Advanced"]

export default function Courses() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const handleEnroll = (courseTitle: string) => {
    console.log(`Enrolling in course: ${courseTitle}`)
    // todo: remove mock functionality - implement real enrollment
  }

  return (
    <section id="courses" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6" data-testid="text-courses-title">
            Our Courses
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12" data-testid="text-courses-description">
            Explore our comprehensive curriculum designed to take you from beginner to expert in operating system development.
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, technologies, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Button variant="outline" className="hover-elevate" data-testid="button-filter">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover-elevate transition-all duration-200"
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`badge-category-${category}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {levels.map((level) => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? "default" : "secondary"}
                  className="cursor-pointer hover-elevate transition-all duration-200"
                  onClick={() => setSelectedLevel(level)}
                  data-testid={`badge-level-${level.toLowerCase()}`}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CourseCard
                {...course}
                onEnroll={() => handleEnroll(course.title)}
              />
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground" data-testid="text-no-results">
              No courses found matching your criteria. Try adjusting your search or filters.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}