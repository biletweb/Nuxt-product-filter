<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div v-for="(filter, index) in categoryFilters" :key="filter.id" :class="{ 'mb-2': index !== categoryFilters.length - 1 }">
      <span class="font-bold">{{ filter.name }}</span>
      <div v-for="value in filter.values" :key="value.id" class="flex items-center">
        <input
          type="checkbox"
          :value="value.value"
          :id="value.id"
          :checked="isChecked(filter.name, value.value)"
          @change="(handleFilterChange(filter.name, value.value), submitFilters())"
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
const selectedFilters = reactive({ ...parseFiltersFromQuery(route.query) })

const handleFilterChange = (name, value) => {
  selectedFilters[name] = selectedFilters[name] || []
  const filter = selectedFilters[name]

  if (filter.includes(value)) {
    selectedFilters[name] = filter.filter((val) => val !== value)
    if (selectedFilters[name].length === 0) {
      delete selectedFilters[name]
    }
  } else {
    selectedFilters[name] = [...filter, value]
  }
}

const submitFilters = () => {
  const query = buildQueryFromFilters(selectedFilters)
  const currentQuery = route.query
  if (JSON.stringify(currentQuery) !== JSON.stringify(query)) {
    router.push({ query })
  }
  emit('filterChange', selectedFilters)
}

const isChecked = (name, value) => {
  return selectedFilters[name]?.includes(value) || false
}

function parseFiltersFromQuery(query) {
  const filters = {}
  for (const [name, value] of Object.entries(query)) {
    filters[name] = Array.isArray(value) ? value : [value]
  }
  return filters
}

function buildQueryFromFilters(filters) {
  const query = {}
  for (const [name, values] of Object.entries(filters)) {
    query[name] = values
  }
  return query
}

onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    emit('filterChange', selectedFilters)
  }
})
</script>
