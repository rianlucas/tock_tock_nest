<template>
  <div class="justify-center">

      <PageTitle title="Portfolio"/>
      <HomeInvestmentCards
        :cards="investmentCardsMock"
      />

      <Card class=" mt-10 border bg-background border-[#3D4A52]">
        <CardHeader>
          <h1 class="text-primary text-xl">Portfolio value over time</h1>
        </CardHeader>
        <AreaChart 
          class="max-h-[300px] py-10"
          :colors="['hsl(var(--primary))']"
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
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
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