import React, { forwardRef } from 'react';
import styles from './Checkbox.module.css';

/**
 * Checkbox Component Props
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Checkbox label
   */
  label?: React.ReactNode;
  
  /**
   * Helper text below checkbox
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether checkbox is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Checkbox size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether checkbox is in invalid state
   */
  invalid?: boolean;
  
  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
  
  /**
   * Whether to show label before checkbox
   * @default false
   */
  labelBefore?: boolean;
}

/**
 * Checkbox Component
 * 
 * A flexible checkbox component with support for labels,
 * helper text, error states, and multiple sizes.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;

    const sizeClass =
      size === 'small'
        ? styles.small
        : size === 'large'
        ? styles.large
        : '';

    const checkboxClasses = [
      'form-check-input',
      sizeClass,
      hasError ? 'is-invalid' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      'form-check',
      styles.checkboxWrapper,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
          }
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="form-check-label"
            style={{ order: labelBefore ? -1 : 1 }}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        {error && (
          <div id={`${checkboxId}-error`} className={styles.errorText}>
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${checkboxId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
