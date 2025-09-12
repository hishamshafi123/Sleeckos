import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Courses from "@/components/Courses"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Courses />
        </main>
        <Footer />
      </div>
    </div>
  )
}