<script setup lang="ts">
const { searchQuery } = storeToRefs(useAllStore());

const isSearch = computed(() => searchQuery.value ? false : true)
</script>

<template>
  <div class="wrapper-search">
    <div class="btn choice">
      В товарах
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path
          fill="currentColor"
          d="m8.784 10.339 2.207-2.412c.668-.731.345-1.097-.858-1.097H5.859c-1.204 0-1.49.439-.887 1.097l2.207 2.412c.802.877.802.877 1.605 0"
        ></path>
      </svg>
    </div>
    <form class="search">
      <input type="text" placeholder="Искать в Арго..." 
      v-model="searchQuery"
      />
      <button class="btn" type="submit" :disabled="isSearch" @click.prevent="navigateTo({ name: 'products-search', query: { q: searchQuery }})">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            d="M17.892 15.064a8 8 0 1 0-2.828 2.828l2.522 2.522a2 2 0 1 0 2.828-2.828zM11 16a5 5 0 1 1 0-10 5 5 0 0 1 0 10"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/utils/vars.scss' as *;

.wrapper-search {
  display: flex;
  align-items: center;
}

.choice {
  color: $primary-color;
  padding: 0 8px;
  font-size: small;
  font-weight: 600;
  white-space: nowrap;
  height: 30px;
  margin-right: -98px;
  background-color: #0796071e;
  z-index: 1;

  svg {
    padding-left: 3px;
  }
}

.search {
  display: flex;
  .btn {
    width: 72px;
    margin-left: -20px;
  }
}

input {
  border-radius: 10px;
  padding-left: 103px;
  padding-right: 25px;
  width: wmax(700);
  border: 2px solid $primary-color;
}
</style>
