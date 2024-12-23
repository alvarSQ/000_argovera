<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const сategoriesStore = useСategoriesStore();
const { categories } = storeToRefs(useСategoriesStore());

await callOnce(() => сategoriesStore.loadCategories())
</script>

<template>
  <ul class="сategories flex-column">
    <li v-for="category in categories" :key="category.slug">
      <NuxtLink :to="{ name: 'category-slug', params: { slug: category.slug } }"><span>{{ category.name }}</span></NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.сategories {
  margin-top: 10px;
  cursor: pointer;
  li {
    &:hover {
    color: $primary-color;
  }}
}
</style>
