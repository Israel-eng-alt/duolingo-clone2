'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, shuffleArray } from '@/lib/utils'
import type { Exercise, Pair } from '@/types'
import { Button } from '@/components/ui/Button'

interface MatchPairsExerciseProps {
  exercise: Exercise
  onAnswer: (answer: string[]) => void
  disabled?: boolean
}

export function MatchPairsExercise({ exercise, onAnswer, disabled }: MatchPairsExerciseProps) {
  const pairs = exercise.questionData.pairs || []
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([])
  const [shuffledLeft] = useState(() => shuffleArray(pairs.map((p) => p.left)))
  const [shuffledRight] = useState(() => shuffleArray(pairs.map((p) => p.right)))

  const handleLeftClick = (value: string) => {
    if (disabled || matchedPairs.includes(value)) return
    setSelectedLeft(value)
  }

  const handleRightClick = (value: string) => {
    if (disabled || matchedPairs.includes(value)) return
    setSelectedRight(value)

    if (selectedLeft) {
      // Check if this forms a correct pair
      const correctPair = pairs.find(
        (p) => p.left === selectedLeft && p.right === value
      )

      if (correctPair) {
        setMatchedPairs([...matchedPairs, selectedLeft, value])
        
        // Check if all pairs are matched
        const newMatched = [...matchedPairs, selectedLeft, value]
        if (newMatched.length === pairs.length * 2) {
          // All matched - submit
          setTimeout(() => {
            onAnswer(pairs.map((p) => p.id))
            setMatchedPairs([])
            setSelectedLeft(null)
            setSelectedRight(null)
          }, 500)
        }
      }

      setSelectedLeft(null)
      setSelectedRight(null)
    }
  }

  const isMatched = (value: string) => matchedPairs.includes(value)
  const isSelected = (value: string, side: 'left' | 'right') => {
    if (side === 'left') return selectedLeft === value
    return selectedRight === value
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-duo-gray-800 mb-8">
          Match the pairs
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-3">
            {shuffledLeft.map((word, index) => (
              <motion.button
                key={`left-${index}`}
                onClick={() => handleLeftClick(word)}
                disabled={disabled || isMatched(word)}
                whileTap={{ scale: disabled || isMatched(word) ? 1 : 0.95 }}
                className={cn(
                  'w-full p-4 rounded-duo border-2 font-semibold text-lg transition-all duration-200',
                  isMatched(word)
                    ? 'bg-duo-green text-white border-duo-green cursor-default'
                    : isSelected(word, 'left')
                    ? 'bg-duo-blue text-white border-duo-blue'
                    : 'bg-white border-duo-gray-200 hover:border-duo-gray-300 text-duo-gray-700'
                )}
              >
                {word}
              </motion.button>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-3">
            {shuffledRight.map((word, index) => (
              <motion.button
                key={`right-${index}`}
                onClick={() => handleRightClick(word)}
                disabled={disabled || isMatched(word)}
                whileTap={{ scale: disabled || isMatched(word) ? 1 : 0.95 }}
                className={cn(
                  'w-full p-4 rounded-duo border-2 font-semibold text-lg transition-all duration-200',
                  isMatched(word)
                    ? 'bg-duo-green text-white border-duo-green cursor-default'
                    : isSelected(word, 'right')
                    ? 'bg-duo-blue text-white border-duo-blue'
                    : 'bg-white border-duo-gray-200 hover:border-duo-gray-300 text-duo-gray-700'
                )}
              >
                {word}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t-2 border-duo-gray-200">
        <p className="text-center text-duo-gray-500">
          Matched: {matchedPairs.length / 2} / {pairs.length} pairs
        </p>
      </div>
    </div>
  )
}
