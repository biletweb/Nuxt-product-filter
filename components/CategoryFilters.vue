<!-- <template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div v-for="(filter, index) in categoryFilters" :key="filter.id" :class="{ 'mb-2': index !== categoryFilters.length - 1 }">
      <span class="font-bold">{{ filter.name }}</span>
      <div v-for="value in filter.values" :key="value.id" class="flex items-center">
        <input
          type="checkbox"
          :value="value.id"
          :id="value.id"
          @change="(handleFilterChange(filter.id, value.id), submitFilters())"
        />
        <label :for="value.id" class="ms-1">{{ value.value }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categoryFilters: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filterChange'])
const selectedFilters = reactive({})

const handleFilterChange = (filterId, valueId) => {
  if (!selectedFilters[filterId]) {
    selectedFilters[filterId] = []
  }
  const filter = selectedFilters[filterId]
  if (filter.includes(valueId)) {
    const index = filter.indexOf(valueId)
    filter.splice(index, 1)
    if (filter.length === 0) {
      delete selectedFilters[filterId]
    }
  } else {
    filter.push(valueId)
  }
}

const submitFilters = () => {
  emit('filterChange', selectedFilters)
}
</script> -->

<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div v-for="(filter, index) in categoryFilters" :key="filter.id" :class="{ 'mb-2': index !== categoryFilters.length - 1 }">
      <span class="font-bold">{{ filter.name }}</span>
      <div v-for="value in filter.values" :key="value.id" class="flex items-center">
        <input
          type="checkbox"
          :value="value.id"
          :id="value.id"
          :checked="isChecked(filter.id, value.id)"
          @change="(handleFilterChange(filter.id, value.id), submitFilters())"
        />
        <label :for="value.id" class="ms-1">{{ value.value }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  categoryFilters: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filterChange'])
const route = useRoute()
const router = useRouter()

// Инициализация фильтров из URL
const selectedFilters = reactive({ ...parseFiltersFromQuery(route.query) })

const handleFilterChange = (filterId, valueId) => {
  if (!selectedFilters[filterId]) {
    selectedFilters[filterId] = []
  }
  const filter = selectedFilters[filterId]
  if (filter.includes(valueId)) {
    const index = filter.indexOf(valueId)
    filter.splice(index, 1)
    if (filter.length === 0) {
      delete selectedFilters[filterId]
    }
  } else {
    filter.push(valueId)
  }
}

const submitFilters = () => {
  // Синхронизируем выбранные фильтры с URL
  const query = buildQueryFromFilters(selectedFilters)
  router.push({ query })
  emit('filterChange', selectedFilters)
}

// Проверка состояния чекбокса
const isChecked = (filterId, valueId) => {
  return selectedFilters[filterId]?.includes(valueId) || false
}

// Вспомогательные функции для работы с URL
function parseFiltersFromQuery(query) {
  const filters = {}
  for (const [key, value] of Object.entries(query)) {
    filters[key] = Array.isArray(value) ? value.map(Number) : [Number(value)]
  }
  return filters
}

function buildQueryFromFilters(filters) {
  const query = {}
  for (const [key, values] of Object.entries(filters)) {
    query[key] = values
  }
  return query
}

onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    emit('filterChange', selectedFilters)
  }
})
</script>
