<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const allStore = useAllStore();
const сategoriesStore = useСategoriesStore();

const productsStore = useProductsStore();
const { products } = storeToRefs(useProductsStore());

definePageMeta({
  layout: 'main'
})

await callOnce(() => productsStore.loadProduct())

await callOnce(() => сategoriesStore.loadCategories('tree', ''));
</script>

<template>
  <div class="content-main">
    <div class="baner-main">
      <NuxtImg src="/images/baner-main.webp" />
    </div>
    <span class="main-caption">Популярные товары</span>
    <div class="products-main">
      <template v-for="(product, index) in products" :key="product.id">
        <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" v-if="index >= 0 && index < 10">
          <UICardProduct :image="product.image" :price="product.price" :name="product.name"
            v-if="index >= 0 && index < 10" @click="allStore.activeElement(product.categories.id)" />
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.baner-main {
  height: wmax(282);
}

.products-main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.main-caption {
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: wmax(26);
  color: rgb(66, 66, 66);
}

.content-main {
  display: flex;
  flex-direction: column;
  margin-top: -18px;
  gap: 20px;
}
</style>
