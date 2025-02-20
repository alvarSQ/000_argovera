<script setup lang="ts">
import { useAllStore } from '@/stores/all';

const allStore = useAllStore();
const brandsStore = useBrandsStore();

const { productsByBrands } = storeToRefs(useBrandsStore());
const { isLoading } = storeToRefs(useAllStore());

const route = useRoute('brands-slug');
const slug = computed(() => route.params.slug);

const {} = await useAsyncData(
  'brand',
  async () => {
    await brandsStore.loadBrands(slug.value.toString());
  }
);

// await callOnce(() => brandsStore.loadBrands(slug.value.toString()))

// onMounted(async () => {
  // await brandsStore.loadBrands(slug.value.toString());
  // allStore.getBreadCrumbs(productsByCategory.value.category.id, '', 0)
// })
</script>

<template>
  <span class="title"  v-if="!isLoading">{{ productsByBrands.brand.name }}</span>
  <UIPreloader v-if="isLoading" />
  <div class="products-list" v-else>
    <template v-for="product in productsByBrands.products" :key="product.id">
      <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }">
        <UICardProduct :image="product.image" :price="product.price" :name="product.name" />
      </NuxtLink>
    </template>
  </div>
</template>

<style lang=" scss" scoped>
</style>
    