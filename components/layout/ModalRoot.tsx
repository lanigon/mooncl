// components/layout/ModalRoot.tsx
'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import MarketModal from '@/components/modals/MarketModal';
import {NFTDetailModal} from '@/components/modals/NFTDetailModal';
import PublishModal from '@/components/modals/PublishModal';
import type { NFTBasic } from '@/components/modals/nfts/NFTCard';

function pushParams(router: any, pathname: string, next: URLSearchParams) {
  const q = next.toString();
  router.push(q ? `${pathname}?${q}` : pathname);
}

export default function ModalRoot() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const modal = sp.get('modal');
  const nftId = sp.get('nft');

  const close = () => {
    const next = new URLSearchParams(sp.toString());
    next.delete('modal');
    next.delete('nft');
    pushParams(router, pathname!, next);
  };

  const open = (name: string, params?: Record<string, string>) => {
    const next = new URLSearchParams(sp.toString());
    next.set('modal', name);
    if (params) Object.entries(params).forEach(([k, v]) => next.set(k, v));
    pushParams(router, pathname!, next);
  };

  // 临时假数据（之后你可以切到 loadNFTs()）
  const mock: NFTBasic[] = Array.from({ length: 6 }).map((_, i) => ({
    id: `id_${i + 1}`,
    title: `Pixel Item #${i + 1}`,
    image: '/img/placeholder/card.png',
    price: 680 + i * 5,
    currency: 'Y',
  }));

  return (
    <>
      <MarketModal
        open={modal === 'market'}
        onOpenChange={(o) => (o ? open('market') : close())}
        items={mock}
        selectedId={nftId ?? undefined}
        onSelect={(id) => open('detail', { nft: id })}
        onNext={() => open('detail', { nft: mock[0].id })}
      />

      <NFTDetailModal
        open={modal === 'detail'}
        onOpenChange={(o) => (o ? open('detail') : close())}
        data={
          nftId
            ? {
                id: nftId,
                title: `Pixel Item ${nftId}`,
                image: '/img/placeholder/cover.png',
                desc: 'Example description… You can place the real NFT details here later.',
                price: 680,
                currency: 'Y',
                owner: '1a2e8…2345',
              }
            : undefined
        }
        onBuy={() => {}}
        onBack={() => open('market')}
      />

      {/* 简化调用：只传 open/onOpenChange，避免类型不匹配 */}
      <PublishModal
        open={modal === 'publish'}
        onOpenChange={(o) => (o ? open('publish') : close())}
      />
    </>
  );
}