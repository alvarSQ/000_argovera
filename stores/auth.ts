import { defineStore } from 'pinia';

const URL = 'https://dummyjson.com/auth';

export const useAuthStore = defineStore('auth', () => {

  const expiresInMins = 1 // сколько живет accessToken
  const user = ref({} as IUserInfo)

  const accessToken = useCookie('accessToken')
  const refreshToken = useCookie('refreshToken')


  const authRefreshUser = async (userLogin?: IUserLogin) => {
    let bodySet = {} as IUserLogin
    let urlPlus = ''

    if (userLogin) {
      urlPlus = '/login';
      bodySet = userLogin;
      bodySet.expiresInMins = expiresInMins
    } else if (refreshToken.value) {
      urlPlus = '/refresh';
      (bodySet as unknown as IUserInfo).refreshToken = `${refreshToken.value}`
      bodySet.expiresInMins = expiresInMins
    }
    try {
      const data = await $fetch(`${URL}${urlPlus}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodySet,
      });
      accessToken.value = (data as IUserInfo).accessToken;
      refreshToken.value = (data as IUserInfo).refreshToken;
    } catch (e) {
      (e as Error).message.includes('400') ? alert('Неправильное имя или пароль') : alert('Ошибка соединения')
    }
  }

  const logUserOut = () => {
    accessToken.value = '';
    refreshToken.value = null;
    navigateTo('/login')
  }


  return { user, accessToken, refreshToken, authRefreshUser, logUserOut }
}
)
