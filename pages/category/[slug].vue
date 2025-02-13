<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';
import { useAllStore } from '@/stores/all';

const allStore = useAllStore();
const сategoriesStore = useСategoriesStore();

const { activeCategoryChain } = storeToRefs(useAllStore());
const { productsByCategory } = storeToRefs(useСategoriesStore());
const { breadCrumbs, isLoading } = storeToRefs(useAllStore());

const route = useRoute('category-slug');
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
  allStore.getBreadCrumbs(0)
})
</script>

<template>
  <span class="title">{{ productsByCategory.category.name }}</span>
  <UIPreloader v-if="isLoading" />
  <div class="products-list" v-else>
    <template v-for="children in productsByCategory.category.children" :key="children.id">
      <NuxtLink :to="{ name: 'category-slug', params: { slug: children.slug } }">
        <UICardProduct image="0106.gif" :name="children.name" :caterory="true" @click="allStore.activeElement(children.id)" />
      </NuxtLink>
    </template>

    <template v-for="product in productsByCategory.category.products" :key="product.id">
      <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }">
        <UICardProduct :image="product.image" :price="product.price" :name="product.name" />
      </NuxtLink>
    </template>
  </div>
</template>

<style lang=" scss" scoped>
          </style>
    