import React from 'react';
import styles from './Card.module.css';
import { GlassEffectWrapper } from '../GlassEffectWrapper';

/**
 * Card Component Props
 */
type CardBaseProps = {
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
};

type CardWithoutGlass = CardBaseProps & {
  glassEffect?: false;
  glassVariant?: never;
  glassRandomHue?: never;
  glassHueSeed?: never;
};

type CardWithShine = CardBaseProps & {
  glassEffect: true;
  /**
   * Glass effect variant. Optional with a default of "shine".
   */
  glassVariant?: 'shine';
  glassRandomHue?: never;
  glassHueSeed?: never;
};

type CardWithPerfume = CardBaseProps & {
  glassEffect: true;
  /**
   * Glass effect variant.
   */
  glassVariant: 'perfume';
  /**
   * Random hue coloring (perfume only).
   */
  glassRandomHue?: boolean;
  /**
   * Stable seed for deterministic hue selection.
   * Use index, ID, or any string/number to ensure each card has a unique consistent color.
   * Only applies when glassRandomHue is true.
   */
  glassHueSeed?: string | number;
};

export type CardProps = CardWithoutGlass | CardWithShine | CardWithPerfume;

/**
 * Card Component
 * 
 * A flexible card component for displaying content with optional header,
 * body, footer, and image sections.
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  header,
  imageSrc,
  imageAlt = 'Card image',
  className = '',
  style,
  shadow = true,
  bordered = true,
  glassEffect,
  ...glassProps
}) => {
  const cardClasses = [
    'card',
    shadow ? '' : styles.noShadow,
    bordered ? '' : styles.noBorder,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cardInner = (
    <div className={cardClasses} style={style}>
      {imageSrc && (
        <img src={imageSrc} className="card-img-top" alt={imageAlt} />
      )}
      {header && <div className="card-header">{header}</div>}
      {(title || subtitle || children) && (
        <div className="card-body">
          {title && <h6 className="card-title fw-semibold">{title}</h6>}
          {subtitle && <p className="card-subtitle mb-3 text-muted">{subtitle}</p>}
          {children && <div className="card-text">{children}</div>}
        </div>
      )}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );

  if (glassEffect) {
    const { glassVariant, glassRandomHue, glassHueSeed } = glassProps as CardWithShine | CardWithPerfume;
    const variant = glassVariant ?? 'shine';
    
    return (
      <GlassEffectWrapper
        asChild
        glassEffect
        variant={variant}
        randomHue={variant === 'perfume' ? glassRandomHue : undefined}
        hueSeed={variant === 'perfume' ? glassHueSeed : undefined}
      >
        {cardInner}
      </GlassEffectWrapper>
    );
  }

  return cardInner;
};

export default Card;