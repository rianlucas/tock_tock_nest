<template>
  <div class="bg-foreground h-screen  justify-center">

    <div class="max-w-screen-lg justify-center mx-auto pt-6">
      <h1 class="text-3xl text-white font-bold">Portfolio</h1>
      <HomeInvestmentCards
        :cards="investmentCardsMock"
      />
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
import { Home } from 'lucide-vue-next';
import HomeInvestmentCards from '~/components/card/HomeInvestmentCards.vue';
import { investmentCardsMock } from '~/mocks/investments-cards';
</script>