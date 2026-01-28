import React from 'react';
import styles from './Component.module.css';

/**
 * Component Props Interface
 */
export interface ComponentProps {
  /**
   * Brief description of the variant prop
   */
  variant?: 'primary' | 'secondary';
  
  /**
   * Component children
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
 * Component Description
 * 
 * This is a template component that demonstrates the structure
 * for creating reusable components in the library.
 */
export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`${styles.component} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Component;
