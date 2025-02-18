<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const { categoriesTree } = storeToRefs(useСategoriesStore());
// const { bigItems } = storeToRefs(useInventoryStore());

const emit = defineEmits(['closeModal']);

// const delItem = () => {
//   if (bigItems.value?.amount) {
//     amountItem.value <= bigItems.value.amount ? bigItems.value.amount = bigItems.value.amount - amountItem.value : bigItems.value.amount = 0    
//     bigItems.value.name = ''
//     bigItems.value.size = 'min'
//   }  
//   isDelete.value = !isDelete.value;
//   emit('closeModal')
// }
</script>

<template>
  <div class="item_main inner-modal">
    <div class="title">Категории</div>
    <ul class="flex-column">
      <UICategriesTree v-for="category in categoriesTree" :key="category.id" :category="category" />
    </ul>
    <UIMenuBottom :inviz="false" />

  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/utils/vars.scss' as *;

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
  position: absolute;
  top: 62px;
  left: 0;
  display: flex;
  flex-direction: column;
  // align-items: center;
  padding: 20px;
  width: 280px;
  height: 100%;
  gap: 15px;
  z-index: 9;
  background: whitesmoke;
}
</style>
