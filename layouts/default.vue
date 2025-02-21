<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const сategoriesStore = useСategoriesStore();
const { categoriesTree } = storeToRefs(useСategoriesStore());

await callOnce(() => сategoriesStore.loadCategories('tree', ''));
</script>

<template>
  <div class="parent">
    <div class="div1">
      <UIBreadCrumbs />
    </div>
    <div class="div4">
      <div class="title">Категории</div>
      <ul class="flex-column">
        <UICategoriesTree v-for="category in categoriesTree" :key="category.slug" :category="category" />
      </ul>
      <div class="title">
        <NuxtLink :to="{ name: 'brands-list' }">Производители</NuxtLink>
      </div>
    </div>
    <div class="div2">
      <slot>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.flex-column {
  margin-top: 10px;
  line-height: 1.2;
  gap: 10px;
  margin-bottom: 15px;
}

.parent {
  display: grid;
  gap: 8px;
  grid-template-columns: 260px;
  grid-template-areas: "a a a" "b c c";

  @media (max-width: 1210px) {
    grid-template-areas: "a a a" "c c c";
  }
}

.div1 {
  grid-area: a;
}

.div4 {
  grid-area: b;
  padding-right: 10px;
  @media (max-width: 1210px) {
      display: none;
    }
}

.div2 {
  grid-area: c;
}
</style>
