import { defineStore } from 'pinia';
import consola from 'consola';

export const useCartStore = defineStore('cart', () => {
  const config = useRuntimeConfig();
  const URL = `${config.public.URL_BACK}/cart/`;

  const cart = ref({} as ICart);

  const getCartToUser = async () => {
    const { token } = storeToRefs(useAuthStore());
    const { isLoading, productsCountCart } = storeToRefs(useAllStore());
    isLoading.value = true;
    try {
      if (!token.value) { 
        cart.value = {} as ICart;
        return;
      }
      const data: any = await $fetch(URL, {
        method: 'GET',
        headers: { Authorization: `${token.value}` }
      });  
      cart.value = data as ICart;           
      productsCountCart.value = (data as ICart).items.length;
    } catch (e) {
      consola.error('Произошла ошибка:', e);
    } finally {      
      isLoading.value = false;
    }
  };

  const addToCart = async (type: string, toCart: IToCart) => {
    const allStore = useAllStore();
    const { token } = storeToRefs(useAuthStore());
    const { isLoading, productsCountCart } = storeToRefs(useAllStore());
    isLoading.value = true;
    try {
      if (!token.value) {
        allStore.openModal();
        return;
      }
      const data: any = await $fetch(`${URL}${type}`, {
        method: 'POST',
        headers: { Authorization: `${token.value}` },
        body: {
          ...toCart,
        },
      });      
      cart.value = data as ICart;
      productsCountCart.value = (data as ICart).items.length;
    } catch (e) {
      consola.error('Произошла ошибка:', e);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProductFromCart = async (itemId: number) => {
    const { token } = storeToRefs(useAuthStore());
    const { isLoading, productsCountCart } = storeToRefs(useAllStore());
    isLoading.value = true;
    try {
      if (!token.value) {
        return;
      }
      const data: any = await $fetch(`${URL}remove/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `${token.value}` },
      });
      cart.value = data as ICart;
      productsCountCart.value = (data as ICart).items.length;
    } catch (e) {
      consola.error('Произошла ошибка:', e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    cart,
    getCartToUser,
    addToCart,
    deleteProductFromCart
  };
});
