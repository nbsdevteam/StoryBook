import React, { forwardRef } from 'react';
import styles from './Textarea.module.css';

/**
 * Textarea Component Props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Textarea label
   */
  label?: string;
  
  /**
   * Helper text below textarea
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Whether textarea is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Textarea size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Textarea variant/style
   * @default 'default'
   */
  variant?: 'default' | 'light' | 'primary';
  
  /**
   * Whether textarea is in invalid state
   */
  invalid?: boolean;
  
  /**
   * Whether textarea is in valid state
   */
  valid?: boolean;
  
  /**
   * Number of rows (height)
   * @default 3
   */
  rows?: number;
  
  /**
   * Whether textarea should auto-resize
   * @default false
   */
  autoResize?: boolean;
  
  /**
   * Maximum number of characters
   */
  maxLength?: number;
  
  /**
   * Show character count
   * @default false
   */
  showCharCount?: boolean;
  
  /**
   * Additional CSS classes for wrapper
   */
  wrapperClassName?: string;
}

/**
 * Textarea Component
 * 
 * A flexible textarea component with support for labels, helper text,
 * error states, character counting, and auto-resize.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      rows = 3,
      autoResize = false,
      maxLength,
      showCharCount = false,
      className = '',
      wrapperClassName = '',
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;
    const isValid = valid && !hasError;
    const currentLength = typeof value === 'string' ? value.length : 0;

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

    const textareaClasses = [
      'form-control',
      sizeClass,
      variantClass,
      stateClass,
      autoResize ? styles.autoResize : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.textareaWrapper,
      wrapperClassName,
    ]
      .filter(Boolean)
      .join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={textareaId} className="form-label">
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : showCharCount && maxLength
              ? `${textareaId}-count`
              : undefined
          }
          {...props}
        />
        <div className={styles.footer}>
          {showCharCount && maxLength && (
            <div
              id={`${textareaId}-count`}
              className={styles.charCount}
              aria-live="polite"
            >
              {currentLength} / {maxLength}
            </div>
          )}
        </div>
        {error && (
          <div id={`${textareaId}-error`} className={styles.errorText}>
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={`${textareaId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
