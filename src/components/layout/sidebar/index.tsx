import * as React from 'react';
import { Newspaper, FolderSearch, RssIcon, CircleSmall } from 'lucide-react';

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
      title: 'The Guardian Headlines',
      url: '/sources/the-guardian',
      icon: CircleSmall,
    },
    {
      title: 'Categories',
      url: '#',
      icon: FolderSearch,
      isActive: true,
      items: [
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
      isActive: true,
      items: [
        {
          title: 'ABC News',
          url: '/sources/abc-news',
        },
        {
          title: 'Ars Technica',
          url: '/sources/ars-technica',
        },
        {
          title: 'BBC News',
          url: '/sources/bbc-news',
        },
        {
          title: 'Bleacher Report',
          url: '/sources/bleacher-report',
        },
        {
          title: 'Bloomberg',
          url: '/sources/bloomberg',
        },
        {
          title: 'BuzzFeed',
          url: '/sources/buzzfeed',
        },
        {
          title: 'CBC News',
          url: '/sources/cbc-news',
        },
        {
          title: 'CNN',
          url: '/sources/cnn',
        },
        {
          title: 'ESPN',
          url: '/sources/espn',
        },
        {
          title: 'Engadget',
          url: '/sources/engadget',
        },
        {
          title: 'Financial Post',
          url: '/sources/financial-post',
        },
        {
          title: 'Focus',
          url: '/sources/focus',
        },
        {
          title: 'Fortune',
          url: '/sources/fortune',
        },
        {
          title: 'Fox News',
          url: '/sources/fox-news',
        },
      ],
      moreLink: '/sources',
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
