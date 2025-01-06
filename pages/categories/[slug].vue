<template>
  <Head>
    <Title>{{ data.categoryName }}</Title>
    <Meta name="description" :content="data.categoryName + ' - купить в интернет магазине ⏩ Nuxt 3. Цены на 【' + data.categoryName + '】, высокое качество, ✍️️ отзывы, ⚡ быстрая доставка по всей Украине, ✨ 【ГАРАНТИЯ】!'" />
    <Meta name="keywords" :content="data.categoryName + ', купить ' + data.categoryName.toLowerCase() + ', цены на ' + data.categoryName.toLowerCase() + ''" />
    <Meta property="og:title" :content="data.categoryName" />
    <Meta property="og:description" :content="data.categoryName + ' - купить с доставкой по Украине. Выгодные предложения, акции, скидки в интернет-магазине Nuxt 3'" />
    <Meta property="og:type" content="website" />
    <Meta property="og:url" :content="'http://localhost:3000' + useRoute().fullPath" />
    <Meta property="og:image" content="http://localhost:3000/favicon.ico" />
  </Head>

  <div v-if="error">Произошла ошибка при загрузке данных: {{ error.message }}</div>
  <div v-else-if="data">
    <div class="mb-4 text-3xl font-bold">{{ data.categoryName }}</div>
    <div class="my-4 flex items-center">
      <NuxtLink to="/categories" class="mr-1"><span class="hover:underline">Home</span> /</NuxtLink>
      <div v-for="(breadcrumb, index) in data.breadcrumbs" :key="breadcrumb.id" class="flex items-center">
        <NuxtLink
          :to="`/categories/${breadcrumb.id}`"
          :class="{
            'cursor-default text-sky-500': isActiveBreadcrumb(breadcrumb.id),
            'hover:underline': !isActiveBreadcrumb(breadcrumb.id)
          }"
        >
          {{ breadcrumb.name }}
        </NuxtLink>
        <span v-if="index < data.breadcrumbs.length - 1" class="mx-1">/</span>
      </div>
    </div>
    <div v-if="status === 'pending'" class="text-center">Loading...</div>
    <div v-else class="grid grid-cols-5 gap-4">
      <div v-for="category in data.categories" :key="category.id">
        <NuxtLink :to="`/categories/${category.id}`">
          <div class="card rounded-lg bg-slate-300 p-4 text-center">
            {{ category.name }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const offset = ref(0)
const limit = 10
const categorySlug = useRoute().params.slug

// const { data, error, status } = await useFetch(`http://127.0.0.1:8000/api/categories/${categorySlug}/subcategories`, {
const { data, error, status } = await useLazyFetch(`http://127.0.0.1:8000/api/categories/${categorySlug}/subcategories`, {
  query: {
    offset: offset.value,
    limit: limit
  },
  headers: {
    Accept: 'application/json'
  },
  timeout: 5000
})

const isActiveBreadcrumb = (breadcrumbId) => {
  return useRoute().params.slug === String(breadcrumbId)
}
</script>
