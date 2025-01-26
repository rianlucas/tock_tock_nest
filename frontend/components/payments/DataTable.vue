<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState } from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { valueUpdater } from '@/utils/value-table-updater';
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useToast } from '../ui/toast/use-toast.js'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()
const value = ref<DateValue>()
const columnFilters = ref<ColumnFiltersState>([])
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() { return columnFilters.value },
  },
})

const { toast } = useToast()

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
  <div class="min-w-0">

    <div class="flex items-center py-4 gap-2 justify-between">
      <Input class="max-w-sm" placeholder="Filtrar tickets"
      :model-value="table.getColumn('ticket')?.getFilterValue() as string"
      @update:model-value=" table.getColumn('ticket')?.setFilterValue($event)" />
    
      <ModalAddNewAsset
        :on-submit="onSubmit"
        title="Nova transação"
        description="Adicione uma nova transação. Clique em adicionar quando estiver pronto."
        button-text="Adicionar"
      />
    </div>
    <div class="border rounded-lg">
    <Table class="">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        Página {{ table.getState().pagination.pageIndex + 1 }} de
        {{ table.getPageCount() }}
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Próxima
        </Button>
      </div>
    </div>
  </div>
</template>