'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/types'
import { Button } from '@/components/ui/Button'

interface FillBlankExerciseProps {
  exercise: Exercise
  onAnswer: (answer: string) => void
  disabled?: boolean
}

export function FillBlankExercise({ exercise, onAnswer, disabled }: FillBlankExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const options = exercise.questionData.options || []

  const handleSelect = (optionId: string) => {
    if (disabled) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption)
      setSelectedOption(null)
    }
  }

  // Replace blank with underscore or input indicator
  const questionText = exercise.questionData.question || ''

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-duo-gray-800 mb-8">
          Complete the sentence:
        </h2>

        <div className="bg-duo-gray-100 rounded-duo p-6 mb-8">
          <p className="text-xl text-duo-gray-800">
            {questionText.split('___').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="inline-block min-w-[80px] border-b-4 border-duo-gray-400 mx-1 text-center font-bold text-duo-blue">
                    {selectedOption 
                      ? options.find(o => o.id === selectedOption)?.text 
                      : '?'}
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={disabled}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              className={cn(
                'p-4 rounded-duo border-2 text-left font-semibold text-lg transition-all duration-200',
                selectedOption === option.id
                  ? 'border-duo-blue bg-blue-50 text-duo-blue'
                  : 'border-duo-gray-200 hover:border-duo-gray-300 bg-white text-duo-gray-700'
              )}
            >
              {option.text}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedOption && (
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
