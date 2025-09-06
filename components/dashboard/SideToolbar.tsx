// components/dashboard/SideToolbar.tsx
'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IconButton from '@/components/ui/IconButton';

type Item = { key: string; icon: React.ReactNode; onClick?: () => void; active?: boolean };

type Props = {
  /** 传入则完全覆盖默认三颗按钮；不传则使用内置（≡ 打开市场、🍸 打开发布、🚗 关闭弹窗） */
  items?: Item[];
};

export default function SideToolbar({ items }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const modal = sp.get('modal');

  // 更新 URL searchParams 来控制 ModalRoot
  const setModal = (name?: string, params?: Record<string, string>) => {
    const next = new URLSearchParams(sp.toString());
    if (!name) {
      next.delete('modal');
      next.delete('nft');
    } else {
      next.set('modal', name);
      if (params) Object.entries(params).forEach(([k, v]) => next.set(k, v));
    }
    const url = `${pathname}${next.toString() ? `?${next.toString()}` : ''}`;
    router.push(url);
  };

  const list: Item[] =
    items ??
    [
      { key: 'menu', icon: '≡', onClick: () => setModal('market'), active: modal === 'market' },
      { key: 'bar', icon: '🍸', onClick: () => setModal('publish'), active: modal === 'publish' },
      // { key: 'room', icon: '🚗', onClick: () => setModal(undefined), active: !modal },
    ];

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      {list.map((it) => (
        <IconButton
          key={it.key}
          appearance="glass"
          size="lg"
          active={!!it.active}
          aria-label={it.key}
          onClick={it.onClick}
        >
          <span className="text-white/90">{it.icon}</span>
        </IconButton>
      ))}
    </div>
  );
}