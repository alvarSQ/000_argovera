<script setup lang="ts">
const router = useRouter();

const productsStore = useProductsStore();
const { products } = storeToRefs(useProductsStore());

definePageMeta({
  layout: 'main'
})

await callOnce(() => productsStore.loadProduct())

// const { data, status, execute } = await useFetchAuth(
//   'https://dummyjson.com/auth/me'
// );

// const getUserData = async () => {
//   await execute();
//   authStore.user = data.value as IUserInfo;
// };

// const fN = computed(() => (data.value ? authStore.user.firstName : ''));
// const pending = computed(() => (status.value === 'pending' ? true : false));

// const removeSpaces = (title: string) => title = title.toLowerCase().replace(/\s/g, "-")
// productsStore.loadProduct()
// onMounted(() => productsStore.loadProduct());
</script>

<template>
  <div class="content-main">
    <div class="baner-main">
      <NuxtImg src="/images/baner-main.webp" />
    </div>
    <span class="main-caption">Популярные товары</span>
    <div class="products-main">
      <template v-for="product in products" :key="product.id">
        <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }">
        <UICardProduct
          :image="product.image"
          :price="product.price"
          :name="product.name"
        /></NuxtLink>
      </template>
    </div>
    <!-- <UIPreloader v-if="pending" />
      <p v-else>Привет {{ fN }}</p>

      <button class="btn" @click="authStore.logUserOut()">logout</button> -->
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
