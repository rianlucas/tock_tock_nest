<script setup lang="ts">
import PageTitle from '@/components/ui/page-title/PageTitle.vue';

definePageMeta({
  layout: "logged-user"
})

</script>
<template>
  <div class="bg-slate-900 p-6 rounded-xl ">
    <PageTitle class="ml-1" title="Perfil"/>

    <!-- TODO: create a component to profile navBar -->
    <div class="flex flex-col md:grid sm:grid-cols-[20%_80%] md:grid-cols-[15%_85%] grid-cols-[10%_90%] bg-background rounded-xl p-4 mt-8">
      <div class="flex md:flex-col pb-4 border-b md:pb-0 md:border-r md:border-b-0 max-w min-w-[105px]">
        <div class="ml-3">
          <Button class="rounded-3xl " :class="{'bg-emerald-200 text-emerald-900 hover:bg-emerald-200 hover:text-emerald-950': $route.path === '/profile'}" variant="ghost">
            Meu perfil
          </Button>
        </div>
        <div class="ml-3">
          <Button class="rounded-3xl hover:text-emerald-200 hover:bg-background" variant="ghost"  @click="$router.push('#')">
            Segurança
          </Button>
        </div>
        <div class="ml-3">
          <Button class="rounded-3xl" variant="ghost">
            Assinaturas
          </Button>
        </div>
      </div>

      <div class="flex flex-col px-7 pt-3">
        <h1 class="font-bold text-lg">Meu perfil</h1>

        <ProfileCardAvatar/>
        <ProfileCardBase
          title="Informações Pessoais"
          :information-fields="[
          {
            label: 'Primeiro Nome',
            value: 'Rian Lucas'
          },
          {
            label: 'Sobrenome',
            value: 'Gomes Candido'
          },
          {
            label: 'Email',
            value: 'rian@email.com'
          },
          {
            label: 'Phone',
            value: '+55 99 9999-9999'
          },
          ]"
        />
        <ProfileCardBase
          title="Endereço"
          :information-fields="[
          {
            label: 'País',
            value: 'Brasil'
          },
          {
            label: 'Cidade/Estado',
            value: 'João Pessoa, Paraíba'
          },
          {
            label: 'CEP',
            value: '12345-678'
          },
          ]"
        />
      </div>
    </div>


  </div>
</template>