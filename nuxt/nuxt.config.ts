export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  app: {
    buildAssetsDir: 'nuxt/', // 정적 파일 경로
    baseURL: process.env.NODE_ENV === 'development' ? '/' : './',
    cdnURL: process.env.NODE_ENV === 'development' ? '' : '.'
  },

  nitro: {
    preset: 'static'
  },

  modules: ['@nuxtjs/tailwindcss']
})