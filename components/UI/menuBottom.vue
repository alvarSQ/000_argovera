<script setup lang="ts">
const props = defineProps<{
    inviz: boolean,
}>();
</script>

<template>
    <ul class="menu-bottom" :class="[inviz ? 'navbar-content' : 'inner']">
        <li>подобрать препарат</li>
        <li>НОВОСТИ</li>
        <li>СТАТЬИ</li>
        <li>ПРАЙС-ЛИСТ</li>
        <li>Категории</li>
        <li>ОПЛАТА И ДОСТАВКА</li>
        <li>СКИДКИ</li>
        <li>КОНТАКТЫ</li>
        <li>О КОМПАНИИ АРГО</li>
        <li class="line" v-if="!inviz">Избранное</li>
        <li v-if="!inviz">Личный кабинет</li>
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
    cursor: pointer;
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