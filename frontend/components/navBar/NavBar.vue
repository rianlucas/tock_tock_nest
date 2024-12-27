<template>
  <header class="bg-background text-primary p-4 flex justify-between items-center px-8 border-b-2 border-b-primary">
    <h1 class="text-xl font-bold">
      tock_tock
    </h1>
    
    <div class="flex items-center">
      <div class="mr-4">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode.preference = 'light'">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'dark'">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button variant="primary" class="mr-4">
        <NuxtLink class="text-primary/70" to="/">
          Home
        </NuxtLink>
      </Button>
      
      <Button variant="primary" class="mr-4">
        <NuxtLink class="text-primary/70" to="/portfolio">
          Portfolio
        </NuxtLink>
      </Button>

      <Menubar class=" border-0">
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar class="cursor-pointer">
              <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ffe%2F8b%2F2f%2Ffe8b2fe91d946912c937b8dc1456ed30.jpg&f=1&nofb=1&ipt=c11f4398bf4a12ce24d7e9bad02602e517600fd9ebfdd70a15b8b8956fd285a4&ipo=images"/>
              <AvatarFallback> Avatar</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Profile</MenubarItem>
            <MenubarItem>Upgrade Plan</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      
    </div>
  </header>
</template>

<script setup="ts">
import AvatarFallback from '~/components/ui/avatar/AvatarFallback.vue';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'

const colorMode = useColorMode()

</script>

<style >

.router-link-exact-active {
  color: hsl(var(--primary));
}

</style>