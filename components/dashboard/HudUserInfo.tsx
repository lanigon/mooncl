// components/dashboard/HudUserInfo.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import Chip from '@/components/ui/Chip';

type Props = {
  points?: string | number;
  address?: string;
};

const shorten = (addr?: string) =>
  addr ? `${addr.slice(0, 5)}…${addr.slice(-4)}` : '1a2e8…2345';

export default function HudUserInfo({ points = '11.230', address }: Props) {
  const router = useRouter();
  const { disconnect } = (typeof useWallet === 'function' ? useWallet() : ({} as any));

  const onLogout = () => {
    try { disconnect?.(); } catch {}
    // 清除“已登录”标记，middleware 会放行 /login
    document.cookie = 'mc_auth=; Max-Age=0; Path=/';
    router.replace('/login');
  };

  return (
    <div className="fixed right-6 top-6 z-20 flex items-center gap-3">
      {/* 分数 */}
      <Chip appearance="glass" text={String(points)} icon="🍷" />

      {/* 地址 + Hover 菜单 */}
      <div className="relative group">
        {/* 触发区：账号 Chip */}
        <div className="cursor-default">
          <Chip appearance="glass" text={shorten(address)} icon="👤" />
        </div>

        {/* Hover 弹出菜单 */}
        <div
          className="
            absolute right-0 mt-2 w-36 rounded-2xl
            bg-white/10 border border-white/20 backdrop-blur-xl
            shadow-[0_12px_30px_rgba(0,0,0,.35)]
            p-2
            invisible opacity-0 translate-y-1
            group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
            transition duration-150
          "
        >
          <button
            onClick={onLogout}
            className="
              w-full text-left px-3 py-2 rounded-xl
              text-white/90 hover:bg-white/15
              flex items-center gap-2
            "
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}