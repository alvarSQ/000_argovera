import { defineStore } from 'pinia';

// const URL = 'https://argovera.onrender.com/products/';

const URL = 'http://localhost:10000/products/';

export const useProductsStore = defineStore('products', () => {
  const products = ref([] as IProduct[]);
  const productBySlug = ref({} as IProduct);
  const productsBySearch = ref([] as IProduct[]);

  // const getProducts = computed(() => products.value);
  // const getProductById = computed(() => productById.value);
  // const getProductsBySearch = computed(() => productsBySearch.value);

  // const getProductsById = computed(() => (id: number) => products.find(el => el.id === id))
 
  

  const loadProduct = async (slug = '') => {
    const { isLoading } = storeToRefs(useAllStore());    
    isLoading.value = true;     
    try {
      const data: any = await $fetch(`${URL}${slug}`);        
      slug
        ? (productBySlug.value = data.product as IProduct)
        : (products.value = (data as IProductsList).products);
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      isLoading.value = false;
    }
  };

  const searchProducts = async (skip: number, q: string) => {
    const { isLoading, limitScroll, productsTotal } =
      storeToRefs(useAllStore());
    isLoading.value = true;    
    try {
      const data = await $fetch(`${URL}/search`, {
        params: { q, limit: limitScroll.value, skip },
      });
      if (skip === 0) {
        productsBySearch.value = [];
      }
      productsBySearch.value.push(...(data as IProductsList).products); 
      productsTotal.value = (data as IProductsList).productsCount;
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      isLoading.value = false;
    }
  };

  const getBreadCrumbs = () => {
    const { breadCrumbs } = storeToRefs(useAllStore());
    breadCrumbs.value = [];
    breadCrumbs.value.push(
      productBySlug.value.categories.replace('-', ' '),
      productBySlug.value.name
    );
  };

  return {
    products,
    productBySlug,
    productsBySearch,
    loadProduct,
    getBreadCrumbs,
    searchProducts,
  };
});
