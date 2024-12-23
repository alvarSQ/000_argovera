<script setup lang="ts">

</script>

<template>
        <div class="parent">
          <div class="div1">
            <UIBreadCrumbs />
          </div>
          <div class="div4">
            <span class="title">Категории</span>
            <UICategoriesList />
          </div>
          <div class="div2">
            <slot />
          </div>
        </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.parent {
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: 8px;
}

.div1 {
  grid-column: span 3 / span 3;
}

.div4 {
  grid-row-start: 2;
}

.div5 {
  grid-column: span 2 / span 2;
  grid-row-start: 2;
}
</style>
