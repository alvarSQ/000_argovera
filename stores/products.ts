import { defineStore } from 'pinia';
import consola from 'consola';

export const useProductsStore = defineStore('products', () => {
  const config = useRuntimeConfig();
  const URL = `${config.public.URL_BACK}/products/`;

  const products = ref([] as IProduct[]);
  const productBySlug = ref({} as IProduct);
  const productsBySearch = ref([] as IProduct[]);
  const productsByFavorited = ref([] as IProduct[]);

  const loadProduct = async (slug = '') => {
    const { isLoading } = storeToRefs(useAllStore());
    const { token } = storeToRefs(useAuthStore());
    isLoading.value = true;
    try {
      const data: any = await $fetch(`${URL}${slug}`, {
        headers: { Authorization: `${token.value}` },
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
    productBySlug.value.favorited ? (metodSet = 'DELETE') : metodSet;
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
    const { isLoading, limitScroll, productsCountSerch } =
      storeToRefs(useAllStore());
    isLoading.value = true;
    try {
      const data = await $fetch(`${URL}/search`, {
        params: { q, limit: limitScroll.value, offset },
      });
      if (offset === 0) {
        productsBySearch.value = [];
      }
      productsBySearch.value.push(...(data as IProductsList).products);
      productsCountSerch.value = (data as IProductsList).productsCount;
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      isLoading.value = false;
    }
  };

  const favoritedProducts = async (offset: number) => {
    const { isLoading, limitScroll, productsCountFav } =
      storeToRefs(useAllStore());
    const { user, token } = storeToRefs(useAuthStore());
    isLoading.value = true;
    try {
      if (user.value.username) {
        const data = await $fetch(`${URL}`, {
          params: {
            f: user.value.username,
            limit: limitScroll.value,
            offset,
          },
          headers: { Authorization: `${token.value}` },
        });
        if (offset === 0) {
          productsByFavorited.value = [];
        }
        productsByFavorited.value.push(...(data as IProductsList).products);
        productsCountFav.value = (data as IProductsList).productsCount;
      }
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
    productsByFavorited,
    loadProduct,
    inFavorite,
    searchProducts,
    favoritedProducts,
  };
});
