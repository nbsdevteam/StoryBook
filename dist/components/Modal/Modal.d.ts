import React from 'react';
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    centered?: boolean;
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    className?: string;
    dialogClassName?: string;
}
export declare const Modal: React.FC<ModalProps>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map