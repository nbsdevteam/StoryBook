import React from 'react';
import styles from './Spinner.module.css';

/**
 * Spinner Props Interface
 */
export interface SpinnerProps {
  /**
   * Brief description of the variant prop
   */
  variant?: 'primary' | 'secondary';
  
  /**
   * Spinner children
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Spinner Description
 * 
 * This is a template component that demonstrates the structure
 * for creating reusable components in the library.
 */
export const Spinner: React.FC<SpinnerProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`${styles.spinner} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Spinner;
