'use client'

import { useUserStore } from '@/stores/userStore'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { TopBar } from '@/components/navigation/TopBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { Settings, Award, BookOpen, Flame, Edit3, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const { user, logout } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-duo-gray-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-duo-gray-500 mb-4">Not logged in</p>
          <Button>Log In</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-duo-gray-100 pb-20">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-duo-green flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
            {(user.displayName || user.username || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-duo-gray-800">
              {user.displayName || user.username}
            </h1>
            <p className="text-duo-gray-500">@{user.username}</p>
            <p className="text-sm text-duo-gray-400 mt-1">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-duo-gray-200 rounded-full transition-colors"
          >
            <Edit3 size={20} className="text-duo-gray-400" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="text-center p-4">
            <Flame size={24} className="mx-auto mb-2 text-duo-orange" />
            <p className="text-2xl font-bold text-duo-gray-800">0</p>
            <p className="text-sm text-duo-gray-500">Day Streak</p>
          </Card>
          <Card className="text-center p-4">
            <Award size={24} className="mx-auto mb-2 text-duo-yellow" />
            <p className="text-2xl font-bold text-duo-gray-800">{user.totalXp}</p>
            <p className="text-sm text-duo-gray-500">Total XP</p>
          </Card>
        </div>

        {/* Languages */}
        <Card className="mb-6">
          <h3 className="font-bold text-duo-gray-800 mb-4 flex items-center gap-2">
            <BookOpen size={20} />
            Languages
          </h3>
          <div className="flex items-center gap-3 p-3 bg-duo-gray-100 rounded-duo">
            <div className="w-12 h-12 rounded-full bg-duo-orange flex items-center justify-center text-white font-bold">
              ES
            </div>
            <div className="flex-1">
              <p className="font-bold text-duo-gray-800">Spanish</p>
              <p className="text-sm text-duo-gray-500">Level 1 • 0/100 XP</p>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="mb-6">
          <h3 className="font-bold text-duo-gray-800 mb-4 flex items-center gap-2">
            <Award size={20} />
            Achievements
          </h3>
          <div className="text-center py-8 text-duo-gray-400">
            <p>No achievements yet</p>
            <p className="text-sm">Complete lessons to earn badges!</p>
          </div>
        </Card>

        {/* Settings */}
        <Card className="mb-6">
          <h3 className="font-bold text-duo-gray-800 mb-4 flex items-center gap-2">
            <Settings size={20} />
            Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-duo-gray-700">Sound Effects</span>
              <button className="w-12 h-6 bg-duo-green rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-duo-gray-700">Listening Exercises</span>
              <button className="w-12 h-6 bg-duo-green rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-duo-gray-700">Daily Goal</span>
              <span className="text-duo-blue font-bold">{user.dailyGoalXp} XP</span>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full text-duo-red border-duo-red hover:bg-red-50"
          onClick={logout}
        >
          <LogOut size={20} className="mr-2" />
          Log Out
        </Button>
      </main>

      <BottomNav />
    </div>
  )
}
