'use client'

import { TopBar } from '@/components/navigation/TopBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Target, Zap, Star, Gift, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const dailyQuests = [
  {
    id: 1,
    title: 'Earn 50 XP',
    description: 'Complete lessons to earn XP',
    progress: 25,
    target: 50,
    reward: { type: 'xp', amount: 5 },
    icon: Target,
    color: 'text-duo-blue',
  },
  {
    id: 2,
    title: 'Complete 2 lessons',
    description: 'Finish any lessons',
    progress: 0,
    target: 2,
    reward: { type: 'gems', amount: 5 },
    icon: Star,
    color: 'text-duo-orange',
  },
  {
    id: 3,
    title: 'Practice for 10 minutes',
    description: 'Spend time learning',
    progress: 5,
    target: 10,
    reward: { type: 'xp', amount: 10 },
    icon: Clock,
    color: 'text-duo-green',
  },
]

const weeklyQuests = [
  {
    id: 4,
    title: 'Earn 200 XP',
    description: 'Accumulate XP throughout the week',
    progress: 120,
    target: 200,
    reward: { type: 'gems', amount: 20 },
    icon: Zap,
    color: 'text-duo-purple',
  },
  {
    id: 5,
    title: 'Complete 10 lessons',
    description: 'Finish lessons in any course',
    progress: 3,
    target: 10,
    reward: { type: 'xp', amount: 30 },
    icon: Gift,
    color: 'text-duo-pink',
  },
]

function QuestCard({ quest, index }: { quest: typeof dailyQuests[0]; index: number }) {
  const Icon = quest.icon
  const percentage = Math.min(100, (quest.progress / quest.target) * 100)
  const isComplete = quest.progress >= quest.target

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`${isComplete ? 'bg-green-50 border-green-200' : ''}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-duo bg-duo-gray-100 ${quest.color}`}>
            <Icon size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-duo-gray-800">{quest.title}</h3>
              {isComplete && <span className="text-duo-green font-bold">✓ Complete</span>}
            </div>
            <p className="text-sm text-duo-gray-500 mb-3">{quest.description}</p>
            
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <ProgressBar progress={quest.progress} total={quest.target} variant="green" />
              </div>
              <span className="text-sm font-bold text-duo-gray-600 whitespace-nowrap">
                {quest.progress}/{quest.target}
              </span>
            </div>
            
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-duo-gray-400">Reward:</span>
              <span className="font-bold text-duo-yellow">
                +{quest.reward.amount} {quest.reward.type === 'xp' ? 'XP' : '💎'}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function QuestsPage() {
  return (
    <div className="min-h-screen bg-duo-gray-100 pb-20">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-duo-gray-800 mb-2">Quests</h1>
          <p className="text-duo-gray-500">Complete quests to earn rewards</p>
        </div>

        {/* Monthly badge progress */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-3xl">
              🏆
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-duo-gray-800">February Badge</h3>
              <p className="text-sm text-duo-gray-600">Complete 30 quests this month</p>
              <div className="mt-2">
                <ProgressBar progress={5} total={30} variant="purple" />
                <p className="text-xs text-duo-gray-500 mt-1">5/30 quests completed</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily quests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-duo-gray-800 mb-4">Daily Quests</h2>
          <div className="space-y-4">
            {dailyQuests.map((quest, index) => (
              <QuestCard key={quest.id} quest={quest} index={index} />
            ))}
          </div>
        </div>

        {/* Weekly quests */}
        <div>
          <h2 className="text-xl font-bold text-duo-gray-800 mb-4">Weekly Quests</h2>
          <div className="space-y-4">
            {weeklyQuests.map((quest, index) => (
              <QuestCard key={quest.id} quest={quest} index={index} />
            ))}
          </div>
        </div>

        {/* Reset timer */}
        <p className="text-center text-sm text-duo-gray-400 mt-8">
          Daily quests reset in 12 hours
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
