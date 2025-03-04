export default defineNuxtRouteMiddleware((to) => {

    const { token } = storeToRefs(useAuthStore());

    if (token.value && to?.name === '/') {
      return navigateTo('/');
    }
    
    if (!token.value && to?.name !== '/') {
      return navigateTo('/');
    }
});
