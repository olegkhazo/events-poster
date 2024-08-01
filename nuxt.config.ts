export default defineNuxtConfig({
  runtimeConfig: {
    public: {},
  },
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'he',
      },
    },
  },
  css: [
    "@/assets/styles/main.scss",
  ],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/style-resources",
    "@nuxt/image",
  ],
})