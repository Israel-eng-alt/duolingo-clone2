import LessonPageClient from './LessonPageClient'

// Generate static params for all lesson IDs
export function generateStaticParams() {
  // Generate lesson IDs for unit 1-1 (Basics 1)
  const unit1Lessons = [
    'lesson-1-1-1',
    'lesson-1-1-2',
    'lesson-1-1-3',
    'lesson-1-1-4',
    'lesson-1-1-5',
  ]
  
  // Generate additional lesson IDs for other units (sections 2 and 3)
  const additionalLessons = [
    // Section 2 - Greetings
    'lesson-2-1-1', 'lesson-2-1-2', 'lesson-2-1-3', 'lesson-2-1-4', 'lesson-2-1-5',
    'lesson-2-2-1', 'lesson-2-2-2', 'lesson-2-2-3', 'lesson-2-2-4', 'lesson-2-2-5',
    // Section 3 - Travel
    'lesson-3-1-1', 'lesson-3-1-2', 'lesson-3-1-3', 'lesson-3-1-4', 'lesson-3-1-5',
  ]
  
  const allLessonIds = [...unit1Lessons, ...additionalLessons]
  
  return allLessonIds.map((id) => ({
    id: id,
  }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params
  return <LessonPageClient lessonId={id} />
}
