<template>
  <Head v-if="data">
    <Title>{{ data.categoryName }} - NUXT 3 | Купить в Киеве, Харькове, Одессе, Львове: цена, отзывы, продажа</Title>
    <Meta name="description" :content="data.description" />
    <Meta name="keywords" :content="data.keywords" />
    <Meta property="og:title" :content="data.categoryName" />
    <Meta property="og:description" :content="data.ogDescription" />
    <Meta property="og:url" :content="seoUrl" />
  </Head>

  <ErrorMessage v-if="error" :error="error.statusCode" />
  <div v-else-if="data">
    <div class="my-4 text-3xl font-bold">{{ data.categoryName }}</div>
    <Breadcrumbs :breadcrumbs="data.breadcrumbs" />
    <div v-if="status === 'pending'" class="text-center">Loading...</div>
    <CategoryList v-else-if="data.categories.length" :categories="data.categories" />
    <div v-if="status !== 'pending' && data.categoryFilters.length" class="my-4 flex gap-4">
      <div class="w-2/12">
        <CategoryFilters :category-filters="data.categoryFilters" />
      </div>
      <div class="w-10/12">
        <ProductList :products="data.products" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const offset = ref(0)
const limit = 10
const categorySlug = useRoute().params.slug
const seoUrl = config.public.frontendUrl + useRoute().fullPath

// const { data, error, status } = await useFetch(config.public.backendUrl + `/categories/${categorySlug}/subcategories`, {
const { data, error, status } = await useLazyFetch(config.public.backendUrl + `/categories/${categorySlug}/subcategories`, {
  query: {
    offset: offset.value,
    limit: limit
  },
  headers: {
    Accept: 'application/json'
  },
  timeout: 5000
})
</script>
