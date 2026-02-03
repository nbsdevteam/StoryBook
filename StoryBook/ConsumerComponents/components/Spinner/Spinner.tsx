import React from 'react';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

/**
 * Spinner Props Interface
 */
export interface SpinnerProps {
  /**
   * Spinner size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Spinner color variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'muted';

  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  label?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Spinner Description
 * 
 * This is a template component that demonstrates the structure
 * for creating reusable components in the library.
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  label = 'Loading',
  className,
}) => {
  return (
    <span
      className={cn(
        styles.spinner,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        className
      )}
      role="status"
      aria-label={label}
    >
      <span className={styles.spinnerRing} />
    </span>
  );
};

export default Spinner;
