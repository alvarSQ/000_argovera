<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';
const route = useRoute('category-slug');

const сategoriesStore = useСategoriesStore();
const { productsByCategory } = storeToRefs(useСategoriesStore());
const { breadCrumbs, isLoading } = storeToRefs(useAllStore());

const slug = computed(() => route.params.slug);

await callOnce(() => сategoriesStore.loadCategories(slug.value))

const getBreadCrumbs = () => {
  breadCrumbs.value = [];
  breadCrumbs.value.push(titleCategory.value.toLowerCase());
};

const titleCategory = computed(() => {
  let str = slug.value.replace('-', ' ');
  return str.toUpperCase();
});

const { findOne} = useStrapi()

const response = await findOne('product', 'argozid-forte')


  


onMounted(() => {
  console.log(response);
  
  сategoriesStore.loadCategories(slug.value);
  getBreadCrumbs()
})
</script>

<template>
  <span class="title">{{ titleCategory }}</span>
  <UIPreloader v-if="isLoading" />
  <div class="products-list" v-else>
    <template v-for="product in productsByCategory" :key="product.id">
      <NuxtLink :to="{ name: 'products-slug', params: { slug: product.id } }">
        <UICardProduct
          :image="product.image"
          :price="product.price"
          :name="product.name"
        /></NuxtLink>
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>
