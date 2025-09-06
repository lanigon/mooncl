// components/modals/PublishModal.tsx
'use client';

import * as React from 'react';
import Dialog from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import PublishForm, { PublishDraft } from '@/components/modals/nfts/PublishForm';
import PublishResult from '@/components/modals/nfts/PublishResult';
import { saveNFT, updateNFTScore } from '@/lib/nftStore';

type Step = 'form' | 'loading' | 'result';

type Props = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmitDraft?: (draft: PublishDraft) => Promise<void> | void;
  onCloseAll?: () => void;
};

export default function PublishModal({
  open,
  onOpenChange,
  onSubmitDraft,
  onCloseAll,
}: Props) {
  const [step, setStep] = React.useState<Step>('form');
  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    if (!open) {
      setStep('form');
      setScore(0);
    }
  }, [open]);

  const calcScore = (content: string) => {
    const len = Math.max(0, Math.min(1000, content.trim().length));
    return 65 + Math.round((len / 1000) * 30); // 65~95
  };

  const submitDraft = async (draft: PublishDraft) => {
    try { await onSubmitDraft?.(draft); } catch {}
    const saved = saveNFT({ content: draft.content });
    setStep('loading');
    const s = calcScore(draft.content);
    setTimeout(() => {
      setScore(s);
      updateNFTScore(saved.id, s);
      setStep('result');
    }, 1000);
  };

  const closeSelf = () => onOpenChange?.(false);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="text-white">Mint Your Own NFT</span>}
      size="lg"                                   // 收窄一档
      className="w-[92vw] max-w-[720px]"         // 与市场弹窗一致
      /* 不传 border => 默认米白边框；已去掉彩色描边 */
    >
      {/* 统一一个内容高度：min-h-[56vh]，三个步骤都套这个容器 */}
      {step === 'form' && (
        <div className="min-h-[56vh] flex flex-col justify-between space-y-6">
          <PublishForm onSubmit={submitDraft} />
          <div className="flex justify-center gap-4">
            <Button
              appearance="brand"
              size="lg"
              onClick={() => {
                const form = document.querySelector('form');
                (form as HTMLFormElement)?.requestSubmit();
              }}
            >
              Publish
            </Button>
            <Button appearance="glass" size="lg" onClick={closeSelf}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className="min-h-[56vh] flex flex-col items-center justify-center gap-6">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 border-t-transparent animate-spin" />
          <div className="text-white/80">AI Lisa is analyzing your content…</div>
        </div>
      )}

      {step === 'result' && (
        <div className="min-h-[56vh] flex items-center justify-center">
          <PublishResult
            score={score}
            onConfirm={() => {
              if (onCloseAll) onCloseAll();
              else closeSelf();
            }}
          />
        </div>
      )}
    </Dialog>
  );
}