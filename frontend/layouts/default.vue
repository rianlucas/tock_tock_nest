<template>
  <div class="bg-background">
    <div>
      <NavBar/>
    </div>
    <div class="max-w-screen-lg justify-center h-screen mx-auto pt-6">
      <NuxtPage/>
    </div>
  </div>
</template>

<script setup>

import NavBar from '@/components/navBar/NavBar.vue';

</script>