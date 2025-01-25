<script setup lang="ts">
import { ref } from 'vue';
import {
  type DateValue,
  getLocalTimeZone,
  DateFormatter,
} from '@internationalized/date'
import { Calendar as CalendarIcon, Pencil } from 'lucide-vue-next'

const value = ref<DateValue>()
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

interface Props {
  onSubmit: (asset: Asset) => void
}
defineProps<Props>()

</script>


<template>
  <Dialog>
    <DialogTrigger as-child>
      <Pencil
        :size="16"
        class="btn btn-primary cursor-pointer hover:text-blue-500 transition-colors"
      />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar transação</DialogTitle>
        <DialogDescription>
          Edite sua transação aqui. Clique em salvar quando estiver terminado.
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
        <DialogTrigger>

          <Button type="submit" @click="onSubmit">
            Salvar
          </Button>
        </DialogTrigger>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>