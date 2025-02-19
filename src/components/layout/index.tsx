// components
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
