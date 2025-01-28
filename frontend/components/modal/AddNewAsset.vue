<script setup lang="ts">
import { ref } from 'vue';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import type { Asset, CreateTransactionSchema, Transaction } from '@/types';

interface Props {
  onSubmit: (transaction: CreateTransactionSchema) => void
  title: string
  description: string
  buttonText: string
  triggerButton?: any
}

const props = defineProps<Props>()

const value = ref<DateValue>()
  const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const ticket = ref<number>();
const quantity = ref<number | string>('');
const transactionType = ref<'buy' | 'sell'>('buy');
const unitPrice = ref<number | string>('');
const tax = ref<number>();
const wallet = ref<number>(1);

const submitForm = () => {
  if (!ticket.value || !quantity.value || !unitPrice.value || !tax.value || !value.value) {
    console.log("Please fill in all fields.");
    return;
  }

  const transaction: CreateTransactionSchema = {
    type: transactionType.value,
    quantity: Number(quantity.value),
    amount: Number(unitPrice.value) * Number(quantity.value),
    assetId: ticket.value,
    walletId: wallet.value
  };
  props.onSubmit(transaction);
};

</script>


<template>
  <Dialog>
    <DialogTrigger as-child>
      <template v-if="triggerButton">
        <component 
          :is="triggerButton"
          :size="16"
          class="btn btn-primary cursor-pointer hover:text-blue-500 transition-colors"
          stroke-width="2"
        />
      </template>
      <template v-else>
        <Button variant="outline">
          {{ title }}
        </Button>
      </template>
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ description }} 
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="ticket" class="text-right">
            Ticket
          </Label>
          <Input v-model="ticket" id="ticket" class="col-span-3" placeholder="Digite o ticket do ativo"/>
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="quantity" class="text-right">
            Quantidade
          </Label>
          <Input v-model="quantity" id="quantity" class="col-span-3" placeholder="Digite a quantidade " />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right whitespace-nowrap">
            Preço Unitário
          </Label>
          <Input v-model="unitPrice" id="username" class="col-span-3" placeholder="Digite o preço de cada ativo" />
        </div>

        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="taxa" class="text-right">
            Taxa
          </Label>
          <Input v-model="tax" id="taxa" class="col-span-3" placeholder="Digite a taxa da transação"/>
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
        <Button type="button" @click="submitForm">
          {{ buttonText }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
