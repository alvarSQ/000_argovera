<script setup lang="ts">
import { useAllStore } from '@/stores/all';
import { storeToRefs } from 'pinia';

const allStore = useAllStore();
const { activeCategoryChain } = storeToRefs(useAllStore());

const props = defineProps<{
  category: ICategoriesTree;
}>();

// Переключение видимости дочерних категорий
const toggleChildren = (categoryId: number) => {
  if (activeCategoryChain.value.includes(categoryId)) {
    // Если категория уже в цепочке, сворачиваем её и всех её детей
    const index = activeCategoryChain.value.indexOf(categoryId);
    activeCategoryChain.value = activeCategoryChain.value.slice(0, index);
  } else {
    // Иначе добавляем её в цепочку
    activeCategoryChain.value = allStore.getCategoryChain(categoryId);
  }
};

// Проверка, открыта ли текущая категория
const isOpen = computed(() => activeCategoryChain.value.includes(props.category.id));

// Проверка, является ли категория родительской для активной
const isParentOfActive = computed(() => {
  return props.category.children?.some(child => activeCategoryChain.value.includes(child.id));
});
</script>

<template>
  <li class="category">
    <!-- Заголовок категории -->
    <div :class="{ 'category-open': isOpen || isParentOfActive }" @click="toggleChildren(category.id)">
      <NuxtLink :to="{ name: 'categories-slug', params: { slug: category.slug } }">{{ category.name }}</NuxtLink>
      <!-- Иконка для переключения видимости дочерних категорий -->
      <span v-if="category.children && category.children.length > 0" class="toggle-children">
        {{ isOpen || isParentOfActive ? '-' : '+' }}
      </span>
    </div>

    <!-- Дочерние категории -->
    <ul v-if="category.children && category.children.length > 0 && (isOpen || isParentOfActive)" class="children">
      <UICategriesTree v-for="child in category.children" :key="child.slug" :category="child" />
    </ul>
  </li>
</template>

<style scoped lang="scss">
@use '@/assets/scss/utils/vars.scss' as *;

.category {
  position: relative;
  cursor: pointer;
}

.category-open {
  font-weight: 600;
  color: $primary-color;
}

.children {
  margin-left: 10px;
}

.toggle-children {
  cursor: pointer;
  color: $primary-color;
  font-weight: 600;
  position: absolute;
  right: 0;
}
</style>
