<script setup lang="ts">
import { useСategoriesStore } from '@/stores/categories';

const allStore = useAllStore();

const productsStore = useProductsStore();
const { products } = storeToRefs(useProductsStore());
const { activeCategoryChain } = storeToRefs(useAllStore());

definePageMeta({
  layout: 'main'
})

await callOnce(() => productsStore.loadProduct())

onMounted(() => {
  activeCategoryChain.value = []
});
</script>

<template>
  <div class="content-main">
    <div class="baner-main">
      <NuxtImg src="/images/baner-main.webp" />
    </div>
    <span class="main-caption">Популярные товары</span>
    <div class="products-main">
      <template v-for="(product, index) in products" :key="product.slug">
        <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }">
          <UICardProduct :image="product.image" :price="product.price" :name="product.name"
            @click="allStore.activeElement(product.categories.id)" />
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.baner-main {
  height: wmax(282);

  @media (max-width: 480px) {
    display: none;
  }
}

img {
  animation-name: Appearance;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.1, -0.6, 0.2, 0);
}

@-webkit-keyframes Appearance {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-o-keyframes Appearance {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@-moz-keyframes Appearance {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes Appearance {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.products-main {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 1095px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  @media (max-width: 440px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.main-caption {
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: wmax(26);
  color: rgb(66, 66, 66);

  @media (max-width: 480px) {
    display: none;
  }
}

.content-main {
  display: flex;
  flex-direction: column;
  margin-top: -20px;
  gap: 20px;
}
</style>
