// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      URL_BACK: process.env.NUXT_PUBLIC_URL_BACK || 'http://localhost:10000',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  // ssr: false,
  image: {
    // provider: 'netlify',
    format: ['webp'],
    domains: ['cdn.dummyjson.com'],
  },
  css: ['@/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-typed-router', '@vueuse/nuxt', '@nuxt/image'],
});