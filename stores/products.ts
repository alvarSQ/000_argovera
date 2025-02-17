import { defineStore } from 'pinia';
import consola from 'consola';

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
    const { token } = storeToRefs(useAuthStore());    
    isLoading.value = true;     
    try {
      const data: any = await $fetch(`${URL}${slug}`, {
        headers: { Authorization: `${token.value}` }
      });        
      slug
        ? (productBySlug.value = data.product as IProduct)
        : (products.value = (data as IProductsList).products);
    } catch (e) {
      consola.error('Произошла ошибка:', e);
    } finally {
      isLoading.value = false;
    }
  };

  const inFavorite = async (slug: string) => {
    const { isLoading } = storeToRefs(useAllStore());
    const { token } = storeToRefs(useAuthStore());
    isLoading.value = true;   
    let metodSet = 'POST' as 'POST' | 'DELETE';
    productBySlug.value.favorited ? (metodSet = 'DELETE') : metodSet
    try {
      const data = await $fetch(`${URL}${slug}/favorite`, {
        method: metodSet,
        headers: { Authorization: `${token.value}` },
      });      
      productBySlug.value = (data as IProductBySlug).product;      
    } catch (e) {
      consola.error('Произошла ошибка:', e);
    } finally {
      isLoading.value = false;
    }
  };

  const searchProducts = async (offset: number, q: string) => {
    const { isLoading, limitScroll, productsTotal } =
      storeToRefs(useAllStore());
    isLoading.value = true;
    try {
      const data = await $fetch(`${URL}search`, {
        params: { q, limit: limitScroll.value, offset },
      });
      if (offset === 0) {
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

  return {
    products,
    productBySlug,
    productsBySearch,
    loadProduct,
    inFavorite,
    searchProducts,
  };
});
