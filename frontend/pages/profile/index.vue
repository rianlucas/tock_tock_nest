<script setup lang="ts">
import PageTitle from '@/components/ui/page-title/PageTitle.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

definePageMeta({
  layout: "logged-user"
})


const screenSize = ref<'base' | 'sm'>('base');
const buttonSize = ref<'default' | 'sm' | 'lg' | 'icon'>('default');

const updateScreenSize = () => {
  screenSize.value = window.innerWidth < 640 ? 'sm' : 'base'; 
  buttonSize.value = window.innerWidth < 640 ? 'sm' : 'default'; 
};

onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

</script>
<template>
  <div class="bg-slate-900 p-6 rounded-xl ">
    <PageTitle class="ml-1" title="Perfil"/>

    <div class="flex flex-col md:grid sm:grid-cols-[20%_80%] md:grid-cols-[15%_85%] grid-cols-[10%_90%] bg-background rounded-xl p-4 md:pl-0 xl:pl-4 mt-8">
      <div class="flex md:flex-col pb-4 border-b md:pb-0 md:border-r md:border-b-0 max-w-[150px] min-w-[105px] box-border">
        <ProfileNavBarLinks 
          path="/profile"
          :size="buttonSize"
          name="Meu perfil"
        />
        <ProfileNavBarLinks 
          path="/security"
          :size="buttonSize"
          name="Segurança"
        />
        <ProfileNavBarLinks 
          path="/subscriptions"
          :size="buttonSize"
          name="Assinaturas"
        />
      </div>

      <div class="flex flex-col px-7 pt-3">
        <h1 class="font-bold text-lg">Meu perfil</h1>

        <ProfileCardAvatar :size="screenSize"/>
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