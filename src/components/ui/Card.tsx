import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      bordered: 'bg-white border-2 border-duo-gray-200',
      elevated: 'bg-white shadow-card',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-duo p-6',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

export { Card }
