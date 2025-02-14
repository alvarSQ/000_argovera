import { defineStore } from 'pinia';
import consola from 'consola';

// const URL = 'https://argovera.onrender.com/users/';

const URL = 'http://localhost:10000';

export const useAuthStore = defineStore('auth', () => {
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

    const inFavorite = async (slug: string) => {   
      try {
        const data = await $fetch(`${URL}/${slug}/favorite`, {
          method: 'POST',
          headers: { Authorization: `${token.value}` }
        });
        token.value = (data as IUser).user.token;
        user.value = (data as IUser).user;
      } catch (e) {
        consola.error('Произошла ошибка:', e);
      }
    };

  const logUserOut = () => {
    token.value = '';
    navigateTo('/');
  };

  return { user, token, authUser, logUserOut };
});
