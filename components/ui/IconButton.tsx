'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type IconButtonAppearance = 'glass' | 'brand';
type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: IconButtonAppearance;
  size?: IconButtonSize;
  active?: boolean;
  children: React.ReactNode; // 直接放图标（或 emoji）
  'aria-label'?: string;
}

const sizeClass: Record<IconButtonSize, string> = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-12 w-12 text-lg',
};

export default function IconButton({
  className,
  appearance = 'glass',
  size = 'md',
  active = false,
  children,
  ...props
}: IconButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full transition-all ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--brand-2,#93c5fd)]';

  const styles: React.CSSProperties = {};

  let look = '';
  if (appearance === 'brand') {
    look = 'text-white shadow-sm hover:translate-y-[-1px] active:translate-y-[0]';
    styles.background = 'var(--gradient-brand, linear-gradient(90deg,#7c3aed,#06b6d4))';
    styles.boxShadow = 'var(--elev-1,0 4px 12px rgba(0,0,0,.25))';
  } else {
    look = 'text-white border hover:translate-y-[-1px] active:translate-y-[0]';
    styles.background = 'var(--glass-bg, rgba(255,255,255,.08))';
    styles.borderColor = 'var(--glass-border, rgba(255,255,255,.18))';
    (styles as any).backdropFilter = 'blur(var(--blur-md,12px))';
    styles.boxShadow = 'var(--elev-1,0 4px 12px rgba(0,0,0,.25))';
  }

  const activeRing =
    active && appearance === 'glass'
      ? 'ring-2 ring-[color:var(--brand-2,#93c5fd)] ring-offset-0'
      : active && appearance === 'brand'
      ? 'ring-2 ring-white/60'
      : '';

  return (
    <button
      type="button"
      className={cn(base, sizeClass[size], look, activeRing, className)}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
}