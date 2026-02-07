'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import type { Exercise } from '@/types'
import { Button } from '@/components/ui/Button'

interface ListenAndTypeExerciseProps {
  exercise: Exercise
  onAnswer: (answer: string) => void
  disabled?: boolean
}

export function ListenAndTypeExercise({ exercise, onAnswer, disabled }: ListenAndTypeExerciseProps) {
  const [inputValue, setInputValue] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (disabled) return
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000)
    
    // In a real app, you would play the audio here
    // const audio = new Audio(exercise.questionData.audioUrl)
    // audio.play()
  }

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-duo-gray-800 mb-4">
          Type what you hear
        </h2>

        {/* Audio button */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={handlePlay}
            disabled={disabled || isPlaying}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className="w-24 h-24 rounded-full bg-duo-blue text-white flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
          >
            <motion.div
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
                transition: { repeat: Infinity, duration: 0.5 }
              } : {}}
            >
              <Volume2 size={40} />
            </motion.div>
          </motion.button>
        </div>

        <p className="text-center text-duo-gray-400 mb-8">
          {isPlaying ? 'Playing...' : 'Click to play audio'}
        </p>

        {/* Input area */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
            placeholder="Type what you hear..."
            className="w-full p-4 text-lg border-2 border-duo-gray-200 rounded-duo focus:border-duo-blue focus:outline-none transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                handleSubmit()
              }
            }}
          />
        </div>

        {/* Turtle button for slow audio */}
        <button
          onClick={() => {
            // Play at 0.75x speed
            handlePlay()
          }}
          disabled={disabled || isPlaying}
          className="mt-4 text-duo-gray-400 hover:text-duo-gray-600 text-sm flex items-center gap-2"
        >
          🐢 Play slow
        </button>
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
