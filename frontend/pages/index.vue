<template>
  <div class=" min-w-0">

      <PageTitle title="Portfolio"/>
      <HomeInvestmentCards
        :cards="investmentCardsMock"
      />

      <div class="grid md:grid-cols-[70%_30%] gap-4 mt-10 bg-background pr-4">
        <Card v-for="card in cards" :key="card.component">
  
          <div>
            <CardHeader>
              <h1 class="text-primary font-sans text-xl font-bold">{{ card.title }}</h1>
            </CardHeader>
            <CardContent>
              <component
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
                :is="card.component"
              />
            </CardContent>
          </div>
        </Card>
      </div>
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
import BarChart from '@/components/ui/chart-bar/BarChart.vue';

import { Home } from 'lucide-vue-next';
import HomeInvestmentCards from '~/components/card/HomeInvestmentCards.vue';
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
import { investmentCardsMock } from '~/mocks/investments-cards';

const cards = [
  {
    "title": "Valor investido x patrimônio",
    "component": BarChart,
  },
  {
    "title": "Tabela/Gráfico mostrando maiores altas, maiores baixas, ou ativos mais investidos",
    "component": PageTitle,
  }
]

const data = [
  { name: 'Jan', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', patrimônio: Math.floor(Math.random() * 2000) + 500, investido: Math.floor(Math.random() * 2000) + 500 },
]
</script>