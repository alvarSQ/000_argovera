<script setup lang="ts">
import { useCartStore } from '@/stores/cart'; // Предполагаю, что это правильный путь
import { useAuthStore } from '@/stores/auth'; // Предполагаю, что это правильный путь
import { storeToRefs } from 'pinia';

// Интерфейс для объекта корзины (предполагаю, что он такой)
interface IToCart {
    productId: number;
    quantity: number;
}

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const { token } = storeToRefs(useAuthStore());
const { breadCrumbs } = storeToRefs(useAllStore());

definePageMeta({
    middleware: 'auth',
});

// Функция для изменения количества товара
const changeQuantity = async (id: number, currentQuantity: number, action: 'plus' | 'minus', itemId: number) => {
    let newQuantity = currentQuantity;

    if (action === 'plus') {
        newQuantity++;
    } else if (action === 'minus') {
        newQuantity--;
    }

    if (newQuantity <= 0) {
        return await cartStore.deleteProductFromCart(itemId);
    }

    const toCart: IToCart = {
        productId: id,
        quantity: newQuantity,
    };

    await cartStore.addToCart('add', toCart); // Обновляем корзину
};

watch(() => token.value, () => navigateTo('/'));

onMounted(() => {
    breadCrumbs.value = {
        id: [],
        name: '',
    }
});
</script>

<template>
    <span class="title">Корзина</span>
    <ul class="cart-head cart-grid">
        <li></li>
        <li>Название</li>
        <li class="center">Цена</li>
        <li class="center">Кол-во</li>
        <li class="center">Сумма</li>
        <li class="center"></li>
    </ul>
    <ClientOnly>
        <ul class="cart-list cart-grid" v-for="product in cart.items" :key="product.id">
            <li class="img center" @click="navigateTo({ name: 'products-slug', params: { slug: product.slug } })">
                <NuxtImg :src="`/images/products/${product.image}`" />
            </li>
            <li @click="navigateTo({ name: 'products-slug', params: { slug: product.slug } })">{{ product.name }}</li>
            <li class="center">{{ Math.round(product.price) }} ₽</li>
            <li class="center">
                <div class="cart-count"
                    @click="changeQuantity(product.productId, product.quantity, 'plus', product.id)">&plus;</div>
                <div class="cart-int center">{{ product.quantity }}</div>
                <div class="cart-count"
                    @click="changeQuantity(product.productId, product.quantity, 'minus', product.id)">&minus;
                </div>
            </li>
            <li class="center">{{ product.price * product.quantity }} ₽</li>
            <li class="center">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="icon" @click="cartStore.deleteProductFromCart(product.id)">
                    <path d="M10 12V17" stroke="#909399" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M14 12V17" stroke="#909399" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M4 7H20" stroke="#909399" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#909399"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#909399"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </li>
        </ul>
    </ClientOnly>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.cart-int {
    user-select: none;
    min-width: 35px;
    height: 25px;
    border: 2px solid #909399;
    color: #000;
    border-radius: 5px;
    align-items: center;
}

.cart-count {
    user-select: none;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.1px;
    padding: 0 5px;
    color: #909399;
    cursor: pointer;
    align-content: center;

    &:hover {
        color: #303133;
    }
}

.icon {
    cursor: pointer;

    &:hover path {
        stroke: #303133;
    }
}

.img {
    height: 60px;
    cursor: pointer;

    @media (max-width: 910px) {
        height: 90px;
    }
}

.cart-grid {
    display: grid;
    grid-template-columns: 10% 55% 8% 10% 8% auto;
    grid-template-areas: "a b c d e f";
    gap: 5px;
    align-items: center;

    @media (min-width: 1210px) and (max-width: 1285px) {
        grid-template-columns: 10% 50% 8% 15% 8% auto;
    }

    @media (max-width: 910px) {
        grid-template-columns: 100px;
        grid-template-areas: "a b b b b" "a b b b b" "a c d e f";
    }


    li:nth-child(1) {
        grid-area: a;
    }

    li:nth-child(2) {
        padding-left: 5px;
        grid-area: b;
    }

    li:nth-child(3) {
        grid-area: c;
    }

    li:nth-child(4) {
        grid-area: d;
    }

    li:nth-child(5) {
        grid-area: e;
    }

    li:nth-child(6) {
        grid-area: f;
    }
}

.cart-head {
    margin-top: 10px;
    height: 35px;
    color: #fff;
    background-color: $primary-color;
    border-radius: 10px;

    @media (max-width: 910px) {
        display: none;
    }
}

.cart-list {
    color: #000;
    height: 70px;
    margin-bottom: 5px;

    @media (max-width: 910px) {
        height: 100px;
        border-bottom: 2px solid #909399;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }

    li:nth-child(2) {
        cursor: pointer;

        &:hover {
            color: $primary-color;
        }
    }
}
</style>