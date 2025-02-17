<script setup lang="ts">
const productsStore = useProductsStore();

const { breadCrumbs, searchQuery, productsTotal, limitScroll, isLoading, activeCategoryChain } = storeToRefs(useAllStore());
const { productsBySearch } = storeToRefs(useProductsStore());

const route = useRoute('products-search');

const queryRoute = computed(() => route.query.q);

const offset = ref(0)

await callOnce(() => productsStore.searchProducts(offset.value, queryRoute.value as string))

const productsInfinite = () => {
  if (offset.value !== 0 && offset.value >= productsTotal.value) return;
  if (isLoading.value) return;  
  return productsStore.searchProducts(offset.value, queryRoute.value as string)
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
    offset.value = productsBySearch.value.length
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
    offset.value = 0
    return productsStore.searchProducts(offset.value, queryRoute.value as string);
  },
);




onMounted(() => {
  breadCrumbs.value = {
    id: [],
    name: '',
  }
  activeCategoryChain.value = []
  window.addEventListener('scroll', checkPosition);
});
onUnmounted(() => {
  searchQuery.value = '';
  window.addEventListener('scroll', checkPosition);
});
</script>

<template>
  <span class="title" style="font-weight: 400">По запросу <span style="font-weight: 900">{{ queryRoute }}</span>
    найдено:
    {{ formatProductsCount(productsTotal) }}</span>
  <div class="products-list">
    <template v-for="product in productsBySearch" :key="product.id">
      <UICardProduct :image="product.image" :price="product.price" :name="product.name"
        @click="navigateTo({ name: 'products-slug', params: { slug: product.slug } })" />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
