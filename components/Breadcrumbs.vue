<template>
  <div class="my-4 flex items-center">
    <NuxtLink to="/categories" class="mr-1"><span class="hover:underline">Home</span> /</NuxtLink>
    <div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id" class="flex items-center">
      <NuxtLink
        :to="`/categories/${breadcrumb.slug}`"
        :class="{
          'cursor-default text-sky-500': isActiveBreadcrumb(breadcrumb.slug),
          'hover:underline': !isActiveBreadcrumb(breadcrumb.slug)
        }"
      >
        {{ breadcrumb.name }}
      </NuxtLink>
      <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true
  }
})

const isActiveBreadcrumb = (breadcrumbSlug) => {
  return useRoute().params.slug === String(breadcrumbSlug)
}
</script>
