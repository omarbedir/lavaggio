import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(242,203,46,0.35)] select-none transition-transform duration-300 hover:scale-105 ${heightClasses[size]} ${className}`}
    >
      <img
        src="/logo-badge.png"
        alt="لافاجيو LAVAGGIO"
        className="h-full w-auto object-contain rounded-2xl"
      />
    </div>
  );
};

export default Logo;
