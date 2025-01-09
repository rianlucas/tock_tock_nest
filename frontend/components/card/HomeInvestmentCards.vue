<template>
  <div class="flex flex-1 flex-col gap-4 pt-0">
    <div class="grid gap-4 auto-rows-min md:grid-cols-3">
      <Card 
        class="flex-1 bg-background border-[#3D4A52] text-primary"
        v-for="(data, index) in cards"
        :key="index"
      >
        <CardHeader>
          <p class="text-lg">{{ data.title }}</p>
        </CardHeader>
        <CardContent>
          <CardTitle class="font-bold text-primary">
            {{ data.title === 'PL' && data.value > 0 ? `${data.value}%` : `R$ ${data.value}` }}   
          </CardTitle>
          <CardDescription 
            :class='[
              "text-base mt-2",
              data.variation < 0 ? "text-red-400" : "text-green-400"
            ]'>
            <template v-if="data.title === 'Atual'">
              {{ data.variation >= 0 ? '+' : '' }}R${{ data.variation }}
            </template>
            <template v-else>
              {{ data.variation >= 0 ? '+' : '' }}{{ data.variation }}%
            </template>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">

interface InvestmentCard {
  title: string,
  value: number;
  variation: number;
}

const props = defineProps<{
  cards: InvestmentCard[]
}>();

</script>