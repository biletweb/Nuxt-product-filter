<template>
  <div class="my-4 flex items-center">
    <NuxtLinkLocale to="/categories" class="flex">
      <span class="hover:text-sky-500">
        <Icon name="mingcute:home-2-line" size="24px" class="flex items-center" />
      </span>
      <span class="mx-1">/</span>
    </NuxtLinkLocale>
    <div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id" class="flex items-center">
      <NuxtLinkLocale
        :to="`/categories/${breadcrumb.slug}`"
        :class="{
          'cursor-default text-sky-500': isActiveBreadcrumb(breadcrumb.slug),
          'hover:text-sky-500': !isActiveBreadcrumb(breadcrumb.slug)
        }"
      >
        {{ breadcrumb.name }}
      </NuxtLinkLocale>
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
