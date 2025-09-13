import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  Zap, 
  Code, 
  Globe, 
  DollarSign,
  Clock,
  RotateCcw,
  Mail,
  Languages
} from "lucide-react"

/* 
 * CUSTOMIZATION GUIDE:
 * - Base prices: Edit the 'basePrice' values in courseLevels array
 * - Sub-course prices: Edit the 'price' values in subCourses arrays  
 * - Discount rate: Change BUNDLE_DISCOUNT_RATE constant
 * - Duration: Edit 'duration' in courseLevels and subCourses
 * - Contact email: Change CONTACT_EMAIL constant
 * - Language strings: Edit content in courseLevels for easy translation
 * - Toggle localStorage: Set ENABLE_PERSISTENCE to false to disable
 */

const CONTACT_EMAIL = "hello@sleeckos.com"
const BUNDLE_DISCOUNT_RATE = 0.1 // 10% discount for multiple selections
const ENABLE_PERSISTENCE = true // Set to false to disable localStorage

interface SubCourse {
  id: string
  title: string
  description: string
  duration: string
  price: number
  icon: ComponentType<{ className?: string }>
}

interface CourseLevel {
  id: string
  level: string
  title: string
  tagline: string
  basePrice: number
  duration: string
  description: string
  subCourses: SubCourse[]
}

const courseLevels: CourseLevel[] = [
  {
    id: "l1",
    level: "L1",
    title: "AI Foundations", 
    tagline: "Master the fundamentals of AI and machine learning",
    basePrice: 7500,
    duration: "6-8 weeks",
    description: "Build your foundation in artificial intelligence with hands-on learning",
    subCourses: [
      {
        id: "l1-fundamentals",
        title: "AI Fundamentals",
        description: "Core concepts of artificial intelligence and machine learning",
        duration: "2-3 hours",
        price: 1500,
        icon: Brain
      },
      {
        id: "l1-llms", 
        title: "Working with LLMs",
        description: "Practical skills for leveraging large language models",
        duration: "3-4 hours",
        price: 2000,
        icon: Zap
      },
      {
        id: "l1-generative",
        title: "Simple Generative Tasks", 
        description: "Create content using AI tools and techniques",
        duration: "2-3 hours",
        price: 1200,
        icon: Code
      },
      {
        id: "l1-tools",
        title: "AI Tools & Apps",
        description: "Navigate the ecosystem of AI applications and platforms", 
        duration: "2-4 hours",
        price: 1800,
        icon: Globe
      },
      {
        id: "l1-ethics",
        title: "Ethics & Safety",
        description: "Responsible AI development and deployment practices",
        duration: "2 hours", 
        price: 1000,
        icon: Brain
      }
    ]
  },
  {
    id: "l2",
    level: "L2", 
    title: "AI Development",
    tagline: "Build and deploy AI-powered applications",
    basePrice: 25000,
    duration: "12-16 weeks",
    description: "Advanced development skills for creating production-ready AI solutions",
    subCourses: [
      {
        id: "l2-programming",
        title: "Programming with AI (Python intro)",
        description: "Python fundamentals for AI development and automation",
        duration: "4-6 hours",
        price: 3500,
        icon: Code
      },
      {
        id: "l2-chatbots",
        title: "Chatbots & RAG",
        description: "Build intelligent chatbots with retrieval-augmented generation",
        duration: "6-8 hours", 
        price: 4500,
        icon: Brain
      },
      {
        id: "l2-prompting",
        title: "Advanced Prompting & Automation", 
        description: "Master prompt engineering and workflow automation",
        duration: "4-5 hours",
        price: 3000,
        icon: Zap
      },
      {
        id: "l2-agents",
        title: "AI Agents (Intro)",
        description: "Introduction to autonomous AI agent development",
        duration: "5-7 hours",
        price: 4000,
        icon: Globe
      },
      {
        id: "l2-monetization", 
        title: "Monetization Skills",
        description: "Turn your AI skills into profitable ventures",
        duration: "3-4 hours",
        price: 2500,
        icon: DollarSign
      },
      {
        id: "l2-webinars",
        title: "Guest Webinars",
        description: "Exclusive sessions with industry experts and practitioners",
        duration: "2-3 hours",
        price: 1500,
        icon: Globe
      }
    ]
  },
  {
    id: "l3",
    level: "L3",
    title: "AI Mastery", 
    tagline: "Advanced AI systems and business innovation",
    basePrice: 45000,
    duration: "16-20 weeks",
    description: "Expert-level skills for AI leadership and innovation",
    subCourses: [
      {
        id: "l3-advanced-agents",
        title: "Advanced Agents & LangChain",
        description: "Complex AI agent architectures using LangChain framework",
        duration: "8-10 hours",
        price: 6500,
        icon: Code
      },
      {
        id: "l3-custom-llms",
        title: "Custom LLMs & RAG Pipelines", 
        description: "Build custom language models and retrieval systems",
        duration: "10-12 hours",
        price: 8000,
        icon: Brain
      },
      {
        id: "l3-business",
        title: "AI in Business & Innovation",
        description: "Strategic AI implementation for enterprise transformation",
        duration: "6-8 hours",
        price: 5500,
        icon: Globe
      },
      {
        id: "l3-evaluation",
        title: "Performance Evaluation & Hiring",
        description: "AI talent assessment and team building strategies", 
        duration: "4-6 hours",
        price: 4000,
        icon: DollarSign
      }
    ]
  }
]

