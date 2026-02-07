import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-duo-green text-white border-b-4 border-duo-green-dark hover:brightness-105 active:border-b-2 active:translate-y-[2px]',
      secondary: 'bg-duo-blue text-white border-b-4 border-blue-600 hover:brightness-105 active:border-b-2 active:translate-y-[2px]',
      danger: 'bg-duo-red text-white border-b-4 border-red-600 hover:brightness-105 active:border-b-2 active:translate-y-[2px]',
      ghost: 'bg-transparent text-duo-gray-500 hover:bg-duo-gray-100',
      outline: 'bg-white text-duo-gray-800 border-2 border-duo-gray-300 hover:bg-duo-gray-100',
    }

    const sizes = {
      sm: 'py-2 px-4 text-sm rounded-duo-sm',
      md: 'py-4 px-8 text-base rounded-duo',
      lg: 'py-5 px-10 text-lg rounded-duo-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          'font-bold font-heading transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:border-b-4',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
