import Link from 'next/link';
import { ChevronRight, MoreHorizontal, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type Props = {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
    moreLink?: string;
  }[];
};

export default function NavMain({ items }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='font-mono'>FEED</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.items?.length) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className='group/collapsible'
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span className='tracking-wide'>{item.title}</span>
                      <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Link href={subItem.url} passHref>
                            <SidebarMenuSubButton>
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                      {item.moreLink && (
                        <SidebarMenuItem>
                          <Link href='/sources'>
                            <SidebarMenuButton className='text-sidebar-foreground/70'>
                              <MoreHorizontal className='text-sidebar-foreground/70' />
                              <span>More</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} passHref>
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
