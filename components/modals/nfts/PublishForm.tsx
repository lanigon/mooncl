// components/nfts/PublishForm.tsx
'use client';

import * as React from 'react';
import Textarea from '@/components/ui/Textarea';

export type PublishDraft = { content: string };

type Props = {
  onSubmit?: (draft: PublishDraft) => void;
  defaultValue?: string;
};

export default function PublishForm({ onSubmit, defaultValue = '' }: Props) {
  const [content, setContent] = React.useState(defaultValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ content });
      }}
      className="space-y-4"
    >
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Describe your NFT idea, traits, story... (this will be used for minting)"
        className="min-h-[44vh] md:min-h-[48vh] text-base resize-none"  // ⬅️ 禁止拖拽缩放
      />
      {/* 按钮在外层弹窗 footer */}
    </form>
  );
}