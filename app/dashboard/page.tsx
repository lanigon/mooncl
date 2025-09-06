// 'use client';

// import SceneBackground from '../../components/dashboard/SceneBackground';
// import SideToolbar from '../../components/dashboard/SideToolbar';
// import HudUserInfo from '../../components/dashboard/HudUserInfo';
// import { redirect } from 'next/navigation';

// export function DashboardAlias() {
//   redirect('/'); // 旧链接重定向到 /
// }

// export function Page() {
//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* 背景固定 */}
//       <SceneBackground darken={0} />

//       {/* 左侧竖向工具条 */}
//       <SideToolbar />

//       {/* 右上角用户信息 */}
//       <HudUserInfo points="11.230" address="1a2e8b9f3c4d2345" />

//       {/* 留一个可放角色/舞台元素的层（可选） */}
//       <div className="relative z-10 h-screen w-full" />
//     </div>
//   );
// }