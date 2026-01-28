import React, { forwardRef } from 'react';
import styles from './Input.module.css';

/**
 * Input Component Props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label
   */
  label?: string;
  
  /**
   * Helper text below input
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether input is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Input size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Input variant/style
   * @default 'default'
   */
  variant?: 'default' | 'light' | 'primary';
  
  /**
   * Whether input is in invalid state
   */
  invalid?: boolean;
  
  /**
   * Whether input is in valid state
   */
  valid?: boolean;
  
  /**
   * Icon to display on the left side
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Icon to display on the right side
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
}

/**
 * Input Component
 * 
 * A flexible input component with support for labels, helper text,
 * error states, icons, and multiple sizes.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      size = 'medium',
      variant = 'default',
      invalid = false,
      valid = false,
      leftIcon,
      rightIcon,
      className = '',
      wrapperClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;
    const isValid = valid && !hasError;

    const sizeClass =
      size === 'small'
        ? 'form-control-sm'
        : size === 'large'
        ? 'form-control-lg'
        : '';
    const variantClass =
      variant === 'light'
        ? 'form-control-light'
        : variant === 'primary'
        ? 'form-control-primary'
        : '';
    const stateClass = hasError
      ? 'is-invalid'
      : isValid
      ? 'is-valid'
      : '';

    const inputClasses = [
      'form-control',
      sizeClass,
      variantClass,
      stateClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.inputWrapper,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={styles.inputContainer}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {error && (
          <div id={`${inputId}-error`} className={styles.errorText}>
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
