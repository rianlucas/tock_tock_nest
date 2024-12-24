<template>
  <header class="bg-foreground text-white p-4 flex justify-between items-center px-8 border-b-2 border-b-white">
    <h1 class="text-xl font-bold">
      tock_tock
    </h1>
    
    <div class="flex items-center">
      
      <Button class="text-red mr-4 bg-foreground">
        <NuxtLink class="text-secondary/70" to="/">
          Home
        </NuxtLink>
      </Button>
      
      <Button class="color-primary/90 mr-4 bg-foreground">
        <NuxtLink class="text-secondary/70" to="/portfolio">
          Portfolio
        </NuxtLink>
      </Button>

      <Menubar class="bg-foreground border-0">
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


</script>

<style >

.router-link-exact-active {
  color: white;
}

</style>