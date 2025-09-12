import CourseCard from '../CourseCard'
import { Code2 } from 'lucide-react'

export default function CourseCardExample() {
  return (
    <div className="w-96">
      <CourseCard
        title="Advanced OS Development"
        description="Deep dive into modern operating system design principles, kernel development, and system programming with hands-on projects."
        duration="12 weeks"
        students={1250}
        rating={4.8}
        level="Advanced"
        tags={["C/C++", "Kernel", "Systems"]}
        icon={Code2}
        onEnroll={() => console.log('Enroll clicked for Advanced OS Development')}
      />
    </div>
  )
}