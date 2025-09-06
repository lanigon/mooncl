// app/page.tsx
'use client';

import SceneBackground from '@/components/dashboard/SceneBackground';
import SideToolbar from '@/components/dashboard/SideToolbar';
import HudUserInfo from '@/components/dashboard/HudUserInfo';
import ModalRoot from '@/components/layout/ModalRoot';

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <SceneBackground />
      <div className="relative z-10">
        <SideToolbar />
        <HudUserInfo />
      </div>
      <ModalRoot />
    </main>
  );
}