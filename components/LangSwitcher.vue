<template>
  <button type="button" @click="toggleLocale">
    {{ currentLocaleName }}
  </button>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()

const currentLocaleName = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return current ? current.name : locale.value
})

const toggleLocale = () => {
  const currentIndex = locales.value.findIndex((l) => l.code === locale.value)
  const nextIndex = (currentIndex + 1) % locales.value.length
  setLocale(locales.value[nextIndex].code)
}
</script>
