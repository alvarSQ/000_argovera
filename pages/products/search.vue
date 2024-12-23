<script setup lang="ts">
const productsStore = useProductsStore();

const { breadCrumbs, searchQuery, productsTotal, limitScroll, isLoading } = storeToRefs(useAllStore());
const { productsBySearch } = storeToRefs(useProductsStore());

const route = useRoute('products-search');

const queryRoute = computed(() => route.query.q);

const skip = ref(0)

await callOnce(() => productsStore.searchProducts(skip.value, queryRoute.value as string))

const productsInfinite = () => {
  if (skip.value !== 0 && skip.value >= productsTotal.value) return;
  if (isLoading.value) return;  
  return productsStore.searchProducts(skip.value, queryRoute.value as string)
};

const checkPosition = () => {
  // Высота документа и экрана
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  // Сколько пикселей уже проскроллили
  const scrolled = window.scrollY;
  // Порог
  const threshold = height - screenHeight / 4;
  // Низ экрана относительно страницы
  const position = scrolled + screenHeight;

  if (position >= threshold && productsTotal.value >= limitScroll.value) {
    skip.value = productsBySearch.value.length
    productsInfinite()
  }
};

const num_word = (value: number): string => {
  const words = ['товар', 'товара', 'товаров'];
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

const formatProductsCount = (count: number): string => {
  return `${count} ${num_word(count)}`;
};

watch(
  () => route.query.q,
  () => {
    skip.value = 0
    return productsStore.searchProducts(skip.value, queryRoute.value as string);
  },
);




onMounted(() => {
  breadCrumbs.value = [];
  window.addEventListener('scroll', checkPosition);
});
onUnmounted(() => {
  searchQuery.value = '';
  window.addEventListener('scroll', checkPosition);
});
</script>

<template>
  <span class="title" style="font-weight: 400"
    >По запросу <span style="font-weight: 900">{{ queryRoute }}</span> найдено:
    {{ formatProductsCount(productsTotal) }}</span
  >
  <div class="products-list">
    <template v-for="product in productsBySearch" :key="product.id">
      <UICardProduct
        :image="product.images[0]"
        :price="product.price"
        :title="product.title"
        @click="navigateTo({ name: 'products-id', params: { id: product.id } })"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
