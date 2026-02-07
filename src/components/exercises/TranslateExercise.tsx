'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/types'
import { Button } from '@/components/ui/Button'

interface TranslateExerciseProps {
  exercise: Exercise
  onAnswer: (answer: string) => void
  disabled?: boolean
  direction: 'to_target' | 'to_source'
}

export function TranslateExercise({ exercise, onAnswer, disabled, direction }: TranslateExerciseProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue.trim())
      setInputValue('')
    }
  }

  const textToTranslate = direction === 'to_target' 
    ? exercise.questionData.sourceText 
    : exercise.questionData.targetText

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <p className="text-duo-gray-500 mb-2">
          {direction === 'to_target' ? 'Translate to Spanish:' : 'Translate to English:'}
        </p>
        <h2 className="text-2xl font-bold text-duo-gray-800 mb-8">
          {textToTranslate}
        </h2>

        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
            placeholder="Type your answer..."
            className="w-full p-4 text-lg border-2 border-duo-gray-200 rounded-duo focus:border-duo-blue focus:outline-none transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                handleSubmit()
              }
            }}
          />
        </div>

        {exercise.hint && (
          <p className="mt-4 text-sm text-duo-gray-400">
            💡 Hint: {exercise.hint}
          </p>
        )}
      </div>

      <AnimatePresence>
        {inputValue.trim() && (
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
