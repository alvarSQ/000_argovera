<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const { breadCrumbs, activeCategoryChain } = storeToRefs(useAllStore());
const { categoriesTree } = storeToRefs(useСategoriesStore());

const idToName = computed(() => {
  let arrBreadCrumbs: Array<string | undefined> = [];

  breadCrumbs.value.id.forEach(e => arrBreadCrumbs.push(findCategoryById(e)?.name));

  if (breadCrumbs.value.name) arrBreadCrumbs.push(breadCrumbs.value.name);

  return arrBreadCrumbs;
})

const slugForLink = computed(() => {
  return breadCrumbs.value.id.map(e => findCategoryById(e)?.slug).filter(Boolean) as string[];
});

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
        / <NuxtLink :to="{ name: 'categories-slug', params: { slug: slugForLink[index] } }"> {{ breadCrumb }}
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
  font-size: 15px;
  cursor: pointer;

  &:last-child {
    cursor: auto;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 360px) {
    display: none;
  }
}
</style>
