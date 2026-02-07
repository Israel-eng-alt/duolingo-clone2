'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  total: number
  className?: string
  showPercentage?: boolean
  variant?: 'green' | 'blue' | 'orange' | 'purple'
}

export function ProgressBar({
  progress,
  total,
  className,
  showPercentage = false,
  variant = 'green',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100))
  
  const variantStyles = {
    green: 'bg-duo-green',
    blue: 'bg-duo-blue',
    orange: 'bg-duo-orange',
    purple: 'bg-duo-purple',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-4 bg-duo-gray-200 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500 ease-out', variantStyles[variant])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showPercentage && (
          <span className="text-sm font-bold text-duo-gray-500 min-w-[3rem] text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  )
}

// Segmented progress bar (for lesson progress)
interface SegmentedProgressBarProps {
  total: number
  current: number
  className?: string
}

export function SegmentedProgressBar({ total, current, className }: SegmentedProgressBarProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex-1 h-2 rounded-full transition-all duration-300',
            index < current ? 'bg-duo-green' : 'bg-duo-gray-200'
          )}
        />
      ))}
    </div>
  )
}
