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
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar';
import { ref } from 'vue'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()

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
      <PageTitle title="Carteira"/>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            Add a position
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a position</DialogTitle>
            <DialogDescription>
              Add a new asset here. Click save when you're done. 
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
                Quantity
              </Label>
              <Input id="quantity" default-value="32" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right">
                Unit Price
              </Label>
              <Input id="username" default-value="26,76" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right">
                Date
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
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
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
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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