<script setup lang="ts">
const productsStore = useProductsStore();

const { breadCrumbs, productsCountFav, limitScroll, isLoading, activeCategoryChain } = storeToRefs(useAllStore());
const { productsByFavorited } = storeToRefs(useProductsStore());
const { user } = storeToRefs(useAuthStore());
const { token } = storeToRefs(useAuthStore());

definePageMeta({
    middleware: 'auth'
})


const offset = ref(0)

await callOnce(() => productsStore.favoritedProducts(offset.value))

const productsInfinite = () => {
    if (offset.value !== 0 && offset.value >= productsCountFav.value) return;
    if (isLoading.value) return;
    return productsStore.favoritedProducts(offset.value)
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

    if (position >= threshold && productsCountFav.value >= limitScroll.value) {
        offset.value = productsByFavorited.value.length
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

watch(() => token.value, () => navigateTo('/'));

onMounted(() => {
    breadCrumbs.value = {
        id: [],
        name: '',
    }
    activeCategoryChain.value = []
    window.addEventListener('scroll', checkPosition);
});
onUnmounted(() => {
    window.addEventListener('scroll', checkPosition);
});
</script>

<template>
    <span class="title" style="font-weight: 400"><span style="font-weight: 900">{{ user.username }}</span>, в вашем
        избранном:
        {{ formatProductsCount(productsCountFav) }}</span>
    <div class="products-list">
        <template v-for="product in productsByFavorited" :key="product.slug">
            <UICardProduct :image="product.image" :price="product.price" :name="product.name"
                @click="navigateTo({ name: 'products-slug', params: { slug: product.slug } })" />
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
