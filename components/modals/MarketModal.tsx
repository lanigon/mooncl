// components/modals/MarketModal.tsx
'use client';

import * as React from 'react';
import Dialog from '@/components/ui/Dialog';
import NFTList from './nfts/NFTList';
import type { NFTBasic } from './nfts/NFTCard';
import Button from '@/components/ui/Button';

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  items?: NFTBasic[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onNext?: () => void;
}

export default function MarketModal({
  open,
  onOpenChange,
  items = [],
  selectedId,
  onSelect,
  onNext,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="text-white">Let’s Meet</span>}
      size="lg"                                   // ⬅️ 与发布弹窗保持一致
      className="w-[92vw] max-w-[720px]"         // ⬅️ 自适应宽度
      /* 不传 border，默认米白边框 */
    >
      <div className="space-y-4">
        {/* 列表内部滚动，避免弹窗无限增高 */}
        <div className="max-h-[56vh] overflow-y-auto pr-1">
          <NFTList items={items} selectedId={selectedId} onSelect={onSelect} />
        </div>

        <div className="flex justify-center pt-2">
          <Button appearance="glass" size="md" onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </Dialog>
  );
}