<script setup lang="ts">
const brandsStore = useBrandsStore();

const { breadCrumbs, searchQuery, productsCountFav, limitScroll, isLoading, activeCategoryChain } = storeToRefs(useAllStore());
const { brands } = storeToRefs(useBrandsStore());

await callOnce(() => brandsStore.loadBrands(''))

onMounted(() => {
    breadCrumbs.value = {
        id: [],
        name: '',
    }
    activeCategoryChain.value = []
});
</script>

<template>
    <div class="products-list">
        <template v-for="brand in brands" :key="brand.id">
            <NuxtLink :to="{ name: 'brands-slug', params: { slug: brand.slug } }">
                <UICardProduct :image="brand.image" :name="brand.name" :caterory="true" />
            </NuxtLink>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
