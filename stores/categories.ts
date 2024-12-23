import { defineStore } from 'pinia';

const URL = 'https://dummyjson.com/products/';

export const useСategoriesStore = defineStore('categories', () => {
  const categories = ref([] as ICategories[]);

  const productsByCategory = ref([] as IProduct[]);

  // const getCategories = computed(() => categories.value);
  // const getProductsByCategory = computed(() => productsByCategory.value);

  const loadCategories = async (slug = '') => {      
    const { isLoading } = storeToRefs(useAllStore());
    isLoading.value = true;
    let url = `${URL}categories`;
    slug ? (url = `${URL}category/${slug}`) : url;
    try {
      const data = await $fetch(url);

      slug
        ? (productsByCategory.value = (data as IProductsList).products)
        : (categories.value = data as ICategories[]);
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      isLoading.value = false;
    }
  };

  return { categories, productsByCategory, loadCategories };
});
