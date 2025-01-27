<script setup lang="ts">
import { Pencil } from 'lucide-vue-next';
import { ref, computed } from 'vue';

interface Props {
  size: "base" | "sm"
}

const props = defineProps<Props>()
</script>

<template>
  <div class="border rounded-xl p-4 flex justify-between items-center mt-4">
    <div class="flex  gap-4 items-center">
      <Avatar :size="size">
        <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fa.storyblok.com%2Ff%2F191576%2F1200x800%2Fa3640fdc4c%2Fprofile_picture_maker_before.webp&f=1&nofb=1&ipt=53077380c4f02237eae24f140fa1a9b8d5a505b08163e925992b25f1739b14af&ipo=images"/>
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div class="pr-2">
        <p class="whitespace-nowrap text-sm md:text-base">Rian Lucas</p>
        <p class="text-gray-400 text-xs md:text-sm">João Pessoa - PB</p>
      </div>
    </div>
    <Button class="text-sm rounded-lg mr-2" variant="outline"> 
      <span class="hidden md:block">Edit</span>
      <Pencil :size="8"/>
    </Button>
  </div>
</template>