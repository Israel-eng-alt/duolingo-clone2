'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, Star, Trophy, Crown } from 'lucide-react'
import { sections, getUnitsBySection, getLessonsByUnit } from '@/data/courseData'
import { BottomNav } from '@/components/navigation/BottomNav'
import { TopBar } from '@/components/navigation/TopBar'
import { Button } from '@/components/ui/Button'
import type { Unit, Lesson } from '@/types'

function LessonNode({ 
  lesson, 
  isLocked, 
  isCompleted, 
  isLegendary 
}: { 
  lesson: Lesson
  isLocked: boolean
  isCompleted: boolean
  isLegendary: boolean
}) {
  return (
    <Link
      href={isLocked ? '#' : `/lesson/${lesson.id}`}
      className={`relative flex flex-col items-center ${isLocked ? 'pointer-events-none opacity-50' : ''}`}
    >
      <motion.div
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4
          ${isCompleted 
            ? 'bg-duo-yellow border-yellow-400' 
            : isLegendary
            ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-400'
            : 'bg-duo-green border-duo-green-dark'}
        `}
      >
        {isCompleted ? (
          <Crown size={28} className="text-yellow-700" fill="#B45309" />
        ) : isLegendary ? (
          <Star size={28} className="text-yellow-100" fill="white" />
        ) : (
          <Star size={28} className="text-white" fill="white" />
        )}
      </motion.div>
      
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-duo-gray-400/80 flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
        </div>
      )}
      
      <span className="mt-2 text-sm font-bold text-duo-gray-700">
        {lesson.title}
      </span>
    </Link>
  )
}

function UnitCard({ 
  unit, 
  isLocked, 
  progress 
}: { 
  unit: Unit
  isLocked: boolean
  progress: { completed: number; total: number }
}) {
  const lessons = getLessonsByUnit(unit.id)
  
  return (
    <div className={`mb-8 ${isLocked ? 'opacity-60' : ''}`}>
      {/* Unit header */}
      <div className="bg-duo-green rounded-duo p-4 mb-4 shadow-lg">
        <h3 className="text-white font-bold text-lg">{unit.title}</h3>
        <p className="text-white/80 text-sm">{unit.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%` }}
            />
          </div>
          <span className="text-white text-sm font-semibold">
            {progress.completed}/{progress.total}
          </span>
        </div>
      </div>

      {/* Lessons path */}
      <div className="flex flex-wrap justify-center gap-8">
        {lessons.map((lesson, index) => (
          <div 
            key={lesson.id} 
            className={index % 2 === 0 ? 'mr-8' : 'ml-8'}
          >
            <LessonNode
              lesson={lesson}
              isLocked={isLocked || index > progress.completed}
              isCompleted={index < progress.completed}
              isLegendary={lesson.isLegendary}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LearnPage() {
  const [activeSection, setActiveSection] = useState(0)
  const currentSection = sections[activeSection]
  const units = getUnitsBySection(currentSection.id)

  return (
    <div className="min-h-screen bg-duo-gray-100 pb-20">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* Course title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-duo-gray-800">Spanish</h1>
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-duo-orange" />
            <span className="font-bold text-duo-gray-700">SECTION {activeSection + 1}</span>
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(index)}
              className={`
                px-4 py-2 rounded-full font-bold whitespace-nowrap transition-colors
                ${activeSection === index 
                  ? 'bg-duo-green text-white' 
                  : 'bg-white text-duo-gray-500 hover:bg-duo-gray-100'}
              `}
            >
              Section {index + 1}
            </button>
          ))}
        </div>

        {/* Units */}
        <div className="space-y-6">
          {units.map((unit, index) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              isLocked={index > 0} // First unit unlocked for demo
              progress={{ completed: index === 0 ? 0 : 5, total: 5 }}
            />
          ))}
        </div>

        {/* Practice button */}
        <div className="mt-8">
          <Button variant="outline" className="w-full">
            <Trophy size={20} className="mr-2" />
            PRACTICE
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
