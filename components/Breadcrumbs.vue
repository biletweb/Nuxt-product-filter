<template>
  <div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.id" class="flex items-center">
    <NuxtLink
      :to="`/categories/${breadcrumb.id}`"
      :class="{
        'cursor-default text-sky-500': isActiveBreadcrumb(breadcrumb.id),
        'hover:underline': !isActiveBreadcrumb(breadcrumb.id)
      }"
    >
      {{ breadcrumb.name }}
    </NuxtLink>
    <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
  </div>
</template>

<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true
  }
})

const isActiveBreadcrumb = (breadcrumbId) => {
  return useRoute().params.slug === String(breadcrumbId)
}
</script>
