import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider"
import logoImage from "@assets/generated_images/SleeckOS_company_logo_20fb78d8.png"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={logoImage} 
            alt="SleeckOS Logo" 
            className="h-8 w-auto filter brightness-0 invert"
            data-testid="img-logo"
          />
          <span className="text-xl font-bold text-foreground" data-testid="text-brand">SleeckOS</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#home" 
            className="text-foreground hover:text-primary transition-colors duration-300"
            data-testid="link-home"
          >
            Home
          </a>
          <a 
            href="#about" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            data-testid="link-about"
          >
            About
          </a>
          <a 
            href="#courses" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            data-testid="link-courses"
          >
            Courses
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover-elevate"
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="hidden md:inline-flex hover-elevate"
            data-testid="button-get-started"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}