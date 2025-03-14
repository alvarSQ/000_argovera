<script setup lang="ts">
const route = useRoute('products-slug');

const productsStore = useProductsStore();
const allStore = useAllStore();
const cartStore = useCartStore();

const { productBySlug } = storeToRefs(useProductsStore());
const { isLoading } = storeToRefs(useAllStore());
const { token } = storeToRefs(useAuthStore());
const { cart } = storeToRefs(useCartStore());

const slug = computed(() => route.params.slug);

// Реактивный объект toCart
const toCart = ref<IToCart>({
  productId: productBySlug.value.id || 1, // начальное значение, если productBySlug еще не загружен
  quantity: 1, // начальное значение
});

// Синхронизация quantity с количеством в корзине
const syncQuantityWithCart = () => {
  if (cart.value?.items && Array.isArray(cart.value.items)) {
    const itemInCart = cart.value.items.find(e => e.productId === productBySlug.value.id);
    toCart.value.quantity = itemInCart ? itemInCart.quantity : 1; // 1, если товара нет в корзине
  } else {
    toCart.value.quantity = 1; // начальное значение, если корзина пуста
  }
};

// Вычисляемое свойство для цены с учетом скидки
const discont = computed(() =>
  (productBySlug.value.price +
    (productBySlug.value.price * productBySlug.value.discountPercentage) / 100) *
  toCart.value.quantity
);

// Функции для изменения количества
const countPlus = () => !hasProductInCart.value ? ++toCart.value.quantity : toCart.value.quantity;
const countMinus = () => !hasProductInCart.value ? (toCart.value.quantity <= 1 ? toCart.value.quantity : --toCart.value.quantity) : toCart.value.quantity;

// Загрузка данных о продукте
const { refresh: refreshProduct } = await useAsyncData('product', async () => {
  return await productsStore.loadProduct(slug.value);
});

// Загрузка корзины
await callOnce(() => cartStore.getCartToUser());

// Добавление в корзину
const addInCart = async () => {
  toCart.value.productId = productBySlug.value.id; // Устанавливаем актуальный productId
  await cartStore.addToCart('add', toCart.value);
};

// Синхронизация при изменении корзины
watch(
  () => cart.value,
  () => syncQuantityWithCart(),
  { immediate: true, deep: true }
);

// Обновление данных при изменении токена или избранного
watch(() => token.value, async () => {  
  refreshProduct();
  await cartStore.getCartToUser()
});
watch(() => productBySlug.value.favorited, () => productsStore.favoritedProducts(0));

// Состояние загрузки
const pending = computed(() =>
  isLoading.value === true && productBySlug.value.description
);

// Проверка наличия товара в корзине
const hasProductInCart = computed(() =>
  cart.value?.items && Array.isArray(cart.value.items)
    ? cart.value.items.some(e => e.productId === productBySlug.value.id)
    : false
);

// Установка breadcrumbs при монтировании
onMounted(async () => {  
  allStore.getBreadCrumbs(
    0,
    productBySlug.value.name,
    productBySlug.value.categories.id
  );
});
</script>

