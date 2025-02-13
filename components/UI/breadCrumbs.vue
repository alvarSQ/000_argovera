<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const { breadCrumbs, activeCategoryChain } = storeToRefs(useAllStore());
const { categoriesTree } = storeToRefs(useСategoriesStore());
const { products } = storeToRefs(useProductsStore());

const idToName = computed(() => {
  let lastElement = breadCrumbs.value.pop() // удаляет последний элемент (id товара) из массива с категориями и сохраняет его в переменную
  let arrBreadCrumbs: Array<string | undefined> = [];

  breadCrumbs.value.forEach(e => arrBreadCrumbs.push(findCategoryById(e)?.name));

  if (lastElement) arrBreadCrumbs.push(findProductNameById(lastElement));  
  return arrBreadCrumbs;
})

const slugForLink = computed(() => {
  return breadCrumbs.value.map(e => findCategoryById(e)?.slug).filter(Boolean) as string[];
});


const findProductNameById = (id: number): string | undefined => {
  const product = products.value.find(e => e.id === id);
  return product ? product.name : undefined;
}

interface ICategoriesInBreadCrumbs {
  id: number,
  name: string,
  slug: string
}

const findCategoryById = (id: number): ICategoriesInBreadCrumbs | undefined => {
  // Рекурсивная функция для поиска по ID
  const searchCategory = (category: ICategoriesTree): ICategoriesInBreadCrumbs | undefined => {
    if (category.id === id) {
      return {
        id: category.id,
        name: category.name,
        slug: category.slug
      };
    }

    for (const child of category.children) {
      const result = searchCategory(child);
      if (result) return result;
    }
    return undefined;
  };

  // Поиск во всех категориях верхнего уровня
  for (const category of categoriesTree.value) {
    const result = searchCategory(category);
    if (result) return result;
  }
  return undefined;
};
</script>

<template>
  <div class="bread-crumbs">
    <NuxtLink to="/"><span>Home</span></NuxtLink>
    <span v-for="(breadCrumb, index) in idToName" :key="index" @click="activeCategoryChain.splice(index + 1)">
      <template v-if="index < slugForLink.length">
        / <NuxtLink :to="{ name: 'category-slug', params: { slug: slugForLink[index] } }"> {{ breadCrumb }}
        </NuxtLink>
      </template>
      <template v-else>
        / {{ breadCrumb }}
      </template>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.bread-crumbs {
  grid-column: span 3 / span 3;
  color: gray;
  font-size: wmax(15);
  cursor: pointer;

  &:last-child {
    cursor: auto;
  }
}
</style>
