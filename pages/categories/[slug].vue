<template>
  <Head v-if="data">
    <Title>{{ data.categoryName }} - NUXT 3 | Купить в Киеве, Харькове, Одессе, Львове: цена, отзывы, продажа</Title>
    <Meta
      name="description"
      :content="
        data.categoryName +
        ' - купить в интернет магазине ⏩ Nuxt 3. Высокое качество, ✍️️ отзывы, ⚡ быстрая доставка по всей Украине, ✨ [ГАРАНТИЯ]!'
      "
    />
    <Meta
      name="keywords"
      :content="
        data.categoryName.toLowerCase() +
        ', купить ' +
        data.categoryName.toLowerCase() +
        ', цены на ' +
        data.categoryName.toLowerCase() +
        ''
      "
    />
    <Meta property="og:title" :content="data.categoryName" />
    <Meta
      property="og:description"
      :content="
        data.categoryName + ' - купить с доставкой по Украине. Выгодные предложения, акции, скидки в интернет-магазине Nuxt 3'
      "
    />
    <Meta property="og:url" :content="seoUrl" />
  </Head>
  <ErrorMessage v-if="error" :error="error.statusCode" />
  <div v-else-if="data">
    <div class="my-4 text-3xl font-bold">{{ data.categoryName }}</div>
    <Breadcrumbs :breadcrumbs="data.breadcrumbs" />
    <div v-if="status === 'pending'" class="text-center">Loading...</div>
    <div v-else-if="data.categories.length" class="grid grid-cols-5 gap-4">
      <div v-for="category in data.categories" :key="category.id">
        <NuxtLink :to="`/categories/${category.slug}`">
          <div class="card rounded-lg bg-slate-300 p-4 text-center">
            {{ category.name }}
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-if="status !== 'pending' && data.categoryFilters.length" class="my-4 flex gap-4">
      <div class="w-2/12">
        <div class="rounded-lg border border-sky-300 bg-sky-200 p-4">
          <div v-for="filter in data.categoryFilters" :key="filter.id">
            <span class="font-bold">{{ filter.name }}</span>
            <div v-for="value in filter.values" :key="value.id" class="flex items-center">
              <input type="checkbox" :value="value.id" :id="value.id" />
              <label :for="value.id" class="ms-1">{{ value.value }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="w-10/12">
        <div class="grid grid-cols-5 gap-4">
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
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
