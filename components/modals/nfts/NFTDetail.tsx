// components/domain/nft/NFTDetail.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type NFTDetailData = {
  id: string;
  title: string;
  image: string;
  desc?: string;
  price?: number;
  currency?: string;
  owner?: string;
};

interface Props {
  data?: NFTDetailData;
  className?: string;
  actions?: React.ReactNode; // 购买/返回按钮位
}

export default function NFTDetail({ data, className, actions }: Props) {
  if (!data) {
    return <div className="h-64 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />;
  }
  return (
    <div className={cn('space-y-4', className)}>
      <div className="rounded-2xl overflow-hidden bg-black/20 border border-white/10">
        <img src={data.image} alt={data.title} className="w-full h-auto object-cover" />
      </div>
      <div className="text-2xl font-semibold text-white">{data.title}</div>
      {data.owner && <div className="text-sm text-white/60">Owner: {data.owner}</div>}
      <div className="text-white/80 whitespace-pre-line">{data.desc}</div>
      {data.price != null && (
        <div className="text-lg font-medium text-white/90">
          Price: {data.price} {data.currency ?? 'Y'}
        </div>
      )}
      {actions && <div className="pt-2">{actions}</div>}
    </div>
  );
}