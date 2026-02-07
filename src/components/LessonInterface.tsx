'use client'

import { useLessonStore } from '@/stores/lessonStore'
import { useUserStore } from '@/stores/userStore'
import { MultipleChoiceExercise } from './exercises/MultipleChoiceExercise'
import { WordBankExercise } from './exercises/WordBankExercise'
import { TranslateExercise } from './exercises/TranslateExercise'
import { MatchPairsExercise } from './exercises/MatchPairsExercise'
import { FillBlankExercise } from './exercises/FillBlankExercise'
import { ListenAndTypeExercise } from './exercises/ListenAndTypeExercise'
import { ProgressBar } from './ui/ProgressBar'
import { Button } from './ui/Button'
import { X, Heart, Volume2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function LessonInterface() {
  const router = useRouter()
  const { session, currentLesson, submitAnswer, nextExercise, completeLesson, resetLesson } = useLessonStore()
  const { user, removeHearts, addXp, addGems } = useUserStore()
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [correctAnswer, setCorrectAnswer] = useState<string | string[] | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [lessonResults, setLessonResults] = useState<{ xpEarned: number; accuracy: number; isPerfect: boolean } | null>(null)

  if (!session || !currentLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-duo-gray-500">No active lesson</p>
          <Button onClick={() => router.push('/learn')} className="mt-4">
            Go to Learn
          </Button>
        </div>
      </div>
    )
  }

  const currentExercise = session.exercises[session.currentExerciseIndex]
  const progress = session.currentExerciseIndex + 1
  const total = session.exercises.length

  const handleAnswer = (answer: string | string[]) => {
    const result = submitAnswer(currentExercise.id, answer)
    setFeedback(result.correct ? 'correct' : 'incorrect')
    setCorrectAnswer(result.correctAnswer ?? null)

    if (!result.correct) {
      removeHearts(1)
    }
  }

  const handleContinue = () => {
    if (feedback === 'correct') {
      setFeedback(null)
      setCorrectAnswer(null)
      
      const hasMore = nextExercise()
      if (!hasMore) {
        // Lesson complete
        const results = completeLesson()
        setLessonResults(results)
        setShowResults(true)
        
        // Update user stats
        addXp(results.xpEarned)
        if (results.isPerfect) {
          addGems(2)
        } else {
          addGems(1)
        }
      }
    } else {
      // Wrong answer - continue to next or end if out of hearts
      setFeedback(null)
      setCorrectAnswer(null)
      
      if (session.heartsRemaining <= 0 && user?.subscriptionTier === 'free') {
        // Out of hearts - end lesson
        const results = completeLesson()
        setLessonResults(results)
        setShowResults(true)
      } else {
        const hasMore = nextExercise()
        if (!hasMore) {
          const results = completeLesson()
          setLessonResults(results)
          setShowResults(true)
          
          addXp(results.xpEarned)
          if (results.isPerfect) {
            addGems(2)
          } else {
            addGems(1)
          }
        }
      }
    }
  }

  const handleExit = () => {
    resetLesson()
    router.push('/learn')
  }

  const renderExercise = () => {
    const props = {
      exercise: currentExercise,
      onAnswer: handleAnswer,
      disabled: feedback !== null,
    }

    switch (currentExercise.exerciseType) {
      case 'multiple_choice':
        return <MultipleChoiceExercise {...props} />
      case 'word_bank':
        return <WordBankExercise {...props} onAnswer={(answer) => handleAnswer(answer)} />
      case 'translate_to_target':
        return <TranslateExercise {...props} direction="to_target" />
      case 'translate_to_source':
        return <TranslateExercise {...props} direction="to_source" />
      case 'match_pairs':
        return <MatchPairsExercise {...props} onAnswer={(answer) => handleAnswer(answer)} />
      case 'fill_blank':
        return <FillBlankExercise {...props} />
      case 'listen_and_type':
        return <ListenAndTypeExercise {...props} />
      default:
        return <div>Exercise type not implemented: {currentExercise.exerciseType}</div>
    }
  }

  if (showResults && lessonResults) {
    return (
      <div className="min-h-screen bg-duo-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-duo-lg p-8 max-w-md w-full text-center shadow-xl"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-duo-gray-800 mb-2">Lesson Complete!</h2>
          
          <div className="mt-6 space-y-4">
            <div className="bg-yellow-50 rounded-duo p-4">
              <p className="text-duo-gray-500 text-sm">XP Earned</p>
              <p className="text-3xl font-bold text-duo-yellow">+{lessonResults.xpEarned}</p>
            </div>
            
            <div className="bg-blue-50 rounded-duo p-4">
              <p className="text-duo-gray-500 text-sm">Accuracy</p>
              <p className="text-2xl font-bold text-duo-blue">{lessonResults.accuracy}%</p>
            </div>

            {lessonResults.isPerfect && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-50 rounded-duo p-4"
              >
                <p className="text-duo-gray-500 text-sm">Perfect Lesson Bonus!</p>
                <p className="text-xl font-bold text-duo-green">+2 💎</p>
              </motion.div>
            )}
          </div>

          <Button onClick={handleExit} className="w-full mt-8" size="lg">
            Continue
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-duo-gray-200">
        <button
          onClick={handleExit}
          className="p-2 hover:bg-duo-gray-100 rounded-full transition-colors"
        >
          <X size={24} className="text-duo-gray-400" />
        </button>

        <div className="flex-1 mx-4">
          <ProgressBar progress={progress} total={total} />
        </div>

        <div className="flex items-center gap-4">
          {user?.subscriptionTier === 'free' && (
            <div className="flex items-center gap-1 text-duo-red">
              <Heart size={24} fill="#FF4B4B" />
              <span className="font-bold">{session.heartsRemaining}</span>
            </div>
          )}
          <button className="p-2 hover:bg-duo-gray-100 rounded-full transition-colors">
            <Volume2 size={24} className="text-duo-blue" />
          </button>
        </div>
      </header>

      {/* Exercise content */}
      <main className="flex-1 p-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExercise.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderExercise()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className={cn(
              'fixed bottom-0 left-0 right-0 p-6 border-t-4',
              feedback === 'correct' 
                ? 'bg-green-50 border-duo-green' 
                : 'bg-red-50 border-duo-red'
            )}
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={cn(
                    'text-xl font-bold',
                    feedback === 'correct' ? 'text-duo-green' : 'text-duo-red'
                  )}>
                    {feedback === 'correct' ? '🎉 Excellent!' : '❌ Incorrect'}
                  </h3>
                  {feedback === 'incorrect' && correctAnswer && (
                    <p className="text-duo-gray-600 mt-1">
                      Correct answer: <span className="font-semibold">
                        {Array.isArray(correctAnswer) ? correctAnswer.join(' ') : correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
                <Button onClick={handleContinue} variant={feedback === 'correct' ? 'primary' : 'danger'}>
                  Continue
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
