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
import PageTitle from '~/components/ui/page-title/PageTitle.vue';

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
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <PageTitle title="Wallet"/>
      <!-- TODO: create modal to add a new position -->
      <Button variant="outline">
        Add a position
      </Button>
    </div>


    <Table class="pt-4">
      <TableCaption>A list of your assets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">
            Ticket
          </TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Average price</TableHead>
          <TableHead >
            Current Price
          </TableHead>
          <TableHead>Total value</TableHead>
          <TableHead>Profit/Loss</TableHead>
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
  </div>



</template>