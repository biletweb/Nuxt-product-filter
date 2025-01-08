<template>
  <div class="my-4 flex items-center">
    <NuxtLink to="/categories" class="flex">
      <span class="transition-all duration-300 hover:text-sky-500">
        <Icon name="mingcute:home-2-line" size="24px" class="flex items-center" />
      </span>
      <span class="mx-1">/</span>
    </NuxtLink>
    <div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id" class="flex items-center">
      <NuxtLink
        :to="`/categories/${breadcrumb.slug}`"
        :class="{
          'cursor-default text-sky-500': isActiveBreadcrumb(breadcrumb.slug),
          'transition-all duration-300 hover:text-sky-500': !isActiveBreadcrumb(breadcrumb.slug)
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
