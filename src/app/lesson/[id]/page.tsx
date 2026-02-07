'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { LessonInterface } from '@/components/LessonInterface'
import { useLessonStore } from '@/stores/lessonStore'
import { useUserStore } from '@/stores/userStore'
import { getLessonExercises } from '@/data/courseData'
import type { Lesson } from '@/types'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { startLesson, currentLesson } = useLessonStore()
  const { user } = useUserStore()
  const lessonId = params.id as string

  useEffect(() => {
    // Check if user has hearts (free tier)
    if (user && user.subscriptionTier === 'free' && user.hearts <= 0) {
      router.push('/learn')
      return
    }

    // Initialize lesson if not already started
    if (!currentLesson) {
      // Create a mock lesson for now
      const mockLesson: Lesson = {
        id: lessonId,
        unitId: 'unit-1-1',
        lessonType: 'standard',
        title: 'Lesson 1',
        orderIndex: 0,
        xpReward: 10,
        isLegendary: false,
        estimatedTime: 3,
      }

      const exercises = getLessonExercises(lessonId)
      
      if (exercises.length === 0) {
        router.push('/learn')
        return
      }

      startLesson(mockLesson, exercises, user?.heartsMax || 5)
    }
  }, [lessonId, currentLesson, startLesson, user, router])

  return <LessonInterface />
}
