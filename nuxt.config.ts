export default defineNuxtConfig({
  runtimeConfig: {
    public: {},
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
