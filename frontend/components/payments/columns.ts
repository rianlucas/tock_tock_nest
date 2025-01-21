import { formatCurrency } from './../../utils/format-currency-type';
import type { ColumnDef } from '@tanstack/vue-table';
import Badge from '../ui/badge/Badge.vue';
import { Checkbox } from '../ui/checkbox';
import { Pencil, Trash2 } from 'lucide-vue-next';

export type Transaction = {
  date: string;
  ticket: string;
  type: string;
  quantity: number;
  price: number;
  total: number;
  fee: number;
  net: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return h(
        'div',
        { class: 'font-medium' },
        date.toLocaleDateString('pt-BR'),
      );
    },
  },
  {
    accessorKey: 'ticket',
    header: 'Ticket',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type');
      if (type === 'Buy') {
        return h(
          h(Badge, {
            type,
            variant: 'secondary',
          }),
          type,
        );
      }
      return h(
        h(Badge, {
          type,
          variant: 'destructive',
        }),
        type,
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
    cell: ({ row }) => {
      const quantity = row.getValue('quantity');
      return h('div', { class: 'font-medium flex justify-center' }, quantity);
    },
  },
  {
    accessorKey: 'price',
    header: () => h('div', 'Preço'),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'));
      const formattedPrice = formatCurrency(price);

      return h('div', { class: 'font-medium' }, formattedPrice);
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const total = Number.parseFloat(row.getValue('total'));

      return formatCurrency(total);
    },
  },
  {
    accessorKey: 'fee',
    header: 'Fee',
    cell: ({ row }) => {
      const fee = Number.parseFloat(row.getValue('fee'));

      return formatCurrency(fee);
    },
  },
  {
    accessorKey: 'net',
    header: 'Net',
    cell: ({ row }) => {
      const net = Number.parseFloat(row.getValue('net'));

      return formatCurrency(net);
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row }) => {
      const ticket = row.getValue('ticket');
      return h('div', { class: 'flex gap-2' }, [
        h(Pencil, {
          size: 16,
          class:
            'btn btn-primary cursor-pointer hover:text-blue-500 transition-colors',
          onClick: () => {
            console.log(`Refund ticket ${ticket}`);
          },
        }),
        h(Trash2, {
          class:
            'btn btn-primary cursor-pointer hover:text-red-500 transition-colors',
          size: 16,
          onClick: () => {
            console.log(`Refund ticket ${ticket}`);
          },
        }),
      ]);
    },
  },
];
