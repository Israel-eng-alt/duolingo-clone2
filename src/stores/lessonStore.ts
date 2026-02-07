import { create } from 'zustand'
import type { Exercise, Lesson } from '@/types'

interface LessonSession {
  lessonId: string
  exercises: Exercise[]
  currentExerciseIndex: number
  correctCount: number
  incorrectCount: number
  heartsRemaining: number
  xpEarned: number
  startTime: Date
  answers: Map<string, string | string[]>
}

interface LessonState {
  currentLesson: Lesson | null
  session: LessonSession | null
  isLoading: boolean
  error: string | null
  
  // Actions
  startLesson: (lesson: Lesson, exercises: Exercise[], maxHearts: number) => void
  submitAnswer: (exerciseId: string, answer: string | string[]) => { correct: boolean; correctAnswer: string | string[] | undefined }
  nextExercise: () => boolean
  completeLesson: () => { xpEarned: number; accuracy: number; isPerfect: boolean }
  resetLesson: () => void
  setError: (error: string | null) => void
}

export const useLessonStore = create<LessonState>((set, get) => ({
  currentLesson: null,
  session: null,
  isLoading: false,
  error: null,

  startLesson: (lesson, exercises, maxHearts) => {
    set({
      currentLesson: lesson,
      session: {
        lessonId: lesson.id,
        exercises,
        currentExerciseIndex: 0,
        correctCount: 0,
        incorrectCount: 0,
        heartsRemaining: maxHearts,
        xpEarned: 0,
        startTime: new Date(),
        answers: new Map(),
      },
      error: null,
    })
  },

  submitAnswer: (exerciseId, answer) => {
    const { session } = get()
    if (!session) throw new Error('No active session')

    const exercise = session.exercises[session.currentExerciseIndex]
    if (!exercise) throw new Error('Exercise not found')

    let isCorrect = false
    const correctAnswer = exercise.answerData.correctAnswer

    // Check answer based on exercise type
    if (correctAnswer) {
      if (Array.isArray(correctAnswer)) {
        if (Array.isArray(answer)) {
          isCorrect = JSON.stringify(answer) === JSON.stringify(correctAnswer)
        } else {
          isCorrect = correctAnswer.includes(answer)
        }
      } else {
        if (Array.isArray(answer)) {
          isCorrect = answer.includes(correctAnswer)
        } else {
          isCorrect = answer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
        }
      }
    }

    // Also check acceptable answers if provided
    if (!isCorrect && exercise.answerData.acceptableAnswers) {
      const acceptable = exercise.answerData.acceptableAnswers
      if (Array.isArray(acceptable)) {
        isCorrect = acceptable.some(a => a.toLowerCase().trim() === (Array.isArray(answer) ? answer[0] : answer).toLowerCase().trim())
      }
    }

    // Update session
    const newAnswers = new Map(session.answers)
    newAnswers.set(exerciseId, answer)

    set({
      session: {
        ...session,
        correctCount: isCorrect ? session.correctCount + 1 : session.correctCount,
        incorrectCount: isCorrect ? session.incorrectCount : session.incorrectCount + 1,
        heartsRemaining: isCorrect ? session.heartsRemaining : session.heartsRemaining - 1,
        answers: newAnswers,
      },
    })

    return { correct: isCorrect, correctAnswer }
  },

  nextExercise: () => {
    const { session } = get()
    if (!session) return false

    const hasMoreExercises = session.currentExerciseIndex < session.exercises.length - 1
    
    if (hasMoreExercises) {
      set({
        session: {
          ...session,
          currentExerciseIndex: session.currentExerciseIndex + 1,
        },
      })
      return true
    }
    
    return false
  },

  completeLesson: () => {
    const { session, currentLesson } = get()
    if (!session || !currentLesson) {
      throw new Error('No active session or lesson')
    }

    const totalExercises = session.exercises.length
    const accuracy = Math.round((session.correctCount / totalExercises) * 100)
    const isPerfect = session.incorrectCount === 0
    
    // Calculate XP
    let xpEarned = currentLesson.xpReward
    if (isPerfect) {
      xpEarned += 5 // Perfect bonus
    }
    
    const timeSpent = Math.floor((new Date().getTime() - session.startTime.getTime()) / 1000)

    return { xpEarned, accuracy, isPerfect }
  },

  resetLesson: () => {
    set({
      currentLesson: null,
      session: null,
      error: null,
    })
  },

  setError: (error) => set({ error }),
}))
