'use client';

import { FC, ButtonHTMLAttributes, ReactNode, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  ripple?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  ripple = true,
  className = '',
  onClick,
  ...props
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsRippling(true);
      
      setTimeout(() => setIsRippling(false), 500);
    }
    
    onClick?.(e);
  };

  // Variants
  const variants = {
    primary: 'bg-[#32CD32] text-white hover:bg-[#2db82d] active:bg-[#28a428] shadow-md hover:shadow-lg',
    secondary: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-[#32CD32] text-[#32CD32] hover:bg-green-50 active:bg-green-100',
    ghost: 'bg-transparent text-[#32CD32] hover:bg-green-50 active:bg-green-100',
    gradient: 'bg-gradient-to-r from-[#32CD32] to-emerald-500 hover:from-[#2db82d] hover:to-emerald-600 text-white shadow-md hover:shadow-lg',
  };

  // Sizes
  const sizes = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-4 text-lg',
  };

  const buttonClasses = `
    relative
    overflow-hidden
    font-medium
    rounded-lg
    transition-all
    duration-300
    flex
    items-center
    justify-center
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-60 cursor-not-allowed' : 'transform hover:-translate-y-1 active:translate-y-0'}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect */}
      {isRippling && (
        <span
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            width: '500px',
            height: '500px',
            marginLeft: '-250px',
            marginTop: '-250px',
          }}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {/* Icon and content */}
      <span className="flex items-center justify-center space-x-2">
        {icon && iconPosition === 'left' && !loading && (
          <span className="inline-block">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && !loading && (
          <span className="inline-block">{icon}</span>
        )}
      </span>
    </button>
  );
};

export default Button;