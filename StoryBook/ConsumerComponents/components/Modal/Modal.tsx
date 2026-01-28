import React, { useEffect } from 'react';
import { X } from 'react-feather';
import styles from './Modal.module.css';

/**
 * Modal Component Props
 */
export interface ModalProps {
  /**
   * Whether modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  
  /**
   * Modal title
   */
  title?: React.ReactNode;
  
  /**
   * Modal body content
   */
  children?: React.ReactNode;
  
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Modal size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether modal should be centered vertically
   * @default false
   */
  centered?: boolean;
  
  /**
   * Whether modal should have backdrop
   * @default true
   */
  backdrop?: boolean | 'static';
  
  /**
   * Whether modal can be closed with ESC key
   * @default true
   */
  keyboard?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Additional CSS classes for dialog
   */
  dialogClassName?: string;
}

/**
 * Modal Component
 * 
 * A flexible modal dialog component. Uses Bootstrap modal structure
 * but is fully controlled via props.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  centered = false,
  backdrop = true,
  keyboard = true,
  className = '',
  dialogClassName = '',
}) => {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen || !keyboard) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, keyboard, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass =
    size === 'sm'
      ? 'modal-sm'
      : size === 'lg'
      ? 'modal-lg'
      : size === 'xl'
      ? 'modal-xl'
      : '';
  const centeredClass = centered ? 'modal-dialog-centered' : '';

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (backdrop === true && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {backdrop && (
        <div
          className={`modal-backdrop fade ${isOpen ? 'show' : ''}`}
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Modal */}
      <div
        className={`modal fade ${isOpen ? 'show' : ''} ${className}`}
        style={{ display: isOpen ? 'block' : 'none' }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={backdrop === true ? handleBackdropClick : undefined}
      >
        <div
          className={`modal-dialog ${sizeClass} ${centeredClass} ${dialogClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            {title && (
              <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <X size={20} />
                </button>
              </div>
            )}
            {children && <div className="modal-body">{children}</div>}
            {footer && <div className="modal-footer">{footer}</div>}
            {!title && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Close"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
