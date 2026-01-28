import React from 'react';
import styles from './Button.module.css';

/**
 * Button Component Props
 * 
 * A reusable button component that supports multiple variants, sizes, and states.
 * This component is prop-driven and does not depend on Redux or Router.
 */
export interface ButtonProps {
  /**
   * Button variant/style
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
    | 'dark'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-light'
    | 'outline-dark';
  
  /**
   * Button size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Click handler function
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Button content/children
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * If provided, renders as an anchor tag instead of button
   */
  href?: string;
  
  /**
   * Target for anchor tag (e.g., '_blank')
   */
  target?: string;
  
  /**
   * Whether button should be full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether button should be rounded/pill shaped
   * @default false
   */
  rounded?: boolean;
}

/**
 * Button Component
 * 
 * A flexible, reusable button component that supports multiple variants,
 * sizes, and states. Can render as either a button or anchor tag.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  children,
  className = '',
  style,
  href,
  target,
  fullWidth = false,
  rounded = false,
}) => {
  // Build CSS classes
  const baseClass = 'btn';
  const variantClass = variant.startsWith('outline-')
    ? `btn-${variant}`
    : `btn-${variant}`;
  const sizeClass =
    size === 'small' ? 'btn-sm' : size === 'large' ? 'btn-lg' : '';
  const roundedClass = rounded ? 'rounded-pill' : '';
  const fullWidthClass = fullWidth ? 'w-100' : '';
  const loadingClass = loading ? styles.loading : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    roundedClass,
    fullWidthClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // If href is provided, render as anchor tag
  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={classes}
        style={style}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {loading && <span className={styles.spinner} />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};

export default Button;
