<script setup lang="ts">
import PageTitle from '~/components/ui/page-title/PageTitle.vue';
import { definePageMeta } from '@/.nuxt/imports';
import DataTable from '@/components/payments/DataTable.vue';
import { columns, type Transaction } from '@/components/payments/columns';
import { ref } from 'vue';
import { valueUpdater } from '@/utils/value-table-updater';
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable, type ColumnFiltersState, type ExpandedState, type SortingState, type VisibilityState } from '@tanstack/vue-table';

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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
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
    ticket: 'IVVB11',
    type: 'Sell',
    quantity: 8,
    price: 401.20,
    total: 3290.6,
    fee: 10.00,
    net: 3280.6,
  },
]


const data = ref<Transaction[]>([])

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => console.log(updaterOrValue, columnFilters.value),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})

</script>

<template>
  <div>
    <PageTitle title="Transações" />
    
    <DataTable :columns="columns" :data="transactions"/>
  </div>
</template>