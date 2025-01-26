<script setup lang="ts">
import { Pencil } from 'lucide-vue-next';

</script>

<template>
  <div class="border rounded-xl p-4 flex justify-between items-center mt-4">
    <div class="flex gap-4">
      <Avatar/>
      <div>
        <p>Rian Lucas</p>
        <p class="text-gray-400 text-sm">João Pessoa - PB</p>
      </div>
    </div>
    <Button class="text-sm rounded-lg mr-2" variant="outline"> 
      Edit
      <Pencil :size="8"/>
    </Button>
  </div>
</template>