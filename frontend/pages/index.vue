<template>
  <div class=" min-w-0">

      <PageTitle title="Portfolio"/>
      <HomeInvestmentCards
        :cards="investmentCardsMock"
      />

      <Card class="grid md:grid-cols-2 mt-10 border bg-background border-border">

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

        <div>
          <h1>Tabela/Gráfico com as maiores posições da carteira</h1>
        </div>


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
import BarChart from '@/components/ui/chart-bar/BarChart.vue';

import { Home } from 'lucide-vue-next';
import HomeInvestmentCards from '~/components/card/HomeInvestmentCards.vue';
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
import { investmentCardsMock } from '~/mocks/investments-cards';

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