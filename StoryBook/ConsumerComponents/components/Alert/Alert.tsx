import React from 'react';
import { X } from 'react-feather';
import styles from './Alert.module.css';

/**
 * Alert Component Props
 */
export interface AlertProps {
  /**
   * Alert variant/type
   * @default 'info'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Alert content
   */
  children?: React.ReactNode;
  
  /**
   * Alert title/heading
   */
  title?: React.ReactNode;
  
  /**
   * Whether alert can be dismissed
   * @default false
   */
  dismissible?: boolean;
  
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Whether alert should have an icon
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Alert Component
 * 
 * A component for displaying important messages to users.
 * Supports multiple variants and can be dismissible.
 */
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
  const alertClasses = [
    'alert',
    `alert-${variant}`,
    dismissible ? 'alert-dismissible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div className={alertClasses} role="alert" style={style}>
      {showIcon && <div className={styles.icon}>{getIcon(variant)}</div>}
      <div className={styles.content}>
        {title && <h6 className={styles.title}>{title}</h6>}
        {children && <div>{children}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleDismiss}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

/**
 * Get icon for alert variant
 */
const getIcon = (variant: string) => {
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
};

export default Alert;
