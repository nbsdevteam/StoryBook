import React, { forwardRef } from 'react';
import styles from './Switch.module.css';

/**
 * Switch Component Props
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Switch label
   */
  label?: React.ReactNode;
  
  /**
   * Helper text below switch
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether switch is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Switch size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Switch variant/color
   * @default 'primary'
   */
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Whether switch is in invalid state
   */
  invalid?: boolean;
  
  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
  
  /**
   * Whether to show label before switch
   * @default false
   */
  labelBefore?: boolean;
}

/**
 * Switch Component
 * 
 * A toggle switch component with support for labels, helper text,
 * error states, multiple sizes, and color variants.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      size = 'medium',
      variant = 'primary',
      invalid = false,
      className = '',
      wrapperClassName = '',
      id,
      labelBefore = false,
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;
    const isChecked = checked !== undefined ? checked : defaultChecked;

    const sizeClass =
      size === 'small'
        ? styles.small
        : size === 'large'
        ? styles.large
        : styles.medium;
    const variantClass = styles[variant] || styles.primary;
    const errorClass = hasError ? styles.invalid : '';

    const switchClasses = [
      styles.switch,
      sizeClass,
      variantClass,
      errorClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.switchWrapper,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <div className={styles.switchContainer}>
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            className={switchClasses}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${switchId}-error` : helperText ? `${switchId}-helper` : undefined
            }
            {...props}
          />
          <label htmlFor={switchId} className={styles.switchLabel}>
            <span className={styles.switchSlider} />
          </label>
        </div>
        {label && (
          <label
            htmlFor={switchId}
            className={styles.label}
            style={{ order: labelBefore ? -1 : 1 }}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        {error && (
          <div id={`${switchId}-error`} className={styles.errorText}>
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${switchId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