export default function Courses() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [expandedLevels, setExpandedLevels] = useState<string[]>([])
  const [selectedSubCourses, setSelectedSubCourses] = useState<string[]>([])
  const [language, setLanguage] = useState<'en' | 'ml'>('en')

  // Load selections from localStorage on mount
  useEffect(() => {
    if (!ENABLE_PERSISTENCE) return
    
    const saved = localStorage.getItem('sleeckos-course-selections')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setSelectedSubCourses(data.selectedSubCourses || [])
        setExpandedLevels(data.expandedLevels || [])
        setLanguage(data.language || 'en')
      } catch (e) {
        console.warn('Failed to load saved course selections')
      }
    }
  }, [])

  // Save selections to localStorage
  useEffect(() => {
    if (!ENABLE_PERSISTENCE) return
    
    const data = {
      selectedSubCourses,
      expandedLevels, 
      language
    }
    localStorage.setItem('sleeckos-course-selections', JSON.stringify(data))
  }, [selectedSubCourses, expandedLevels, language])

  const toggleLevel = (levelId: string) => {
    setExpandedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    )
  }

  const toggleSubCourse = (subCourseId: string) => {
    setSelectedSubCourses(prev =>
      prev.includes(subCourseId)
        ? prev.filter(id => id !== subCourseId) 
        : [...prev, subCourseId]
    )
  }

  const resetSelections = () => {
    setSelectedSubCourses([])
    setExpandedLevels([])
    if (ENABLE_PERSISTENCE) {
      localStorage.removeItem('sleeckos-course-selections')
    }
  }

  const calculateTotal = () => {
    let subtotal = 0
    const selectedLevels = new Set<string>()
    
    selectedSubCourses.forEach(subCourseId => {
      const level = courseLevels.find(l => l.subCourses.some(sc => sc.id === subCourseId))
      if (level) {
        selectedLevels.add(level.id)
        const subCourse = level.subCourses.find(sc => sc.id === subCourseId)
        if (subCourse) subtotal += subCourse.price
      }
    })

    // Add base prices for levels with selected sub-courses
    selectedLevels.forEach(levelId => {
      const level = courseLevels.find(l => l.id === levelId)
      if (level) subtotal += level.basePrice
    })

    const discount = selectedSubCourses.length > 2 ? subtotal * BUNDLE_DISCOUNT_RATE : 0
    const total = subtotal - discount

    return { subtotal, discount, total, selectedLevels: selectedLevels.size }
  }

  const handleEnrollRequest = () => {
    const pricing = calculateTotal()
    const selectedItems = selectedSubCourses.map(id => {
      const level = courseLevels.find(l => l.subCourses.some(sc => sc.id === id))
      const subCourse = level?.subCourses.find(sc => sc.id === id)
      return `${level?.level}: ${subCourse?.title}`
    }).join('\n')

    const subject = `SleeckOS Course Enrollment Request`
    const body = `Hi SleeckOS Team,\n\nI would like to request information about enrolling in the following courses:\n\n${selectedItems}\n\nPackage Summary:\nSubtotal: ₹${pricing.subtotal.toLocaleString()}\nDiscount: ₹${pricing.discount.toLocaleString()}\nTotal: ₹${pricing.total.toLocaleString()}\n\nPlease send me more details about enrollment and next steps.\n\nBest regards`
    
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const pricing = calculateTotal()
  const hasSelections = selectedSubCourses.length > 0

  const CourseCard = ({ level }: { level: CourseLevel }) => {
    const isExpanded = expandedLevels.includes(level.id)
    const hasSelectedSubs = level.subCourses.some(sc => selectedSubCourses.includes(sc.id))
    
    return (
      <Card className={`relative overflow-hidden hover-elevate transition-all duration-300 ${
        hasSelectedSubs ? 'ring-2 ring-primary/50 bg-primary/5' : ''
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-bold text-lg px-3 py-1">
                  {level.level}
                </Badge>
                <CardTitle className="text-xl font-bold">{level.title}</CardTitle>
              </div>
              <p className="text-muted-foreground text-sm">{level.tagline}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLevel(level.id)}
              className="shrink-0"
              data-testid={`button-toggle-${level.id}`}
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${level.level} sub-courses`}
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                ₹{level.basePrice.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {level.duration}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <CardContent className="pt-0 space-y-3">
            {level.subCourses.map((subCourse) => {
              const isSelected = selectedSubCourses.includes(subCourse.id)
              return (
                <motion.div
                  key={subCourse.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-card/50 border-border hover:bg-card'
                  }`}
                  onClick={() => toggleSubCourse(subCourse.id)}
                >
                  <Checkbox
                    checked={isSelected}
                    onChange={() => toggleSubCourse(subCourse.id)}
                    className="mt-1 pointer-events-auto"
                    data-testid={`checkbox-${subCourse.id}`}
                    aria-describedby={`desc-${subCourse.id}`}
                  />
                  <div className="flex-1 min-w-0 pointer-events-none">
                    <div className="flex items-center gap-2 mb-1">
                      <subCourse.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm">{subCourse.title}</h4>
                    </div>
                    <p id={`desc-${subCourse.id}`} className="text-xs text-muted-foreground mb-2">
                      {subCourse.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {subCourse.duration}
                      </span>
                      <span className="font-semibold text-primary">+₹{subCourse.price.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </CardContent>
        </motion.div>
      </Card>
    )
  }

  return (
    <section id="courses" className="py-32 bg-gradient-to-br from-card/80 via-card to-background/50 relative overflow-hidden">
      {/* Subtle background patterns */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)',
          backgroundSize: '80px 80px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px']
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          {/* Language Toggle */}
          <motion.div 
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Languages className="h-4 w-4 text-muted-foreground" />
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="text-xs"
              data-testid="button-lang-en"
            >
              EN
            </Button>
            <Button
              variant={language === 'ml' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('ml')}
              className="text-xs"
              data-testid="button-lang-ml"
            >
              മലയാളം
            </Button>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-black text-card-foreground mb-4 leading-tight tracking-tight"
            data-testid="text-courses-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            Courses — L1 • L2 • L3
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            data-testid="text-courses-description"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            Select sub-courses to customize your package. Pricing updates live.
          </motion.p>

          {/* Reset Button */}
          {hasSelections && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={resetSelections}
                className="hover-elevate"
                data-testid="button-reset"
                aria-label="Reset all course selections"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset selections
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Cards */}
          <div className="flex-1 space-y-6">
            {courseLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <CourseCard level={level} />
              </motion.div>
            ))}
          </div>

          {/* Package Summary - Desktop Sticky */}
          <motion.div 
            className="lg:w-96 lg:sticky lg:top-8 lg:self-start"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="backdrop-blur-sm bg-card/90 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Package Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {hasSelections ? (
                  <>
                    <div className="space-y-2" aria-live="polite">
                      {selectedSubCourses.map(id => {
                        const level = courseLevels.find(l => l.subCourses.some(sc => sc.id === id))
                        const subCourse = level?.subCourses.find(sc => sc.id === id)
                        return (
                          <div key={id} className="flex justify-between text-sm">
                            <span className="truncate">{level?.level}: {subCourse?.title}</span>
                            <span className="font-medium text-primary">₹{subCourse?.price.toLocaleString()}</span>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{pricing.subtotal.toLocaleString()}</span>
                      </div>
                      {pricing.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Bundle Discount ({(BUNDLE_DISCOUNT_RATE * 100)}%)</span>
                          <span>-₹{pricing.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-primary">₹{pricing.total.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={handleEnrollRequest}
                      className="w-full hover-elevate"
                      size="lg"
                      data-testid="button-enroll"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Request Info
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Select sub-courses to see pricing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mobile Package Summary */}
        {hasSelections && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-primary/20 p-4 z-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Total: ₹{pricing.total.toLocaleString()}</span>
              <Button
                onClick={handleEnrollRequest}
                size="sm"
                className="hover-elevate"
                data-testid="button-enroll-mobile"
              >
                <Mail className="h-4 w-4 mr-1" />
                Request Info
              </Button>
            </div>
            {pricing.discount > 0 && (
              <p className="text-xs text-green-600">Bundle discount applied!</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}