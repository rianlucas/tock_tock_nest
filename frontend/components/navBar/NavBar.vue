<script setup lang=ts>
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  BadgeCheck,
  Bell,
  ChartNoAxesCombined,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  ArrowLeftRight,
  Landmark,
  LogOut,
  Sparkles,
  Wallet,
  Goal,
  Newspaper,
  DoorOpen
} from 'lucide-vue-next'
import { ref } from 'vue'
import Breadcrumb from '@/components/navBar/Breadcrumb.vue'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Patrimônio',
      url: '/',
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: 'Ações',
          url: '#',
        },
        {
          title: 'FII',
          url: '#',
        },
        {
          title: 'Cripto',
          url: '#',
        },
      ],
    },
    {
      title: 'Gráficos',
      url: '#',
      icon: ChartNoAxesCombined,
      isActive: true,
      items: [
        {
          title: 'Evolução de Patrimônio',
          url: '#',
        },
        {
          title: 'Evolução de Dividendos',
          url: '#',
        },
        {
          title: 'Histórico de Dividendos',
          url: '#',
        },
        {
          title: 'Performance por Ativo',
          url: '#',
        },
      ]
    }
  ],
  projects: [
    {
      name: 'Transações',
      url: '/transactions',
      icon: ArrowLeftRight,
    },
    {
      name: 'Carteira',
      url: '/wallet',
      icon: Wallet,
    },
    {
      name: 'Metas e Objetivos',
      url: '#',
      icon: Goal,
    },
    {
      name: 'Notícias',
      url: '#',
      icon: Newspaper,
    },
  ],
}
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem >
            <NuxtLink to="/">
              <div class="ml-2 flex items-center gap-2">
                <DoorOpen  class="text-2xl" />
                <h1 class="text-2xl font-bold ">
                  tock_tock
                </h1>
              </div>
            </NuxtLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel class="text-primary/70">Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible
              v-for="item in data.navMain"
              :key="item.title"
              as-child
              :default-open="item.isActive"
              class="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem
                      v-for="subItem in item.items"
                      :key="subItem.title"
                    >
                      <SidebarMenuSubButton as-child>
                        <a :href="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
          <SidebarGroupLabel class="mt-4 text-primary/70">Core</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="item in data.projects"
              :key="item.name"
            >
              <SidebarMenuButton as-child>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton
                  size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                    <AvatarFallback class="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{ data.user.name }}</span>
                    <span class="truncate text-xs">{{ data.user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <AvatarFallback class="rounded-lg">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{ data.user.name }}</span>
                      <span class="truncate text-xs">{{ data.user.email }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset class="mx-auto pt-6 max-w-screen-2xl transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb/>
        </div>
      </header>
      
      <div class="gap-2 px-4 min-w-0">
        <slot/>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>