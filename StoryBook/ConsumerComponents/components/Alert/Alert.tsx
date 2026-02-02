import React from 'react';
import { X } from 'react-feather';
import styles from './Alert.module.css';

const VARIANT_MAP: Record<string, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  info: styles.info,
};

export interface AlertProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  children?: React.ReactNode;
  title?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  showIcon?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  children,
  title,
  dismissible = false,
  onDismiss,
  showIcon = true,
  className = '',
  style,
}) => {
  const variantClass = VARIANT_MAP[variant] ?? styles.info;
  const classes = [styles.alert, variantClass, className]
    .filter(Boolean)
    .join(' ');

  const handleDismiss = () => {
    if (onDismiss) onDismiss();
  };

  return (
    <div className={classes} role="alert" style={style}>
      {showIcon && <div className={styles.icon}>{getIcon(variant)}</div>}
      <div className={styles.content}>
        {title && <h6 className={styles.title}>{title}</h6>}
        {children && <div>{children}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Close"
          onClick={handleDismiss}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

function getIcon(variant: string) {
  const iconProps = { size: 20, className: styles.iconSvg };
  switch (variant) {
    case 'success':
      return <span className={styles.iconSuccess}>✓</span>;
    case 'danger':
      return <span className={styles.iconDanger}>✕</span>;
    case 'warning':
      return <span className={styles.iconWarning}>⚠</span>;
    default:
      return <span className={styles.iconInfo}>ℹ</span>;
  }
}

export default Alert;
