// import type { UseFetchOptions } from '#app';

// export const useFetchAuth = (url: string, options?: UseFetchOptions<object>) => {
//     const authStore = useAuthStore();
//     const { accessToken } = storeToRefs(useAuthStore());

//     return useFetch(url, {
//         ...options,

//         onRequest({ options }) {
//             options.method = 'GET'
//             options.headers.set('Authorization', `Bearer ${accessToken.value}`)
//         },

//         async onResponseError({ response }) {
//             response.status === 401 ? await authStore.authRefreshUser() : authStore.logUserOut()
//         }
//     });
// }