<template>
  <UIPreloader v-if="pending" />
  <div class="parent" v-else>
    <div class="div3 title">{{ productBySlug.name }}</div>
    <div class="div4 center">
      <NuxtImg :src="`/images/products/${productBySlug.image}`" />
    </div>
    <div class="div5">
      <span class="title-main">{{ productBySlug.name }}</span>
      <div>
        <span class="price-discont">{{ Math.round(discont) }}<span>&nbsp;₽</span></span><span class="price">&nbsp;{{
          productBySlug.price * toCart.quantity
          }}<span>&nbsp;₽</span></span>
      </div>
      <div class="flex-line">
        <div class="int center">{{ toCart.quantity }}</div>
        <div class="arrow">
          <div class="count center" @click="countPlus">&#9650;</div>
          <div class="count center" @click="countMinus">&#9660;</div>
        </div>
        <div class="btn" v-if="!hasProductInCart" @click="addInCart">
          В корзину
        </div>
        <div class="btn" :class="{ 'one-click': hasProductInCart }" v-else @click="">
          В корзине
        </div>
        <div class="int center" @click="productsStore.inFavorite(slug)">
          <svg viewBox="0.8 0.5 22 22" width="33px" height="33px" fill="currentColor" v-if="productBySlug.favorited">
            <path
              d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
              fill="currentColor" />
          </svg>
          <svg viewBox="0.8 0.5 22 22" width="33px" height="33px" fill="currentColor" v-else>
            <path
              d="M12 19.7501C11.8012 19.7499 11.6105 19.6708 11.47 19.5301L4.70001 12.7401C3.78387 11.8054 3.27072 10.5488 3.27072 9.24006C3.27072 7.9313 3.78387 6.6747 4.70001 5.74006C5.6283 4.81186 6.88727 4.29042 8.20001 4.29042C9.51274 4.29042 10.7717 4.81186 11.7 5.74006L12 6.00006L12.28 5.72006C12.739 5.25606 13.2857 4.88801 13.8883 4.63736C14.4909 4.3867 15.1374 4.25845 15.79 4.26006C16.442 4.25714 17.088 4.38382 17.6906 4.63274C18.2931 4.88167 18.8402 5.24786 19.3 5.71006C20.2161 6.6447 20.7293 7.9013 20.7293 9.21006C20.7293 10.5188 20.2161 11.7754 19.3 12.7101L12.53 19.5001C12.463 19.5752 12.3815 19.636 12.2904 19.679C12.1994 19.7219 12.1006 19.7461 12 19.7501ZM8.21001 5.75006C7.75584 5.74675 7.30551 5.83342 6.885 6.00505C6.4645 6.17669 6.08215 6.42989 5.76001 6.75006C5.11088 7.40221 4.74646 8.28491 4.74646 9.20506C4.74646 10.1252 5.11088 11.0079 5.76001 11.6601L12 17.9401L18.23 11.6801C18.5526 11.3578 18.8086 10.9751 18.9832 10.5538C19.1578 10.1326 19.2477 9.68107 19.2477 9.22506C19.2477 8.76905 19.1578 8.31752 18.9832 7.89627C18.8086 7.47503 18.5526 7.09233 18.23 6.77006C17.9104 6.44929 17.5299 6.1956 17.1109 6.02387C16.6919 5.85215 16.2428 5.76586 15.79 5.77006C15.3358 5.76675 14.8855 5.85342 14.465 6.02505C14.0445 6.19669 13.6621 6.44989 13.34 6.77006L12.53 7.58006C12.3869 7.71581 12.1972 7.79149 12 7.79149C11.8028 7.79149 11.6131 7.71581 11.47 7.58006L10.66 6.77006C10.3395 6.44628 9.95791 6.18939 9.53733 6.01429C9.11675 5.83919 8.66558 5.74937 8.21001 5.75006Z"
              fill="currentColor" />
          </svg>
        </div>
      </div>
      <div class="flex-column">
        <span><span class="gray">Код:</span> {{ productBySlug.code }}</span>
        <span><span class="gray">Баллы:</span> {{ productBySlug.code }}</span>
        <span><span class="gray">Производитель:</span>
          {{ productBySlug.brands.name }}</span>
      </div>
      <div class="btn one-click">Купить в один клик</div>
    </div>
    <div class="div6">
      <UIDescriptReview :product="productBySlug" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.one-click {
  color: $primary-color;
  background-color: #0796071e;
}

.favorite {
  color: $primary-color;
  background-color: #fff;
  cursor: pointer;
}

.favorite-on {
  color: #fff;
  background-color: $primary-color;
  cursor: pointer;
}

.arrow {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.parent {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 340px;
  grid-template-areas: 'a a' 'b c' 'd d';

  @media (max-width: 1210px) {
    grid-template-columns: 1fr 300px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'a ' 'b' 'c' 'd';
  }
}

.div3 {
  grid-area: a;
  width: 100%;
}

.div4 {
  grid-area: b;
  width: 100%;
  justify-self: stretch;
  padding: 20px;
}

.div5 {
  grid-area: c;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;

  @media (max-width: 768px) {
    gap: 15px;
  }
}

.title-main {
  font-size: wmax(32);
  font-weight: 700;
  color: $primary-color;

  @media (max-width: 1210px) {
    font-size: 24px;
  }

  @media (max-width: 360px) {
    font-size: 18px;
  }
}

.price {
  font-size: wmax(54);
  font-weight: 400;
  color: #007800;

  @media (max-width: 1210px) {
    font-size: 24px;
  }
}

.price-discont {
  font-size: wmax(24);
  font-weight: 400;
  text-decoration: line-through;
  color: gray;

  @media (max-width: 1210px) {
    font-size: 18px;
  }
}

.gray {
  font-size: 16px;
  color: #999;
}

.div6 {
  grid-area: d;
  width: 100%;
}

.int {
  aspect-ratio: 1 / 1;
  user-select: none;
  height: 40px;
  border: 2px solid $primary-color;
  font-size: 20px;
  color: $primary-color;
  border-radius: 10px;
  align-items: center;
}
</style>
