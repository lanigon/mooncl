import * as React from 'react';
import Dialog from '../ui/Dialog';
import NFTDetail, { NFTDetailData } from '../modals/nfts/NFTDetail';
import Button from '../ui/Button';

interface NFTDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: NFTDetailData;
  onBuy: () => void;
  onBack: () => void;
}

export function NFTDetailModal({ open, onOpenChange, data, onBuy, onBack }: NFTDetailModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="text-white">Hello! New friends</span>}
      size="lg"
      className="w-[92vw] max-w-[720px]"
    >
      <div className="max-h-[56vh] overflow-y-auto pr-1">
        <NFTDetail
          data={data}
          actions={
            <div className="flex gap-3">
              <Button appearance="brand" onClick={onBuy}>
                Buy
              </Button>
              <Button appearance="glass" onClick={onBack}>
                Back
              </Button>
            </div>
          }
        />
      </div>
    </Dialog>
  );
}