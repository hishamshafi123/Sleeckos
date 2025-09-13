import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface Node {
  id: number
  x: number
  y: number
  originalX: number
  originalY: number
  opacity: number
  isActive: boolean
}

interface Connection {
  from: Node
  to: Node
  opacity: number
}

// SLEECKOS letter paths in SVG coordinates (scaled for responsiveness)
const SLEECKOS_PATHS = {
  S: [
    { x: 0.05, y: 0.3 }, { x: 0.08, y: 0.25 }, { x: 0.12, y: 0.25 },
    { x: 0.15, y: 0.3 }, { x: 0.12, y: 0.35 }, { x: 0.08, y: 0.35 },
    { x: 0.05, y: 0.4 }, { x: 0.08, y: 0.45 }, { x: 0.12, y: 0.45 },
    { x: 0.15, y: 0.5 }, { x: 0.12, y: 0.55 }, { x: 0.05, y: 0.55 }
  ],
  L: [
    { x: 0.18, y: 0.25 }, { x: 0.18, y: 0.35 }, { x: 0.18, y: 0.45 },
    { x: 0.18, y: 0.55 }, { x: 0.22, y: 0.55 }, { x: 0.26, y: 0.55 }
  ],
  E: [
    { x: 0.29, y: 0.25 }, { x: 0.29, y: 0.35 }, { x: 0.29, y: 0.45 },
    { x: 0.29, y: 0.55 }, { x: 0.33, y: 0.25 }, { x: 0.33, y: 0.4 },
    { x: 0.37, y: 0.25 }, { x: 0.37, y: 0.55 }
  ],
  E2: [
    { x: 0.4, y: 0.25 }, { x: 0.4, y: 0.35 }, { x: 0.4, y: 0.45 },
    { x: 0.4, y: 0.55 }, { x: 0.44, y: 0.25 }, { x: 0.44, y: 0.4 },
    { x: 0.48, y: 0.25 }, { x: 0.48, y: 0.55 }
  ],
  C: [
    { x: 0.55, y: 0.3 }, { x: 0.51, y: 0.25 }, { x: 0.51, y: 0.35 },
    { x: 0.51, y: 0.45 }, { x: 0.51, y: 0.55 }, { x: 0.55, y: 0.5 },
    { x: 0.59, y: 0.25 }, { x: 0.59, y: 0.55 }
  ],
  K: [
    { x: 0.62, y: 0.25 }, { x: 0.62, y: 0.35 }, { x: 0.62, y: 0.4 },
    { x: 0.62, y: 0.45 }, { x: 0.62, y: 0.55 }, { x: 0.66, y: 0.4 },
    { x: 0.7, y: 0.25 }, { x: 0.7, y: 0.55 }
  ],
  O: [
    { x: 0.73, y: 0.3 }, { x: 0.77, y: 0.25 }, { x: 0.81, y: 0.3 },
    { x: 0.81, y: 0.4 }, { x: 0.81, y: 0.5 }, { x: 0.77, y: 0.55 },
    { x: 0.73, y: 0.5 }, { x: 0.73, y: 0.4 }
  ],
  S2: [
    { x: 0.84, y: 0.3 }, { x: 0.87, y: 0.25 }, { x: 0.91, y: 0.25 },
    { x: 0.94, y: 0.3 }, { x: 0.91, y: 0.35 }, { x: 0.87, y: 0.35 },
    { x: 0.84, y: 0.4 }, { x: 0.87, y: 0.45 }, { x: 0.91, y: 0.45 },
    { x: 0.94, y: 0.5 }, { x: 0.91, y: 0.55 }, { x: 0.84, y: 0.55 }
  ]
}

