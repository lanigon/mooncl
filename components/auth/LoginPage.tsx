'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useWallet } from '@/contexts/WalletContext';

const LoginPage: React.FC = () => {
  const { connectWallet, connectWithGoogle, state } = useWallet();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src="/img/background/backgroundHorizontal.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-purple-800/60 to-blue-900/80" />
      </div>

      {/* 顶部导航 */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Image
            src="/favicon_w.png"
            alt="Mooncl Logo"
            width={24}
            height={24}
          />
          <span className="text-white font-semibold text-lg">Mooncl</span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Telegram 图标 */}
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          </button>

          {/* X (Twitter) 图标 */}
          <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Mooncl</span>
          </h1>

          {/* 小图标装饰 */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg"></div>
          </div>

          <p className="text-gray-300 text-lg mb-2">Aptos Board</p>
          <p className="text-gray-400 text-sm">Connecting Aptos Ecosystem Partners Effortlessly</p>
        </div>

        {/* 登录按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            variant="google"
            size="lg"
            onClick={connectWithGoogle}
            isLoading={state.isConnecting}
            className="flex-1"
          >
            Sign in with Google
          </Button>

          <Button
            variant="wallet"
            size="lg"
            onClick={connectWallet}
            isLoading={state.isConnecting}
            className="flex-1"
          >
            Sign in with Wallet
          </Button>
        </div>

        {/* 错误提示 */}
        {state.error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
