'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TopBar } from '@/components/navigation/TopBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { BookOpen, Sparkles, Target } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserStore()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen bg-duo-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-duo-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-duo-gray-100 pb-20">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-duo-gray-800 mb-2">
            {user.displayName ? `Hi ${user.displayName}!` : 'Welcome!'}
          </h1>
          <p className="text-duo-gray-500">Ready to learn something new today?</p>
        </div>

        {/* Daily goal card */}
        <Card className="mb-6 bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
              <Target size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-duo-gray-800">Daily Goal</h3>
              <p className="text-sm text-duo-gray-600">
                {user.dailyGoalXp || 10} XP per day
              </p>
              <div className="mt-2 h-2 bg-white/50 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-orange-500 rounded-full" />
              </div>
            </div>
          </div>
        </Card>

        {/* Continue learning card */}
        <Card className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-duo-green rounded-full flex items-center justify-center">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-duo-gray-800">Continue Learning</h3>
              <p className="text-sm text-duo-gray-600">Spanish - Basics 1</p>
            </div>
            <Link href="/learn">
              <Button>Resume</Button>
            </Link>
          </div>
        </Card>

        {/* Super Duolingo promo */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <Sparkles size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-duo-gray-800">Super Duolingo</h3>
              <p className="text-sm text-duo-gray-600">
                Unlimited hearts, no ads, and more!
              </p>
            </div>
            <Button variant="secondary" size="sm">
              Try Free
            </Button>
          </div>
        </Card>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-duo-green">{user.totalXp}</p>
            <p className="text-xs text-duo-gray-500">Total XP</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-duo-orange">0</p>
            <p className="text-xs text-duo-gray-500">Day Streak</p>
          </Card>
          <Card className="text-center p-4">
            <p className="text-2xl font-bold text-duo-blue">{user.gems}</p>
            <p className="text-xs text-duo-gray-500">Gems</p>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