export default function ConstellationReveal() {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [isRevealed, setIsRevealed] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showHint, setShowHint] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [lastRevealTime, setLastRevealTime] = useState(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Initialize nodes
  const generateNodes = useCallback((width: number, height: number) => {
    const nodeCount = Math.min(120, Math.max(60, Math.floor((width * height) / 8000)))
    const newNodes: Node[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      
      newNodes.push({
        id: i,
        x,
        y,
        originalX: x,
        originalY: y,
        opacity: 0.2 + Math.random() * 0.3,
        isActive: false
      })
    }
    
    return newNodes
  }, [])

  // Handle resize and initialization
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        const newDimensions = { width: rect.width, height: rect.height }
        setDimensions(newDimensions)
        setNodes(generateNodes(newDimensions.width, newDimensions.height))
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [generateNodes])

  // Floating animation for nodes
  useEffect(() => {
    if (prefersReducedMotion || isAnimating) return

    const animate = () => {
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          x: node.originalX + Math.sin(Date.now() * 0.001 + node.id) * 2,
          y: node.originalY + Math.cos(Date.now() * 0.0008 + node.id) * 2
        }))
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [prefersReducedMotion, isAnimating])

  // Handle mouse movement for hover connections
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (prefersReducedMotion || isAnimating || isRevealed) return

    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    setMousePos({ x: mouseX, y: mouseY })

    // Find nodes within radius and create connections
    const radius = 160
    const nearbyNodes = nodes.filter(node => {
      const distance = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2)
      return distance < radius
    })

    const newConnections: Connection[] = []
    for (let i = 0; i < nearbyNodes.length; i++) {
      for (let j = i + 1; j < nearbyNodes.length; j++) {
        const distance = Math.sqrt(
          (nearbyNodes[i].x - nearbyNodes[j].x) ** 2 + 
          (nearbyNodes[i].y - nearbyNodes[j].y) ** 2
        )
        if (distance < radius * 0.7) {
          newConnections.push({
            from: nearbyNodes[i],
            to: nearbyNodes[j],
            opacity: Math.max(0.1, 1 - distance / (radius * 0.7))
          })
        }
      }
    }

    setConnections(newConnections)
    
    // Update node opacity based on proximity
    setNodes(prevNodes =>
      prevNodes.map(node => {
        const distance = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2)
        const isNear = distance < radius
        return {
          ...node,
          opacity: isNear ? Math.min(0.8, node.opacity + 0.3) : node.opacity * 0.95,
          isActive: isNear
        }
      })
    )
  }, [nodes, prefersReducedMotion, isAnimating, isRevealed])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion || isAnimating) return
    
    setConnections([])
    setNodes(prevNodes =>
      prevNodes.map(node => ({
        ...node,
        opacity: 0.2 + Math.random() * 0.3,
        isActive: false
      }))
    )
  }, [prefersReducedMotion, isAnimating])

  // Reveal animation
  const triggerReveal = useCallback(async () => {
    const now = Date.now()
    if (isAnimating || (now - lastRevealTime < 6000)) return

    setLastRevealTime(now)
    setIsAnimating(true)
    setShowHint(false)
    setConnections([])

    // Flatten all letter paths into target positions
    const letterPaths = Object.values(SLEECKOS_PATHS).flat()
    const targetPositions = letterPaths.map(point => ({
      x: point.x * dimensions.width,
      y: point.y * dimensions.height + (dimensions.height * 0.1)
    }))

    // Animate nodes to form SLEECKOS
    const revealPromises = nodes.slice(0, targetPositions.length).map((node, index) => {
      return new Promise<void>(resolve => {
        const target = targetPositions[index]
        const startX = node.x
        const startY = node.y
        const duration = 1200
        const startTime = Date.now()

        const animateNode = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeInOutCubic = (t: number) => 
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

          const easedProgress = easeInOutCubic(progress)
          
          setNodes(prevNodes =>
            prevNodes.map(n =>
              n.id === node.id
                ? {
                    ...n,
                    x: startX + (target.x - startX) * easedProgress,
                    y: startY + (target.y - startY) * easedProgress,
                    opacity: 0.9
                  }
                : n
            )
          )

          if (progress < 1) {
            requestAnimationFrame(animateNode)
          } else {
            resolve()
          }
        }

        requestAnimationFrame(animateNode)
      })
    })

    await Promise.all(revealPromises)

    // Create connections between letter nodes
    const letterConnections: Connection[] = []
    Object.values(SLEECKOS_PATHS).forEach(letterPath => {
      for (let i = 0; i < letterPath.length - 1; i++) {
        const from = { 
          x: letterPath[i].x * dimensions.width, 
          y: letterPath[i].y * dimensions.height + (dimensions.height * 0.1) 
        }
        const to = { 
          x: letterPath[i + 1].x * dimensions.width, 
          y: letterPath[i + 1].y * dimensions.height + (dimensions.height * 0.1) 
        }
        letterConnections.push({
          from: from as Node,
          to: to as Node,
          opacity: 0.8
        })
      }
    })

    setConnections(letterConnections)
    setIsRevealed(true)

    // Hold for 4 seconds then return to starfield
    setTimeout(() => {
      returnToStarfield()
    }, 4000)
  }, [nodes, dimensions, isAnimating, lastRevealTime])

  // Return to starfield
  const returnToStarfield = useCallback(() => {
    if (!isAnimating) return

    const returnPromises = nodes.map(node => {
      return new Promise<void>(resolve => {
        const startX = node.x
        const startY = node.y
        const targetX = node.originalX
        const targetY = node.originalY
        const duration = 800
        const startTime = Date.now()

        const animateReturn = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          setNodes(prevNodes =>
            prevNodes.map(n =>
              n.id === node.id
                ? {
                    ...n,
                    x: startX + (targetX - startX) * easedProgress,
                    y: startY + (targetY - startY) * easedProgress,
                    opacity: 0.2 + Math.random() * 0.3
                  }
                : n
            )
          )

          if (progress < 1) {
            requestAnimationFrame(animateReturn)
          } else {
            resolve()
          }
        }

        requestAnimationFrame(animateReturn)
      })
    })

    Promise.all(returnPromises).then(() => {
      setConnections([])
      setIsRevealed(false)
      setIsAnimating(false)
    })
  }, [nodes, isAnimating])

  // Keyboard handlers
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      triggerReveal()
    }
  }, [triggerReveal])

  // Static fallback for reduced motion or small screens
  if (prefersReducedMotion || dimensions.width < 420) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg 
          width="400" 
          height="80" 
          viewBox="0 0 400 80" 
          className="opacity-20"
          aria-label="SleeckOS signature"
        >
          <text
            x="200"
            y="40"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white text-4xl font-bold tracking-wider"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
          </text>
        </svg>
        <span className="sr-only">SleeckOS — Learn • Build • Earn</span>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        ref={svgRef}
        className="w-full h-full pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Interactive constellation background"
        role="img"
      >
        {/* Background glow effect when revealed */}
        {isRevealed && (
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}

        {/* Render connections */}
        {connections.map((connection, index) => (
          <motion.line
            key={`connection-${index}`}
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke="rgb(59, 130, 246)"
            strokeWidth="1"
            strokeOpacity={connection.opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
            filter={isRevealed ? "url(#glow)" : undefined}
          />
        ))}

        {/* Render nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.isActive ? "3" : "2"}
            fill="rgb(59, 130, 246)"
            fillOpacity={node.opacity}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: node.id * 0.01 }}
            filter={isRevealed ? "url(#glow)" : undefined}
          />
        ))}
      </svg>

      {/* Reveal button */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={triggerReveal}
          onKeyDown={handleKeyDown}
          disabled={isAnimating || (Date.now() - lastRevealTime < 6000)}
          className="border-primary/30 hover:border-primary/60 bg-background/10 backdrop-blur-sm font-semibold px-6 py-3 pointer-events-auto"
          aria-label="Reveal SleeckOS signature"
          data-testid="button-constellation-reveal"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isAnimating ? 'Revealing...' : 'Reveal Signature'}
        </Button>
      </motion.div>

      {/* Hint text */}
      <AnimatePresence>
        {showHint && !isRevealed && (
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm text-center pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 2 }}
          >
            Hover or press Reveal to discover our signature
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen reader text */}
      <span className="sr-only">SleeckOS — Learn • Build • Earn</span>
    </div>
  )
}