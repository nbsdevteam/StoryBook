import React, { forwardRef, useMemo, useState } from 'react';
import styles from './Select.module.css';
import { SelectConfig, SelectOption } from './Select.types';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options?: SelectOption[];
  helperText?: string;
  error?: string;
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  invalid?: boolean;
  valid?: boolean;
  placeholder?: string;
  wrapperClassName?: string;
  config?: SelectConfig;
}

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
      config,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState('');
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = invalid || !!error;
    const isValid = valid && !hasError;

    const sizeClass =
      size === 'small' ? styles.selectSm : size === 'large' ? styles.selectLg : '';
    const stateClass = hasError ? styles.selectInvalid : isValid ? styles.selectValid : '';

    const selectClasses = [styles.select, sizeClass, stateClass, className]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [styles.selectWrapper, wrapperClassName].filter(Boolean).join(' ');

    const resolvedOptions = config?.options ?? options;
    const resolvedGroups = config?.groups;
    const filteredOptions = useMemo(() => {
      if (!config?.searchable || !searchValue) return resolvedOptions;
      return resolvedOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [resolvedOptions, config?.searchable, searchValue]);

    const filteredGroups = useMemo(() => {
      if (!resolvedGroups?.length) return [];
      if (!config?.searchable || !searchValue) return resolvedGroups;
      return resolvedGroups
        .map((group) => ({
          ...group,
          options: group.options.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
          ),
        }))
        .filter((group) => group.options.length > 0);
    }, [resolvedGroups, config?.searchable, searchValue]);

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        {config?.searchable && (
          <input
            type="text"
            className={styles.searchInput}
            placeholder={config.searchPlaceholder ?? 'Search'}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        )}
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          multiple={config?.multiple}
          value={config?.value ?? props.value}
          onChange={(event) => {
            if (config?.onValueChange) {
              const value = config.multiple
                ? Array.from(event.target.selectedOptions).map((opt) => opt.value)
                : event.target.value;
              config.onValueChange(value);
            }
            props.onChange?.(event);
          }}
          disabled={config?.disabled ?? props.disabled}
          {...props}
        >
          {(placeholder || config?.placeholder) && (
            <option value="" disabled>
              {config?.placeholder ?? placeholder}
            </option>
          )}
          {filteredGroups.length > 0
            ? filteredGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option
                      key={String(option.value)}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : filteredOptions.map((option) => (
                <option
                  key={String(option.value)}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
          {filteredGroups.length === 0 &&
            filteredOptions.length === 0 &&
            config?.emptyMessage && (
              <option value="" disabled>
                {config.emptyMessage}
              </option>
            )}
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
