<script lang="ts" setup>

interface Props {
  name: string
  size: 'default' | 'sm' | 'lg' | 'icon'
  path: string
}

defineProps<Props>();
</script>

<template>
  <div class="md:ml-3">
    <Button :size="size" class="rounded-3xl" :class="{'bg-emerald-200 text-emerald-900 hover:bg-emerald-200 hover:text-emerald-950': $route.path === path}" variant="ghost">
      {{ name }}
    </Button>
  </div>
</template>