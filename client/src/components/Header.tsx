import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider"
import { motion } from "framer-motion"
import logoImage from "@assets/generated_images/SleeckOS_company_logo_20fb78d8.png"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.header 
      className="fixed top-0 w-full z-50 border-b border-primary/20 bg-background/95 backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.img 
            src={logoImage} 
            alt="SleeckOS Logo" 
            className="h-10 w-auto filter brightness-0 invert drop-shadow-sm"
            data-testid="img-logo"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6 }}
          />
          <span className="text-2xl font-bold text-foreground tracking-tight" data-testid="text-brand">
            Sleeck<span className="text-primary">OS</span>
          </span>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[{ href: "#home", label: "Home" }, { href: "#about", label: "About" }, { href: "#courses", label: "Courses" }].map((link, index) => (
            <motion.a 
              key={link.href}
              href={link.href} 
              className="relative text-muted-foreground hover:text-foreground transition-all duration-500 font-medium tracking-wide"
              data-testid={`link-${link.label.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover-elevate relative overflow-hidden"
              data-testid="button-theme-toggle"
            >
              <motion.div
                key={theme}
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.div>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="hidden md:inline-flex hover-elevate border-primary/30 hover:border-primary/60 bg-background/50 backdrop-blur-sm font-medium tracking-wide"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}