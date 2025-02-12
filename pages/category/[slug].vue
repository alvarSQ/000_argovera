<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';
const route = useRoute('category-slug');

const сategoriesStore = useСategoriesStore();
const { productsByCategory } = storeToRefs(useСategoriesStore());
const { breadCrumbs, isLoading } = storeToRefs(useAllStore());

const slug = computed(() => route.params.slug);

await callOnce(() => сategoriesStore.loadCategories('', slug.value))

// const getBreadCrumbs = () => {
//   breadCrumbs.value = [];
//   breadCrumbs.value.push(titleCategory.value.toLowerCase());
// };

// const titleCategory = computed(() => {
//   let str = slug.value.replace('-', ' ');
//   return str.toUpperCase();
// });

onMounted(() => {
  сategoriesStore.loadCategories('', slug.value);
  // getBreadCrumbs()
})
</script>

<template>
  <span class="title">{{ productsByCategory.category.name }}</span>
  <UIPreloader v-if="isLoading" />
  <div class="products-list" v-else>
    <!-- <div v-if="!productsByCategory.category.name">
      <template v-for="children in productsByCategory.category.children" :key="children.id">
        <NuxtLink :to="{ name: 'categories-slug', params: { slug: product.slug } }">
          <UICardProduct :image="product.image" :price="product.price" :name="product.name" />
        </NuxtLink>
      </template>
    </div> -->

    <template v-for="product in productsByCategory.category.products" :key="product.id">
      <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }">
        <UICardProduct :image="product.image" :price="product.price" :name="product.name" />
      </NuxtLink>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
