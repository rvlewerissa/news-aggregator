'use client';

import * as React from 'react';
import { Newspaper, FolderSearch, RssIcon } from 'lucide-react';

import NavMain from '@/components/layout/sidebar/NavMain';
import NavHeadlines from '@/components/layout/sidebar/NavHeadlines';
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
      title: 'Categories',
      url: '#',
      icon: FolderSearch,
      isActive: true,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Business',
          url: '#',
        },
        {
          title: 'Entertainment',
          url: '#',
        },
        {
          title: 'Health',
          url: '#',
        },
        {
          title: 'Science',
          url: '#',
        },
        {
          title: 'Sports',
          url: '#',
        },
        {
          title: 'Technology',
          url: '#',
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
        <NavHeadlines projects={data.headline} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
