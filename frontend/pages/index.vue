<template>
  <div class=" min-w-0">

      <PageTitle title="Portifolio"/>
      <HomeInvestmentCards
        :cards="investmentCardsMock"
      />

      <div class="grid md:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] gap-4 mt-10 bg-background pr-4">
        <Card>
  
          <div>
            <CardHeader>
              <h1 class="text-primary font-sans text-xl font-bold">Valor investido x patrimônio</h1>
            </CardHeader>
            <CardContent>
              <BarChart
                :data="data"
                index="name"
                :show-grid-line="false"
                :rounded-corners="3"
                type="grounded"
                :categories="['patrimônio', 'investido']"
                :y-formatter="(tick, i) => {
                  return typeof tick === 'number'
                    ? `R$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                    : ''
                }"
              />
            </CardContent>
          </div>
        </Card>
        <Card class="overflow-x-scroll">
          <div>
            <CardHeader>
              <h1 class="text-primary font-sans text-xl font-bold">Ativos com maior patrimônio</h1>
            </CardHeader>
            <CardContent>
              <AssetsWithHighestNetWorth/>
            </CardContent>
        </div>
        </Card>
      </div>
    </div>
    
</template>

<script setup="ts">
import AssetsWithHighestNetWorth from '@/components/card/AssetsWithHighestNetWorth.vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import BarChart from '@/components/ui/chart-bar/BarChart.vue';

import { Home } from 'lucide-vue-next';
import HomeInvestmentCards from '~/components/card/HomeInvestmentCards.vue';
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
import { investmentCardsMock } from '~/mocks/investments-cards';

const data = [
  { name: 'Jan', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Fev', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Abr', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mai', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Set', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Out', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Nov', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Dez', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
]

const cards = [
  {
    title: "Valor investido x patrimônio",
    component: BarChart,
    props: {
      data: data,
      showGridLine: false,
      roundedCorners: 3,
      type: "grounded",
      yFormatter: (tick, i) =>
        typeof tick === 'number'
          ? `R$ ${new Intl.NumberFormat('us').format(tick).toString()}`
          : ''
    },
  },
  {
    "title": "Ativos com maior patrimônio",
    "component": AssetsWithHighestNetWorth,
  }
]


</script>