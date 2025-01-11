<template>
  <button type="button" @click="toggleLocale" class="flex items-center gap-1">
    <Icon name="mingcute:location-line" size="24px" />
    <span>{{ currentLocaleName }}</span>
  </button>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()

// Получаем имя текущей локали из списка доступных
const currentLocaleName = computed(() => {
  const current = locales.value.find((l) => l.code === locale.value)
  return current ? current.name : locale.value
})

const toggleLocale = () => {
  // Находим индекс текущей локали в списке локалей
  const currentIndex = locales.value.findIndex((l) => l.code === locale.value)
  // Получаем индекс следующей локали, используя цикл по списку
  const nextIndex = (currentIndex + 1) % locales.value.length
  // Устанавливаем следующую локаль
  setLocale(locales.value[nextIndex].code)
}
</script>
