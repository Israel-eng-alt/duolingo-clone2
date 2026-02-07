import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserStreak, UserCourse, UserUnitProgress, XpHistory } from '@/types'

interface UserState {
  user: User | null
  streak: UserStreak | null
  currentCourse: UserCourse | null
  unitProgress: UserUnitProgress[]
  xpHistory: XpHistory[]
  
  // Actions
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  setStreak: (streak: UserStreak | null) => void
  setCurrentCourse: (course: UserCourse | null) => void
  updateUnitProgress: (progress: UserUnitProgress) => void
  addXpHistory: (entry: XpHistory) => void
  addGems: (amount: number) => void
  removeGems: (amount: number) => boolean
  addHearts: (amount: number) => void
  removeHearts: (amount: number) => boolean
  addXp: (amount: number) => void
  logout: () => void
}

const defaultUser: User = {
  id: '',
  email: '',
  username: '',
  displayName: '',
  nativeLanguage: 'en',
  dailyGoalXp: 10,
  soundEffects: true,
  speakingEnabled: true,
  listeningEnabled: true,
  timezone: 'UTC',
  totalXp: 0,
  gems: 500,
  hearts: 5,
  heartsMax: 5,
  subscriptionTier: 'free',
  isVerified: false,
  createdAt: new Date(),
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      streak: null,
      currentCourse: null,
      unitProgress: [],
      xpHistory: [],

      setUser: (user) => set({ user }),
      
      updateUser: (updates) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...updates, updatedAt: new Date() } })
        }
      },

      setStreak: (streak) => set({ streak }),

      setCurrentCourse: (course) => set({ currentCourse: course }),

      updateUnitProgress: (progress) => {
        const { unitProgress } = get()
        const existingIndex = unitProgress.findIndex(
          (p) => p.unitId === progress.unitId
        )
        
        if (existingIndex >= 0) {
          const updated = [...unitProgress]
          updated[existingIndex] = progress
          set({ unitProgress: updated })
        } else {
          set({ unitProgress: [...unitProgress, progress] })
        }
      },

      addXpHistory: (entry) => {
        const { xpHistory } = get()
        set({ xpHistory: [entry, ...xpHistory] })
      },

      addGems: (amount) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, gems: user.gems + amount } })
        }
      },

      removeGems: (amount) => {
        const { user } = get()
        if (!user || user.gems < amount) return false
        set({ user: { ...user, gems: user.gems - amount } })
        return true
      },

      addHearts: (amount) => {
        const { user } = get()
        if (user) {
          const newHearts = Math.min(user.hearts + amount, user.heartsMax)
          set({ user: { ...user, hearts: newHearts } })
        }
      },

      removeHearts: (amount) => {
        const { user } = get()
        if (!user) return false
        
        // Premium users have unlimited hearts
        if (user.subscriptionTier !== 'free') return true
        
        if (user.hearts < amount) return false
        set({ user: { ...user, hearts: user.hearts - amount } })
        return true
      },

      addXp: (amount) => {
        const { user, streak } = get()
        if (user) {
          set({ user: { ...user, totalXp: user.totalXp + amount } })
          
          // Update streak if exists
          if (streak) {
            const today = new Date().toDateString()
            const lastActivity = streak.lastActivity?.toDateString()
            
            if (lastActivity !== today) {
              set({
                streak: {
                  ...streak,
                  currentStreak: streak.currentStreak + 1,
                  longestStreak: Math.max(streak.longestStreak, streak.currentStreak + 1),
                  lastActivity: new Date(),
                },
              })
            }
          }
        }
      },

      logout: () => {
        set({
          user: null,
          streak: null,
          currentCourse: null,
          unitProgress: [],
          xpHistory: [],
        })
      },
    }),
    {
      name: 'duolingo-user-storage',
    }
  )
)
