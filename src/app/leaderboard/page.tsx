'use client'

import { TopBar } from '@/components/navigation/TopBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { Card } from '@/components/ui/Card'
import { Trophy, Medal, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

const leagueData = {
  currentLeague: 'Bronze',
  rank: 5,
  totalUsers: 30,
  xpThisWeek: 120,
  timeLeft: '2 days, 14 hours',
  users: [
    { rank: 1, name: 'Maria', xp: 450, isYou: false },
    { rank: 2, name: 'John', xp: 380, isYou: false },
    { rank: 3, name: 'Anna', xp: 320, isYou: false },
    { rank: 4, name: 'Carlos', xp: 280, isYou: false },
    { rank: 5, name: 'You', xp: 120, isYou: true },
    { rank: 6, name: 'Sophie', xp: 110, isYou: false },
    { rank: 7, name: 'Luis', xp: 95, isYou: false },
    { rank: 8, name: 'Emma', xp: 80, isYou: false },
  ]
}

const leagueTiers = [
  { name: 'Bronze', color: 'bg-orange-600' },
  { name: 'Silver', color: 'bg-gray-400' },
  { name: 'Gold', color: 'bg-yellow-500' },
  { name: 'Sapphire', color: 'bg-blue-500' },
  { name: 'Ruby', color: 'bg-red-500' },
  { name: 'Emerald', color: 'bg-green-500' },
  { name: 'Amethyst', color: 'bg-purple-500' },
  { name: 'Pearl', color: 'bg-pink-300' },
  { name: 'Obsidian', color: 'bg-gray-800' },
  { name: 'Diamond', color: 'bg-cyan-400' },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-duo-gray-100 pb-20">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* League header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
            <Trophy size={20} className="text-orange-600" />
            <span className="font-bold text-orange-800">{leagueData.currentLeague} League</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-duo-gray-500 text-sm mb-4">
            <span>Top 10 advance to</span>
            <span className="font-bold text-gray-400">{leagueTiers[1].name}</span>
          </div>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-duo-gray-800">#{leagueData.rank}</p>
              <p className="text-xs text-duo-gray-500">Your Rank</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-duo-yellow">{leagueData.xpThisWeek}</p>
              <p className="text-xs text-duo-gray-500">XP This Week</p>
            </div>
          </div>

          <p className="text-sm text-duo-gray-400">
            {leagueData.timeLeft} remaining
          </p>
        </div>

        {/* Leaderboard list */}
        <Card className="mb-6">
          <div className="space-y-3">
            {leagueData.users.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  flex items-center gap-3 p-3 rounded-duo
                  ${user.isYou ? 'bg-blue-50 border-2 border-duo-blue' : 'hover:bg-duo-gray-50'}
                `}
              >
                {/* Rank */}
                <div className="w-8 text-center font-bold text-duo-gray-500">
                  {user.rank <= 3 ? (
                    <span className={`
                      inline-flex items-center justify-center w-8 h-8 rounded-full
                      ${user.rank === 1 ? 'bg-yellow-400 text-yellow-800' : ''}
                      ${user.rank === 2 ? 'bg-gray-300 text-gray-700' : ''}
                      ${user.rank === 3 ? 'bg-orange-400 text-orange-800' : ''}
                    `}>
                      {user.rank}
                    </span>
                  ) : (
                    user.rank
                  )}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-duo-gray-200 flex items-center justify-center font-bold text-duo-gray-500">
                  {user.name.charAt(0)}
                </div>

                {/* Name */}
                <div className="flex-1">
                  <p className={`font-bold ${user.isYou ? 'text-duo-blue' : 'text-duo-gray-800'}`}>
                    {user.name}
                  </p>
                </div>

                {/* XP */}
                <div className="flex items-center gap-1">
                  <span className="font-bold text-duo-yellow">{user.xp}</span>
                  <span className="text-xs text-duo-gray-400">XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* League tiers */}
        <Card>
          <h3 className="font-bold text-duo-gray-800 mb-4">League Tiers</h3>
          <div className="flex flex-wrap gap-2">
            {leagueTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold
                  ${tier.name === leagueData.currentLeague 
                    ? 'bg-orange-100 text-orange-800 ring-2 ring-orange-400' 
                    : 'bg-duo-gray-100 text-duo-gray-500'}
                `}
              >
                <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                {tier.name}
              </div>
            ))}
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
