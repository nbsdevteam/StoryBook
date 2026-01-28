import React from 'react';
import styles from './Badge.module.css';

/**
 * Badge Component Props
 */
export interface BadgeProps {
  /**
   * Badge variant/color
   * @default 'primary'
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  
  /**
   * Badge content
   */
  children?: React.ReactNode;
  
  /**
   * Whether badge should be rounded/pill shaped
   * @default false
   */
  rounded?: boolean;
  
  /**
   * Whether badge should have outline style
   * @default false
   */
  outline?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Badge Component
 * 
 * A small status indicator component for displaying labels, counts, or tags.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  rounded = false,
  outline = false,
  className = '',
  style,
}) => {
  const baseClass = 'badge';
  const variantClass = outline
    ? `bg-outline-${variant}`
    : `bg-${variant}`;
  const roundedClass = rounded ? 'rounded-pill' : '';
  const textClass =
    variant === 'light'
      ? 'text-dark'
      : variant === 'dark'
      ? 'text-white'
      : '';

  const classes = [
    baseClass,
    variantClass,
    roundedClass,
    textClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={style}>
      {children}
    </span>
  );
};

export default Badge;
