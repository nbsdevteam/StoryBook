import React from 'react';
/**
 * Card Component Props
 */
export interface CardProps {
    /**
     * Card title/header
     */
    title?: React.ReactNode;
    /**
     * Card subtitle
     */
    subtitle?: React.ReactNode;
    /**
     * Card body content
     */
    children?: React.ReactNode;
    /**
     * Card footer content
     */
    footer?: React.ReactNode;
    /**
     * Card header content (alternative to title)
     */
    header?: React.ReactNode;
    /**
     * Image source for card image
     */
    imageSrc?: string;
    /**
     * Image alt text
     */
    imageAlt?: string;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Inline styles
     */
    style?: React.CSSProperties;
    /**
     * Whether card should have shadow
     * @default true
     */
    shadow?: boolean;
    /**
     * Whether card should have border
     * @default true
     */
    bordered?: boolean;
}
/**
 * Card Component
 *
 * A flexible card component for displaying content with optional header,
 * body, footer, and image sections.
 */
export declare const Card: React.FC<CardProps>;
export default Card;
//# sourceMappingURL=Card.d.ts.map