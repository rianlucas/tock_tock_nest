<script setup lang="ts">
  const props = defineProps({
    title: String
  })
</script>

<template>
  <h1 class="text-3xl text-primary font-bold my-4">{{ props.title }}</h1>
</template>