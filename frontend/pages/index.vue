<template>
  <div class="justify-center">

      <h1 class="text-3xl text-white font-bold">Portfolio</h1>
      <HomeInvestmentCards
        :cards="investmentCardsMock"
      />

      <Card class=" mt-10 border bg-foreground border-[#3D4A52]">
        <CardHeader>
          <h1 class="text-white text-xl">Portfolio value over time</h1>
        </CardHeader>
        <AreaChart 
          class="max-h-[300px] py-10"
          :colors="['white']"
          curve-type="natural"
          :show-grid-line="false"
          :show-legend="false"
          :show-x-axis="true"
          :show-y-axis="false"
          :data="data" index="name" :categories="['total']" />
      </Card>
    </div>
    
    
</template>

<script setup="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Home } from 'lucide-vue-next';
import HomeInvestmentCards from '~/components/card/HomeInvestmentCards.vue';
import { investmentCardsMock } from '~/mocks/investments-cards';

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500},
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500},
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500},
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500},
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500},
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500},
  { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500},
]
</script>