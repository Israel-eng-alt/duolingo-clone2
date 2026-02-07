'use client'

import { useUserStore } from '@/stores/userStore'
import { Flame, Gem, Heart } from 'lucide-react'
import Image from 'next/image'
import { cn, hasPremium } from '@/lib/utils'

export function TopBar() {
  const { user, streak } = useUserStore()

  if (!user) return null

  return (
    <header className="sticky top-0 bg-white z-40 border-b border-duo-gray-200">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        {/* Streak */}
        <div className="flex items-center gap-1">
          <div className="relative">
            <Flame 
              size={28} 
              className={cn(
                streak && streak.currentStreak > 0 ? 'text-duo-orange' : 'text-duo-gray-300'
              )}
              fill={streak && streak.currentStreak > 0 ? '#FF9600' : 'none'}
            />
          </div>
          <span className={cn(
            'font-bold text-lg',
            streak && streak.currentStreak > 0 ? 'text-duo-orange' : 'text-duo-gray-300'
          )}>
            {streak?.currentStreak || 0}
          </span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1">
          <Gem size={26} className="text-duo-blue" fill="#1CB0F6" />
          <span className="font-bold text-lg text-duo-blue">
            {user.gems}
          </span>
        </div>

        {/* Hearts (free tier only) */}
        {!hasPremium(user.subscriptionTier) && (
          <div className="flex items-center gap-1">
            <Heart 
              size={26} 
              className={user.hearts > 0 ? 'text-duo-red' : 'text-duo-gray-300'}
              fill={user.hearts > 0 ? '#FF4B4B' : 'none'}
            />
            <span className={cn(
              'font-bold text-lg',
              user.hearts > 0 ? 'text-duo-red' : 'text-duo-gray-300'
            )}>
              {user.hearts}
            </span>
          </div>
        )}

        {/* Profile avatar */}
        <div className="w-10 h-10 rounded-full bg-duo-gray-200 overflow-hidden border-2 border-duo-gray-300">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.displayName || user.username}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-duo-green text-white font-bold text-lg">
              {(user.displayName || user.username || 'U').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
