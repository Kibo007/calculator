'use client';
import cn from 'classnames';

interface ButtonProps {
  onClick: () => void;
  children?: string;
  className?: string;
}
export const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
        className,
      )}
      onClick={onClick}
      aria-label={`Calculator button for ${children}`}
      role="button"
    >
      {children}
    </button>
  );
};
