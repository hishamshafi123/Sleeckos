import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Courses from "@/components/Courses"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Courses />
      </main>
      <Footer />
    </div>
  )
}