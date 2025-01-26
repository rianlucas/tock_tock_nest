import { formatCurrency } from './../../utils/format-currency-type';
import type { ColumnDef } from '@tanstack/vue-table';
import Badge from '../ui/badge/Badge.vue';
import { Checkbox } from '../ui/checkbox';
import { Pencil, Trash2 } from 'lucide-vue-next';
import DeleteModal from "@/components/modal/Delete.vue";
import Edit from "@/components/modal/Edit.vue";
import AddNewAsset from '../modal/AddNewAsset.vue';
import { useToast } from '../ui/toast/use-toast.js';

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

const { toast } = useToast()

export const columns: ColumnDef<Transaction>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) =>
  //     h(Checkbox, {
  //       checked:
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate'),
  //       'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
  //       ariaLabel: 'Select all',
  //     }),
  //   cell: ({ row }) =>
  //     h(Checkbox, {
  //       checked: row.getIsSelected(),
  //       'onUpdate:checked': (value) => row.toggleSelected(!!value),
  //       ariaLabel: 'Select row',
  //     }),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    header: 'Taxa',
    cell: ({ row }) => {
      const fee = Number.parseFloat(row.getValue('fee'));

      return formatCurrency(fee);
    },
  },
  {
    accessorKey: 'net',
    header: 'Líquido',
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
        h(Edit, {
          onSubmit: () => {
            toast({
              title: "Transação atualizada",
              description: "Sua transação foi atualizada com sucesso!!",
              variant: "default"
            })
            console.log(`Editing ticket ${ticket}`)
          }
        }),
        h(DeleteModal, {
            title: "Você tem certeza que deseja deletar a transação ?",
            description: "Essa ação não pode ser desfeita. Isso vai excluir permanentemente a transação\n" +
              "          e remover o registro do nosso servidor.",
            onSubmit: () => {
              toast({
                title: "Transação deletada",
                description: "Sua transação foi deletada com sucesso!!",
                variant: "destructive"
              })
              console.log(`Deleting ticket ${ticket}`);
            },
        }),
      ]);
    },
  },
];
