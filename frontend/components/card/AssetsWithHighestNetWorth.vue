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

const highestAssets = [
  { image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.rawpixel.com%2Fprivate%2Fstatic%2Fimages%2Fwebsite%2F2023-02%2Frm467-cryptocurrency-013-x.jpg%3Fw%3D1200%26h%3D1200%26dpr%3D1%26fit%3Dclip%26crop%3Ddefault%26fm%3Djpg%26q%3D75%26vib%3D3%26con%3D3%26usm%3D15%26cs%3Dsrgb%26bg%3DF4F4F3%26ixlib%3Djs-2.2.1%26s%3D9fbae90a3ec389bb25fb565ceeb694ee&f=1&nofb=1&ipt=a0dfa90180e149ebdf2a50e92ba82e7945c66fbc65226b3b42e64787da38414f&ipo=images', name: 'Bitcoin', value: '1.000.000' },
  { image: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F04%2FApple-logo-wallpapers-HD.png&f=1&nofb=1&ipt=56f18060e6560bd2b2a3d06b6290fc0581b780ac4914ad668d5e5b932009fee8&ipo=images', name: 'Apple', value: '500.000' },
  { image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnews-cdn.softpedia.com%2Fimages%2Fnews2%2FMicrosoft-Redesigns-Its-Logo-for-the-First-Time-in-25-Years-Here-It-Is-3.png&f=1&nofb=1&ipt=398e69e5174c8871b234d2f51ccf4a0f3b5eeb6f12ed1e1d613e56258e108c29&ipo=images', name: 'Microsoft', value: '300.000' },
  { image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.2WiqonFlHiBEbTcKMaHQIgHaHa%26pid%3DApi&f=1&ipt=7d39b8c5e168091c016797ac52439189ba6fcb63b2396a1fd8e5826556f11cf1&ipo=images', name: 'Amazon', value: '200.000' },
  { image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.k1NHXWoQk4ZhlSDePDRZOwHaE8%26pid%3DApi&f=1&ipt=5989de16eb2ad241fbf199fc33143ca7b14efcee73db67578d78f4dab9223230&ipo=images', name: 'Disney', value: '100.000' },
]

</script>

<template>

  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Ativo</TableHead>
          <TableHead>Patrimônio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="asset in highestAssets" :key="asset.name">
          <TableCell>
            <Avatar
              shape="square"
              size="sm"
              class="mr-2">
              <AvatarImage :src="asset.image"/>
              <AvatarFallback>{{ asset.name }}</AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell>{{ asset.name }}</TableCell>
          <TableCell class="whitespace-nowrap">R$ {{ asset.value }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

</template>