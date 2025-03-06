export default defineNuxtRouteMiddleware(async (to) => {
  const { token } = storeToRefs(useAuthStore());

  if (!token.value) {
    return navigateTo('/');
  }
});
