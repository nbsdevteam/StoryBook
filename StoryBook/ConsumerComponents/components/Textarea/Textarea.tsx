import React, { forwardRef } from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'light' | 'primary';
  invalid?: boolean;
  valid?: boolean;
  autoResize?: boolean;
  showCharCount?: boolean;
  wrapperClassName?: string;
}

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
      size === 'small' ? styles.textareaSm : size === 'large' ? styles.textareaLg : '';
    const stateClass = hasError ? styles.textareaInvalid : isValid ? styles.textareaValid : '';

    const textareaClasses = [
      styles.textarea,
      sizeClass,
      stateClass,
      autoResize ? styles.autoResize : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [styles.textareaWrapper, wrapperClassName].filter(Boolean).join(' ');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      if (onChange) onChange(e);
    };

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
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
