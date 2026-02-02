import React, { forwardRef } from 'react';
import styles from './Radio.module.css';

/**
 * Radio Component Props
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Radio label
   */
  label?: React.ReactNode;
  
  /**
   * Helper text below radio
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether radio is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Radio size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether radio is in invalid state
   */
  invalid?: boolean;
  
  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
  
  /**
   * Whether to show label before radio
   * @default false
   */
  labelBefore?: boolean;
}

/**
 * Radio Component
 * 
 * A flexible radio button component with support for labels,
 * helper text, error states, and multiple sizes.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      size = 'medium',
      invalid = false,
      className = '',
      wrapperClassName = '',
      id,
      labelBefore = false,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;

    const sizeClass =
      size === 'small'
        ? styles.small
        : size === 'large'
        ? styles.large
        : '';

    const inputClasses = [
      styles.input,
      sizeClass,
      hasError ? styles.inputInvalid : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.wrapper,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${radioId}-error` : helperText ? `${radioId}-helper` : undefined
          }
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className={styles.label}
            style={{ order: labelBefore ? -1 : 1 }}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        {error && (
          <div id={`${radioId}-error`} className={styles.errorText}>
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${radioId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
