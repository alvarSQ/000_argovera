<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';
const сategoriesStore = useСategoriesStore();

const { categoriesTree } = storeToRefs(useСategoriesStore());

const modal = ref<HTMLDivElement | null>(null);

const emit = defineEmits(['closeInnerModal']);

const props = defineProps<{
  isInnerModal: boolean;
}>();


// Обработка клика вне модального окна
const handleClickOutside = (event: MouseEvent) => {
  if (modal.value && !modal.value.contains(event.target as Node)) {
    emit('closeInnerModal');
  }
};

watch(
  () => props.isInnerModal,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0); // Задержка в 0 мс для пропуска текущего цикла
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }
);

await callOnce(() => сategoriesStore.loadCategories('tree', ''));

// Убедимся, что обработчик удаляется при размонтировании компонента
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="item_main inner-modal" ref="modal">
    <div class=" title">Категории</div>
    <ul class="flex-column">
      <UICategoriesTree v-for="category in categoriesTree" :key="category.slug" :category="category" />
    </ul>
    <UIMenuBottom :inviz="false" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/utils/vars.scss' as *;
@use "sass:color";

.title {
  font-size: 20px;
}

.flex-column {
  font-family: $mainFont;
  font-size: 18px !important;
  line-height: 1.2;
  gap: 10px;
}

.close {
  position: absolute;
  top: 13px;
  left: 223px;
  cursor: pointer;
}

.inner-modal {
  position: fixed;
  top: 62px;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 280px;
  height: calc(100vh - 62px);
  gap: 15px;
  z-index: 9;
  background: whitesmoke;
  overflow-y: auto;

  /* Стили для полосы прокрутки (WebKit) */
  &::-webkit-scrollbar {
    width: 7px; // Ширина полосы прокрутки
    // background-color: rgba(0, 0, 0, 0.01); // Фон полосы
  }

  &::-webkit-scrollbar-thumb {
    background-color: color.adjust($primary-color, $lightness: 10%); // Цвет "ползунка" (thumb)
    border-radius: 2px; // Скругление углов
    border: 2px solid whitesmoke; // Граница для визуального эффекта
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: $primary-color;
  }

  &::-webkit-scrollbar-track {
    // background-color: rgba(0, 0, 0, 0.01); // Фон "дорожки" (track)
    border-radius: 2px; // Скругление дорожки
  }

  /* Для Firefox */
  scrollbar-width: thin;
  scrollbar-color: $primary-color rgba(0, 0, 0, 0.01);
}
</style>
