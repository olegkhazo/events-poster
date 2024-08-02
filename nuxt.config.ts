import { defineNuxtConfig } from 'nuxt/config';

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
    "nuxt-gtag"
  ],
  gtag: {
    id: "G-EMTQYKKSEY"
  },
  typescript: {
    strict: false
  }
})