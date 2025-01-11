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
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxtjs/i18n'],
  app: {
    head: {
      title: 'Интернет-магазин Nuxt 3: официальный сайт онлайн-гипермаркета Nuxt 3 в Украине',
      meta: [
        {
          name: 'description',
          content:
            'Интернет-магазин Nuxt 3: электроника, одежда и обувь, бытовая техника, автотовары, товары для дома и бизнеса. Покупайте в Nuxt 3! ✓ Официальная гарантия ✓ Доставка по всей Украине 🚚 ✓ Отзывы покупателей, обзоры и характеристики товаров $ Выгодные цены и скидки %'
        },
        { name: 'og:type', content: 'website' },
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
  },
  image: {
    domains: ['https://picsum.photos']
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English'
      },
      {
        code: 'ru',
        file: 'ru.json',
        name: 'Russian'
      }
    ],
    strategy: 'prefix',
    defaultLocale: 'ru'
  }
})
