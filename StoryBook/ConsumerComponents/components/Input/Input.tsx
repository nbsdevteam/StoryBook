import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'light' | 'primary';
  invalid?: boolean;
  valid?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

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
      size === 'small' ? styles.inputSm : size === 'large' ? styles.inputLg : '';
    const stateClass = hasError ? styles.inputInvalid : isValid ? styles.inputValid : '';
    const leftIconClass = leftIcon ? styles.inputWithLeftIcon : '';
    const rightIconClass = rightIcon ? styles.inputWithRightIcon : '';

    const inputClasses = [
      styles.input,
      sizeClass,
      stateClass,
      leftIconClass,
      rightIconClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [styles.inputWrapper, wrapperClassName].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
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
