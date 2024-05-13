// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-auth-utils', '@nuxt/fonts', '@nuxt/image'],
  ui: {
    icons: ['simple-icons'],
  },
});
