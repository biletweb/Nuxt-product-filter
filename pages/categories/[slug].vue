<template>
  <Head v-if="data">
    <Title>{{ data.categoryName }} - NUXT 3</Title>
    <Meta name="description" :content="data.description" />
    <Meta property="og:title" :content="data.categoryName" />
    <Meta property="og:description" :content="data.ogDescription" />
    <Meta property="og:url" :content="seoUrl" />
  </Head>

  <div v-if="data">
    <div class="my-4 text-3xl font-bold">{{ data.categoryName }}</div>
    <Breadcrumbs :breadcrumbs="data.breadcrumbs" />
    <div v-if="status === 'pending'" class="flex justify-center">
      <Icon name="svg-spinners:8-dots-rotate" size="36px" class="text-sky-500" />
    </div>
    <CategoryList v-else-if="data.categories.length" :categories="data.categories" />
    <div v-if="status !== 'pending' && data.categoryFilters.length" class="my-4 flex gap-4">
      <div class="w-2/12">
        <CategoryFilters :category-filters="data.categoryFilters" @filterChange="updateFilters($event)" />
      </div>
      <div class="w-10/12">
        <div v-if="loadingChangeFilters" class="flex justify-center">
          <Icon name="svg-spinners:8-dots-rotate" size="36px" class="text-sky-500" />
        </div>
        <ProductList v-else :products="data.products" />
        <div v-if="hasMore && !loadingChangeFilters" class="mt-4 text-center">
          <button
            @click="loadMore"
            type="button"
            class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600 disabled:bg-slate-300"
            :disabled="loadingHasMore"
          >
            <Icon v-if="loadingHasMore" name="svg-spinners:8-dots-rotate" size="24px" class="flex items-center" />
            <span v-else>Load more</span>
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
const loadingChangeFilters = ref(false)

const { data, error, status } = await useLazyFetch(config.public.backendUrl + `/categories/${categorySlug}/subcategories`, {
  query: {
    offset: offset.value,
    limit: limit
  },
  timeout: 5000
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage || 'Request aborted due to timeout',
    fatal: true
  })
}

watch(
  data,
  () => {
    if (data.value) {
      hasMore.value = data.value.products.length >= limit
    }
  },
  { immediate: true }
)

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
  } catch (error) {
    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.response?._data?.name || error.statusMessage || 'Request aborted due to timeout',
      fatal: true
    })
  } finally {
    loadingHasMore.value = false
  }
}

let timeout

const updateFilters = (filters) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    filterChange(filters)
  }, 800)
}

const filterChange = async (filters) => {
  loadingChangeFilters.value = true
  offset.value = 0
  try {
    const params = {}
    for (const [filterId, selectedValues] of Object.entries(filters)) {
      params[`filters[${filterId}][]`] = selectedValues
    }
    params.offset = offset.value
    params.limit = limit
    const response = await $fetch(config.public.backendUrl + `/categories/${categorySlug}/products/filter`, {
      params: params,
      timeout: 5000
    })
    data.value.products = response.products
    hasMore.value = response.products.length >= limit
    if (!response.products.length) {
      router.push('/categories')
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.response?._data?.name || error.statusMessage || 'Request aborted due to timeout',
      fatal: true
    })
  } finally {
    loadingChangeFilters.value = false
  }
}
</script>
