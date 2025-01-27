<script setup lang="ts">
import { Pencil } from 'lucide-vue-next';

interface Props { 
  title: string,
  informationFields: { label: string; value: string; }[]
}

defineProps<Props>()

</script>

<template>
  <Card class="mt-4">
    <CardHeader>
      <div class="flex justify-between items-center">
        <CardTitle class="text-lg md:text-xl">
          {{ title }}
        </CardTitle>
        <Button 
          class="text-sm rounded-lg md:h-10 h-9" 
          variant="outline"
        > 
          <span class="hidden md:block">Edit</span>
          <Pencil class="h-3 w-3 md:h-4 md:w-4"/>
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4">
        <div class="grid md:grid-cols-2 gap-4" >
          <div v-for="field in informationFields">
            <p class="text-gray-400 text-xs md:text-sm">{{ field.label }}</p>
            <p class="mt-1 text-sm md:text-base">{{ field.value }}</p>
          </div>
        </div>
      </div>

    </CardContent>
  </Card>
</template>