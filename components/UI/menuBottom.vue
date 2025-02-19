<script setup lang="ts">
const props = defineProps<{
    inviz: boolean,
}>();
</script>

<template>
    <ul class="menu-bottom" :class="[inviz ? 'navbar-content' : 'inner']">
        <li>
            <NuxtLink to="/">подобрать препарат</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">НОВОСТИ</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">СТАТЬИ</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">ПРАЙС-ЛИСТ</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">Категории</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">ОПЛАТА И ДОСТАВКА</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">СКИДКИ</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">КОНТАКТЫ</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/">О КОМПАНИИ АРГО</NuxtLink>
        </li>
        <li class="line" v-if="!inviz">
            <NuxtLink to="/products/favorited">Избранное</NuxtLink>
        </li>
        <li v-if="!inviz">
            <NuxtLink to="/">Личный кабинет</NuxtLink>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.menu-bottom {
    font-size: 12px;
    font-family: $mainFont;
    text-transform: uppercase;
    margin-top: 20px;
    white-space: nowrap;
}

.inner {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 16px;
}

.line {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid gray;
}
</style>