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
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { valueUpdater } from '@/utils/value-table-updater';
import { Calendar as CalendarIcon } from 'lucide-vue-next'


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
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() { return columnFilters.value },
  }
})
</script>

<template>
  <div class="min-w-0">

    <div class="flex items-center py-4 gap-2 justify-between">
      <Input class="max-w-sm" placeholder="Filter emails..."
      :model-value="table.getColumn('ticket')?.getFilterValue() as string"
      @update:model-value=" table.getColumn('ticket')?.setFilterValue($event)" />
    
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            Nova transação
          </Button>
        </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova transação</DialogTitle>
              <DialogDescription>
                Adicione uma nova transação. Clique em adicionar quando estiver pronto. 
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="ticket" class="text-right">
                  Ticket
                </Label>
                <Input id="ticket" default-value="BBAS3" class="col-span-3" />
              </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="quantity" class="text-right">
                Quantidade
              </Label>
              <Input id="quantity" default-value="32" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right whitespace-nowrap">
                Preço Unitário
              </Label>
              <Input id="username" default-value="26,76" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="taxa" class="text-right">
                Taxa
              </Label>
              <Input id="taxa" default-value="2,52" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right">
                Data
              </Label>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    variant="outline"
                    :class="cn(
                      'w-[280px] justify-start text-left font-normal',
                      !value && 'text-muted-foreground',
                    )"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Escolha uma data" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="value" initial-focus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  </div>
</template>