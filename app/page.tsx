'use client';

import { useWallet } from '@/contexts/WalletContext';
import LoginPage from '@/components/auth/LoginPage';
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function Home() {
  const { state } = useWallet();

  if (!state.isConnected) {
    return <LoginPage />;
  }

  return <DashboardPage />;
}
