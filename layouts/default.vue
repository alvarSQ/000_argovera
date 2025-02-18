<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const allStore = useAllStore();
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
        <UICategriesTree v-for="category in categoriesTree" :key="category.id" :category="category" />
      </ul>
      <div class="title">Производители</div>
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
  grid-template-columns: 0.5fr 2fr;
  gap: 8px;
}

.div1 {
  grid-column: span 3 / span 3;
}

.div4 {
  grid-row-start: 2;
  width: 250px;
}

.div5 {
  grid-column: span 2 / span 2;
  grid-row-start: 2;
}
</style>
