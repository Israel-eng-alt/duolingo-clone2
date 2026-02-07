'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart3, User, Trophy, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/learn', icon: Home, label: 'Learn' },
  { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/quests', icon: BarChart3, label: 'Quests' },
  { href: '/shop', icon: ShoppingBag, label: 'Shop' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-duo-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-16 h-full transition-colors',
                isActive ? 'text-duo-green' : 'text-duo-gray-400 hover:text-duo-gray-600'
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1 font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
