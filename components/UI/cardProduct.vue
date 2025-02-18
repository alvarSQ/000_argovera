<script setup lang="ts">
const props = defineProps<{
  image: string,
  price?: number,
  name: string
  caterory?: boolean
}>();


</script>

<template>
  <div class="card-product" :class="{ 'card-category': caterory }">
    <div class="img center">
      <UIPreloader v-if="0" />
      <NuxtImg :src="`/images/products/${image}`" />
    </div>
    <span class="price" v-if="price"> {{ price }} <span> ₽ </span></span>
    <span class="title">{{ name }} </span>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.title {
  color: #007800;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  hyphens: auto;

  &:hover {
    overflow: visible;
    line-clamp: unset;
    -webkit-line-clamp: unset;
  }

  @media (min-width: 1800px) {
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  @media (max-width: 1380px) and (min-width: 900px) {
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }

  @media (max-width: 615px) and (min-width: 515px) {
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }

    @media (max-width: 360px) {
      -webkit-line-clamp: 3;
      line-clamp: 3;
    }
}

.price {
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  color: $primary-color;

  @media (max-width: 1095px) {
    font-size: wmax(32);
  }

  @media (max-width: 360px) {
    font-size: 18px;
  }
}

.img {
  height: 60%;

  img {
    height: 100%;
  }
}

.card-product {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  gap: 15px;
  width: 100%;
  height: wmax(345);
  padding: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  transition: .5s;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1) inset;
    transform: scale(0.98)
  }

  @media (max-width: 1095px) {
    height: wmax(420);
  }

  @media (max-width: 900px) {
    height: wmax(550);
  }

  @media (max-width: 515px) {
    gap: 5px;
  }

  @media (max-width: 360px) {
    height: wmax(1600);
  }


}

.card-category {
  height: wmax(250);
  gap: 30px;
}
</style>
