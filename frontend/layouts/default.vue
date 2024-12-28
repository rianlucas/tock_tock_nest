<template>
  <div class="bg-background  h-screen">
    <div>
      <NavBar/>
    </div>
    <div class="max-w-screen-lg justify-center mx-auto pt-6">
      <NuxtPage/>
    </div>
  </div>
</template>

<script setup>

import NavBar from '@/components/navBar/NavBar.vue';

</script>