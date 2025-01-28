<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  CalendarDate,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar';
import { ref } from 'vue';
import { definePageMeta } from '@/.nuxt/imports';
import { toast } from '@/components/ui/toast/use-toast';

definePageMeta({
  layout: 'logged-user',
})

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>(new CalendarDate(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  new Date().getDate()
))

const wallet = [
  {
    ticket: "BBAS3",
    quantity: 100,
    averagePrice: 24.60,
    currentPrice: 23.80,
    totalValue: 2380.00,
    profitLoss: -80.00
  }
]

const onSubmit = () => {
  toast({
    title: "Transação criada",
    description: "Sua transação foi adicionada com sucesso!!",
    variant: "default"
  })
  console.log('onAdd')
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <PageTitle title="Carteira"/>
      <ModalAddNewAsset 
        :on-submit="onSubmit"
        title="Nova transação"
        description="Adicione uma nova transação. Clique em adicionar quando estiver pronto."
        button-text="Adicionar"
      />
    </div>    

    <Table class="pt-4">
      <TableCaption>Listagem dos seus ativos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            Ticket
          </TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Preço Médio</TableHead>
          <TableHead >
            Preço Atual
          </TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Ganho/Perda</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="asset in wallet" :key="asset.ticket">
          <TableCell class="font-medium">
            {{ asset.ticket }}
          </TableCell>
          <TableCell>{{ asset.quantity }}</TableCell>
          <TableCell>R${{ asset.averagePrice }}</TableCell>
          <TableCell>R${{ asset.currentPrice }} </TableCell>
          <TableCell>R${{ asset.totalValue }}</TableCell>
          <TableCell>R${{ asset.profitLoss }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Toaster/>
  </div>



</template>