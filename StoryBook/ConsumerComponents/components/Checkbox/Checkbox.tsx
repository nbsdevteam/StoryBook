import React, { forwardRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  invalid?: boolean;
  wrapperClassName?: string;
  labelBefore?: boolean;
}

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
      size === 'small' ? styles.small : size === 'large' ? styles.large : '';

    const inputClasses = [
      styles.input,
      sizeClass,
      hasError ? styles.inputInvalid : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [styles.wrapper, wrapperClassName].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
          }
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={styles.label}
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
