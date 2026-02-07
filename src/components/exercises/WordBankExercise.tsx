'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/types'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'

interface WordBankExerciseProps {
  exercise: Exercise
  onAnswer: (answer: string[]) => void
  disabled?: boolean
}

export function WordBankExercise({ exercise, onAnswer, disabled }: WordBankExerciseProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>(
    exercise.questionData.wordBank || []
  )

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (disabled) return

    if (fromAvailable) {
      // Move from available to selected
      setAvailableWords(availableWords.filter((w) => w !== word))
      setSelectedWords([...selectedWords, word])
    } else {
      // Move from selected back to available
      setSelectedWords(selectedWords.filter((w) => w !== word))
      setAvailableWords([...availableWords, word])
    }
  }

  const handleClear = () => {
    setAvailableWords([...availableWords, ...selectedWords])
    setSelectedWords([])
  }

  const handleSubmit = () => {
    if (selectedWords.length > 0) {
      onAnswer(selectedWords)
      setSelectedWords([])
      setAvailableWords(exercise.questionData.wordBank || [])
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="mb-8">
          <p className="text-duo-gray-500 mb-2">Translate this sentence:</p>
          <h2 className="text-2xl font-bold text-duo-gray-800">
            {exercise.questionData.sourceText}
          </h2>
        </div>

        {/* Answer area */}
        <div className="min-h-[80px] bg-duo-gray-100 rounded-duo border-b-4 border-duo-gray-200 p-4 mb-8">
          {selectedWords.length === 0 ? (
            <p className="text-duo-gray-400 text-center py-2">Tap words to build your answer</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {selectedWords.map((word, index) => (
                  <motion.button
                    key={`${word}-${index}`}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => handleWordClick(word, false)}
                    disabled={disabled}
                    className="bg-white border-2 border-duo-gray-300 rounded-duo-sm px-4 py-2 font-semibold text-duo-gray-700 hover:bg-duo-gray-50 transition-colors"
                  >
                    {word}
                  </motion.button>
                ))}
              </AnimatePresence>
              {selectedWords.length > 0 && !disabled && (
                <button
                  onClick={handleClear}
                  className="text-duo-gray-400 hover:text-duo-red transition-colors p-2"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Word bank */}
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {availableWords.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileTap={{ scale: disabled ? 1 : 0.95 }}
                onClick={() => handleWordClick(word, true)}
                disabled={disabled}
                className="bg-white border-b-4 border-duo-gray-200 rounded-duo-sm px-4 py-3 font-bold text-duo-gray-700 hover:bg-duo-gray-50 active:border-b-2 active:translate-y-[2px] transition-all"
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedWords.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="mt-8 pt-6 border-t-2 border-duo-gray-200"
          >
            <Button
              onClick={handleSubmit}
              className="w-full"
              size="lg"
            >
              Check
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
