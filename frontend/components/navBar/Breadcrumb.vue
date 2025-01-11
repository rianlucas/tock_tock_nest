<template>
  <nav class="flex items-center space-x-1 text-sm text-muted-foreground">
    <!-- <Breadcrumb>
      <BreadcrumbItem v-for="(crumb, index) in breadcrumbs" :key="index">
        <BreadcrumbLink v-if="index !== breadcrumbs.length - 1">
          {{ crumb.name }}
        </BreadcrumbLink>
        <span v-else>{{ crumb.name }}</span>
      </BreadcrumbItem>
    </Breadcrumb> -->


    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <!-- <BreadcrumbSeparator class="hidden md:block" /> -->

        <div class="flex items-center my-auto" v-for="(crumb, index) in breadcrumbs" :key="index">
          <BreadcrumbSeparator class="hidden md:block pr-2" />
          <BreadcrumbItem class="hidden md:block" >
            <BreadcrumbLink v-if="index !== breadcrumbs.length - 1" :href="crumb.path">
              {{ crumb.name }}
            </BreadcrumbLink>
            <span v-else>{{ crumb.name }}</span>
          </BreadcrumbItem>
        </div>
      </BreadcrumbList>
    </Breadcrumb>



  </nav>
</template>

<script setup>
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Computa os breadcrumbs com base na rota atual
const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter((p) => p);
  console.log(paths)
  return paths.map((segment, index) => {
    const path = "/" + paths.slice(0, index + 1).join("/");
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { path, name };
  });
});


// console.log(breadcrumbs.value);
</script>
