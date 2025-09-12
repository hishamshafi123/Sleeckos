import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import CourseCard from "./CourseCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Sparkles, Brain, Zap } from "lucide-react"
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 15)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 15)
    }
  }

  const FloatingBrainIcon = ({ delay, x, y }: { delay: number, x: number, y: number }) => (
    <motion.div
      className="absolute text-primary/15"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.4, 0.15]
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Brain className="h-6 w-6" />
    </motion.div>
  )

  return (
    <section 
      id="courses" 
      className="py-32 bg-gradient-to-br from-card/80 via-card to-background/50 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating AI Brain Icons */}
      <FloatingBrainIcon delay={0} x={8} y={15} />
      <FloatingBrainIcon delay={3} x={92} y={25} />
      <FloatingBrainIcon delay={6} x={10} y={75} />
      <FloatingBrainIcon delay={2} x={88} y={85} />
      <FloatingBrainIcon delay={4} x={50} y={5} />

      {/* Advanced Neural Network Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%), linear-gradient(-45deg, transparent 40%, rgba(147, 51, 234, 0.1) 50%, transparent 60%)',
          backgroundSize: '80px 80px'
        }}
        animate={{
          backgroundPosition: ['0px 0px, 0px 0px', '80px 80px, -80px -80px']
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
          style={{
            x: useTransform(mouseX, [-50, 50], [-8, 8]),
            y: useTransform(mouseY, [-50, 50], [-8, 8])
          }}
        >
          <motion.div className="inline-flex items-center gap-4 mb-8">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(180deg)", 
                  "hue-rotate(360deg)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.span 
              className="text-sm uppercase tracking-[0.4em] text-primary font-black"
              initial={{ opacity: 0, letterSpacing: "1.5em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
              transition={{ duration: 2, delay: 0.3 }}
            >
              AI-Enhanced Learning Platform
            </motion.span>
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1],
                filter: [
                  "hue-rotate(360deg)",
                  "hue-rotate(180deg)", 
                  "hue-rotate(0deg)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            >
              <Brain className="h-10 w-10 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-8xl font-black text-card-foreground mb-8 leading-tight tracking-tight"
            data-testid="text-courses-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            Neural{" "}
            <motion.span 
              className="bg-gradient-to-r from-primary via-purple-400 via-blue-400 to-primary bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '200% 50%', '0% 50%']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '300% 100%' }}
            >
              Courses
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed"
            data-testid="text-courses-description"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            Experience revolutionary learning through our{" "}
            <motion.span 
              className="text-primary font-bold"
              animate={{
                textShadow: [
                  "0 0 0px rgb(59, 130, 246)",
                  "0 0 30px rgb(59, 130, 246)",
                  "0 0 0px rgb(59, 130, 246)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              quantum-AI curriculum
            </motion.span>
            , designed to transform you from novice to elite system architect through immersive, 
            next-generation educational experiences.
          </motion.p>

          {/* Advanced Search and Filter Section */}
          <motion.div 
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <motion.div 
                className="relative flex-1"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Search className="h-5 w-5 text-primary" />
                </motion.div>
                <Input
                  placeholder="Search neural courses, quantum technologies, or AI topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-primary/30 focus:border-primary/60 bg-background/50 backdrop-blur-sm font-medium"
                  data-testid="input-search"
                />
                
                {/* Search field glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-md -z-10"
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="hover-elevate border-primary/30 hover:border-primary/60 bg-gradient-to-r from-primary/5 to-purple-500/5 font-semibold px-8" 
                  data-testid="button-filter"
                >
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Filter className="h-5 w-5 mr-3" />
                  </motion.div>
                  Neural Filters
                </Button>
              </motion.div>
            </div>

            {/* Advanced Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer hover-elevate transition-all duration-300 px-4 py-2 font-semibold ${
                      selectedCategory === category 
                        ? "bg-primary border-primary shadow-lg shadow-primary/30" 
                        : "border-primary/30 hover:border-primary/60 bg-background/50 backdrop-blur-sm"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`badge-category-${category}`}
                  >
                    <motion.span
                      animate={selectedCategory === category ? {
                        textShadow: [
                          "0 0 0px rgb(255, 255, 255)",
                          "0 0 10px rgb(255, 255, 255)",
                          "0 0 0px rgb(255, 255, 255)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </motion.span>
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Advanced Level Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {levels.map((level, index) => (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedLevel === level ? "default" : "secondary"}
                    className={`cursor-pointer hover-elevate transition-all duration-300 px-5 py-2 font-bold ${
                      selectedLevel === level 
                        ? "bg-gradient-to-r from-primary to-purple-500 border-0 shadow-lg shadow-primary/30" 
                        : "border-primary/20 hover:border-primary/50 bg-gradient-to-r from-secondary/50 to-secondary backdrop-blur-sm"
                    }`}
                    onClick={() => setSelectedLevel(level)}
                    data-testid={`badge-level-${level.toLowerCase()}`}
                  >
                    <motion.div className="flex items-center gap-2">
                      {selectedLevel === level && (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap className="h-3 w-3" />
                        </motion.div>
                      )}
                      <span>{level}</span>
                    </motion.div>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
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