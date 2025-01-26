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
        <CardTitle>
          {{ title }}
        </CardTitle>
        <Button class="text-sm rounded-lg" variant="outline"> 
          Edit
          <Pencil :size="8"/>
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4" >
          <div v-for="field in informationFields">
            <p class="text-gray-400 text-sm">{{ field.label }}</p>
            <p class="mt-1">{{ field.value }}</p>
          </div>
        </div>
      </div>

    </CardContent>
  </Card>
</template>