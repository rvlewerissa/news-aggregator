import * as React from 'react';
import { Newspaper, FolderSearch, RssIcon } from 'lucide-react';

import NavMain from '@/components/layout/sidebar/NavMain';
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar';

const data = {
  headline: [
    {
      name: 'Top Headlines',
      url: '#',
      icon: Newspaper,
    },
  ],
  navMain: [
    {
      title: 'Top Headlines',
      url: '/',
      icon: Newspaper,
    },
    {
      title: 'Categories',
      url: '#',
      icon: FolderSearch,
      isActive: true,
      items: [
        {
          title: 'General',
          url: '/categories/general',
        },
        {
          title: 'Business',
          url: '/categories/business',
        },
        {
          title: 'Entertainment',
          url: '/categories/entertainment',
        },
        {
          title: 'Health',
          url: '/categories/health',
        },
        {
          title: 'Science',
          url: '/categories/science',
        },
        {
          title: 'Sports',
          url: '/categories/sports',
        },
        {
          title: 'Technology',
          url: '/categories/technology',
        },
      ],
    },
    {
      title: 'Sources',
      url: '#',
      icon: RssIcon,
      items: [
        {
          title: 'The Guardian',
          url: '#',
        },
        {
          title: 'New York Times',
          url: '#',
        },
        {
          title: 'BBC News',
          url: '#',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
