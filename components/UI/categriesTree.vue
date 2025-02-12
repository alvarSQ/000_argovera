<script setup>
import { ref } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
});

const isOpen = ref(false);

const toggleChildren = () => {
  if (props.category.children.length > 0) {
    isOpen.value = !isOpen.value;
  }
}
</script>

<template>
  <li>
    <div @click="toggleChildren">
      {{ category.name }}
      <span v-if="category.children.length > 0">{{ isOpen ? '▼' : '▶' }}</span>
    </div>
    <ul v-if="category.children.length > 0 && isOpen">
      <UICategriesTree v-for="child in category.children" :key="child.id" :category="child" />
    </ul>
  </li>
</template>


<style scoped>

</style>