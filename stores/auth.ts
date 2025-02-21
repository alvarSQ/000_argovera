import { defineStore } from 'pinia';
import consola from 'consola';

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();
  const URL = config.public.URL_BACK;

  const user = ref({} as IUserInfo);

  const token = useCookie('token');

  const authUser = async (type: string, userInfo?: IUserLogin) => {
    let bodySet = null as IUserLogin | null;
    let urlPlus = '';
    let metodSet = 'POST' as 'POST' | 'GET';
    let headersSet = { 'Content-Type': 'application/json' } as any;

    if (type === 'register' && userInfo) {
      urlPlus = '/users';
      bodySet = userInfo;
    } else if (type === 'login' && userInfo) {
      urlPlus = '/users/login';
      bodySet = userInfo;
    } else {
      urlPlus = '/user';
      metodSet = 'GET';
      headersSet = { Authorization: `${token.value}` };
    }
    try {
      const data = await $fetch(`${URL}${urlPlus}`, {
        method: metodSet,
        headers: headersSet,
        body: bodySet,
      });
      token.value = (data as IUser).user.token;
      user.value = (data as IUser).user;
    } catch (e) {
      consola.error('Произошла ошибка:', e);
    }
  };

  const logUserOut = () => {
    const { productsCountFav } = storeToRefs(useAllStore());

    const tokenCookie = useCookie('token', { expires: new Date(0) });
    tokenCookie.value = null;

    user.value = {} as IUserInfo;
    productsCountFav.value = 0;
  };

  return { user, token, authUser, logUserOut };
});
