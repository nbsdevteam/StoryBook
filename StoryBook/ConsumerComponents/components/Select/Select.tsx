import React, { forwardRef } from 'react';
import styles from './Select.module.css';

/**
 * Select Option
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * Select Component Props
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select label
   */
  label?: string;
  
  /**
   * Options for the select
   */
  options?: SelectOption[];
  
  /**
   * Helper text below select
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether select is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Select size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether select is in invalid state
   */
  invalid?: boolean;
  
  /**
   * Whether select is in valid state
   */
  valid?: boolean;
  
  /**
   * Placeholder text (for first option)
   */
  placeholder?: string;
  
  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
}

/**
 * Select Component
 * 
 * A flexible select/dropdown component with support for labels,
 * helper text, error states, and multiple sizes.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options = [],
      helperText,
      error,
      required = false,
      size = 'medium',
      invalid = false,
      valid = false,
      placeholder,
      className = '',
      wrapperClassName = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;
    const isValid = valid && !hasError;

    const sizeClass =
      size === 'small'
        ? 'form-select-sm'
        : size === 'large'
        ? 'form-select-lg'
        : '';
    const stateClass = hasError
      ? 'is-invalid'
      : isValid
      ? 'is-valid'
      : '';

    const selectClasses = [
      'form-select',
      sizeClass,
      stateClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.selectWrapper,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {error && (
          <div id={`${selectId}-error`} className={styles.errorText}>
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${selectId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
