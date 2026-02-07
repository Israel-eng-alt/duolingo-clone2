'use client'

import { useUserStore } from '@/stores/userStore'
import { TopBar } from '@/components/navigation/TopBar'
import { BottomNav } from '@/components/navigation/BottomNav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, Zap, Clock, Star, Sparkles } from 'lucide-react'
import { cn, hasPremium } from '@/lib/utils'

const shopItems = [
  {
    id: 'streak-freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for one day',
    price: 10,
    icon: Clock,
    color: 'bg-blue-500',
    type: 'powerup',
  },
  {
    id: 'heart-refill',
    name: 'Heart Refill',
    description: 'Fill all your hearts instantly',
    price: 15,
    icon: Heart,
    color: 'bg-duo-red',
    type: 'powerup',
  },
  {
    id: 'xp-boost',
    name: '2x XP Boost',
    description: 'Earn double XP for 15 minutes',
    price: 20,
    icon: Zap,
    color: 'bg-duo-orange',
    type: 'powerup',
  },
  {
    id: 'duo-outfit-1',
    name: 'Super Duo',
    description: 'A cool outfit for Duo',
    price: 100,
    icon: Star,
    color: 'bg-duo-green',
    type: 'outfit',
  },
  {
    id: 'duo-outfit-2',
    name: 'Party Duo',
    description: 'Party time outfit',
    price: 150,
    icon: Sparkles,
    color: 'bg-purple-500',
    type: 'outfit',
  },
]

export default function ShopPage() {
  const { user, removeGems, addHearts, addGems } = useUserStore()

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (!user) return

    if (user.gems < item.price) {
      alert('Not enough gems!')
      return
    }

    const success = removeGems(item.price)
    if (success) {
      // Apply item effect
      switch (item.id) {
        case 'heart-refill':
          addHearts(5)
          break
        case 'streak-freeze':
          // Would update streak freeze count
          break
        // Other items...
      }
      alert(`Purchased ${item.name}!`)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-duo-gray-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-duo-gray-500 mb-4">Please log in to access the shop</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-duo-gray-100 pb-20">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-4 pt-6">
        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-duo-gray-800 mb-2">Shop</h1>
          <p className="text-duo-gray-500">Spend your gems on power-ups and outfits</p>
        </div>

        {/* Gems display */}
        <Card className="mb-6 bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-duo-blue rounded-full flex items-center justify-center text-2xl">
                💎
              </div>
              <div>
                <p className="font-bold text-duo-gray-800">Your Gems</p>
                <p className="text-2xl font-bold text-duo-blue">{user.gems}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Get More
            </Button>
          </div>
        </Card>

        {/* Power-ups section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-duo-gray-800 mb-4">Power-ups</h2>
          <div className="grid grid-cols-1 gap-4">
            {shopItems
              .filter((item) => item.type === 'powerup')
              .map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.id} className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${item.color} rounded-duo flex items-center justify-center`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-duo-gray-800">{item.name}</h3>
                      <p className="text-sm text-duo-gray-500">{item.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-duo-blue font-bold">{item.price}</span>
                        <span className="text-duo-blue">💎</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePurchase(item)}
                      size="sm"
                      disabled={user.gems < item.price}
                    >
                      Buy
                    </Button>
                  </Card>
                )
              })}
          </div>
        </div>

        {/* Outfits section */}
        <div>
          <h2 className="text-xl font-bold text-duo-gray-800 mb-4">Outfits</h2>
          <div className="grid grid-cols-1 gap-4">
            {shopItems
              .filter((item) => item.type === 'outfit')
              .map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.id} className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${item.color} rounded-duo flex items-center justify-center`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-duo-gray-800">{item.name}</h3>
                      <p className="text-sm text-duo-gray-500">{item.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-duo-blue font-bold">{item.price}</span>
                        <span className="text-duo-blue">💎</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handlePurchase(item)}
                      size="sm"
                      disabled={user.gems < item.price}
                    >
                      Buy
                    </Button>
                  </Card>
                )
              })}
          </div>
        </div>

        {/* Super Duolingo promo */}
        {!hasPremium(user.subscriptionTier) && (
          <Card className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <div className="text-center">
              <h3 className="font-bold text-purple-800 text-lg mb-2">Want unlimited hearts?</h3>
              <p className="text-purple-600 text-sm mb-4">
                Upgrade to Super Duolingo for unlimited hearts, no ads, and more!
              </p>
              <Button variant="secondary" className="w-full">
                Try Super Free
              </Button>
            </div>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
