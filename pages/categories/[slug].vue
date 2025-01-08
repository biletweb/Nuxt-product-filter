<template>
  <Head v-if="data">
    <Title>{{ data.categoryName }} - NUXT 3</Title>
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
        <div class="mt-4 text-center">
          <button
            v-if="hasMore"
            @click="loadMore"
            type="button"
            class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600 disabled:bg-slate-300"
            :disabled="loadingHasMore"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const categorySlug = useRoute().params.slug
const seoUrl = config.public.frontendUrl + useRoute().fullPath
const offset = ref(0)
const limit = 10
const hasMore = ref(true)
const loadingHasMore = ref(false)

const { data, error, status } = await useLazyFetch(config.public.backendUrl + `/categories/${categorySlug}/subcategories`, {
  query: {
    offset: offset.value,
    limit: limit
  },
  timeout: 5000
})

const loadMore = async () => {
  loadingHasMore.value = true
  offset.value += limit
  try {
    const response = await $fetch(config.public.backendUrl + `/categories/${categorySlug}/subcategories`, {
      params: {
        offset: offset.value,
        limit: limit
      },
      timeout: 5000
    })
    data.value.products = [...data.value.products, ...response.products]
    hasMore.value = response.products.length >= limit
  } catch (err) {
    error.value = {
      statusCode: 500,
      statusMessage: err.statusMessage
    }
  } finally {
    loadingHasMore.value = false
  }
}
</script>
