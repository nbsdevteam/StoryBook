import React from 'react';
import styles from './Badge.module.css';

const VARIANT_MAP: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
  light: styles.light,
  dark: styles.dark,
};

const OUTLINE_VARIANT_MAP: Record<string, string> = {
  primary: styles.outlinePrimary,
  secondary: styles.outlineSecondary,
  success: styles.outlineSuccess,
  danger: styles.outlineDanger,
  warning: styles.outlineWarning,
  info: styles.outlineInfo,
  light: styles.outlineLight,
  dark: styles.outlineDark,
};

export interface BadgeProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  children?: React.ReactNode;
  rounded?: boolean;
  outline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  rounded = false,
  outline = false,
  className = '',
  style,
}) => {
  const variantClass = outline
    ? OUTLINE_VARIANT_MAP[variant] ?? styles.outlinePrimary
    : VARIANT_MAP[variant] ?? styles.primary;
  const textClass =
    variant === 'light' ? styles.textDark : variant === 'dark' ? styles.textWhite : '';

  const classes = [
    styles.badge,
    variantClass,
    rounded ? styles.rounded : '',
    textClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={style}>
      {children}
    </span>
  );
};

export default Badge;
