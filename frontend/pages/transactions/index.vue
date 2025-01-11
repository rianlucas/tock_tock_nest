<script setup lang="ts">
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
import { Badge } from '@/components/ui/badge'
import { definePageMeta } from '@/.nuxt/imports';

definePageMeta({
  layout: 'logged-user',
})

const transactions = [
  {
    date: '2021-10-10',
    ticket: 'BBAS3',
    type: 'Buy',
    quantity: 100,
    price: 24.60,
    total: 2460.00,
    fee: 10.00,
    net: 2450.00,
  },
  {
    date: '2021-10-10',
    ticket: 'BBAS3',
    type: 'Sell',
    quantity: 100,
    price: 23.80,
    total: 2380.00,
    fee: 10.00,
    net: 2370.00,
  }
]

</script>

<template>
  <div>
    <PageTitle title="Transactions" />
    

    <Table class="pt-4">
      <TableCaption>A list of your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Ticket</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>Net</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="transaction in transactions" :key="transaction.date">
          <TableCell class="font-medium">
            {{ transaction.date }}
          </TableCell>
          <TableCell>{{ transaction.ticket }}</TableCell>
          <TableCell>
            <Badge :variant="transaction.type === 'Buy' ? 'secondary' : 'destructive'">
              {{ transaction.type }}  
            </Badge>
          </TableCell>
          <TableCell>{{ transaction.quantity }} </TableCell>
          <TableCell>R${{ transaction.price }}</TableCell>
          <TableCell>R${{ transaction.total }}</TableCell>
          <TableCell>R${{ transaction.fee }}</TableCell>
          <TableCell>R${{ transaction.net }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>