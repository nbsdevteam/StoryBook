import React from 'react';
import styles from './Button.module.css';

const VARIANT_MAP: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
  light: styles.light,
  dark: styles.dark,
  'outline-primary': styles.outlinePrimary,
  'outline-secondary': styles.outlineSecondary,
  'outline-success': styles.outlineSuccess,
  'outline-danger': styles.outlineDanger,
  'outline-warning': styles.outlineWarning,
  'outline-info': styles.outlineInfo,
  'outline-light': styles.outlineLight,
  'outline-dark': styles.outlineDark,
};

export interface ButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-light'
    | 'outline-dark';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  fullWidth?: boolean;
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  children,
  className = '',
  style,
  href,
  target,
  fullWidth = false,
  rounded = false,
}) => {
  const variantClass = VARIANT_MAP[variant] ?? styles.primary;
  const sizeClass =
    size === 'small' ? styles.btnSm : size === 'large' ? styles.btnLg : '';
  const classes = [
    styles.btn,
    variantClass,
    sizeClass,
    rounded ? styles.rounded : '',
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={classes}
        style={style}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {loading && <span className={styles.spinner} />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};

export default Button;
