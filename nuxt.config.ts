// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@nuxt/icon'],
  app: {
    head: {
      title: 'Интернет-магазин Nuxt 3: официальный сайт онлайн-гипермаркета Nuxt 3 в Украине',
      meta: [
        {
          name: 'description',
          content:
            'Интернет-магазин Nuxt 3: электроника, одежда и обувь, бытовая техника, автотовары, товары для дома и бизнеса. Покупайте в Nuxt 3! ✓ Официальная гарантия ✓ Доставка по всей Украине 🚚 ✓ Отзывы покупателей, обзоры и характеристики товаров $ Выгодные цены и скидки %'
        },
        { name: 'keywords', content: 'NUXT 3, НУКСТ 3, онлайн-гипермаркет' },
        { name: 'property', content: 'website' },
        { name: 'og:url', content: 'http://localhost:3000' },
        { name: 'og:image', content: 'http://localhost:3000/favicon.ico' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  runtimeConfig: {
    public: {
      frontendUrl: process.env.FRONTEND_URL,
      backendUrl: process.env.BACKEND_URL
    }
  }
})