import { defineStore } from 'pinia';

// const URL = 'https://argovera.onrender.com/brands/';

const URL = 'http://localhost:10000/brands/';

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref([] as IBrand[]);

  const productsByBrands = ref({} as IProductsByBrands);

  const loadBrands = async (slug: string) => {
    const { isLoading } = storeToRefs(useAllStore());
    isLoading.value = true;
    let url = `${URL}`;
    slug ? (url = `${URL}${slug}`) : url;
    try {
      const data = await $fetch(url);
      slug
        ? (productsByBrands.value = data as IProductsByBrands)
        : (brands.value = (data as IBrandsList).brands);      
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      isLoading.value = false;
    }
  };

  return { brands, productsByBrands, loadBrands };
});
