import React from 'react';
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
export declare const Modal: React.FC<ModalProps>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map