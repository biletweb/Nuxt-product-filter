<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div v-for="(filter, index) in categoryFilters" :key="filter.id" :class="{ 'mb-2': index !== categoryFilters.length - 1 }">
      <span class="font-bold">{{ filter.name }}</span>
      <div v-for="value in filter.values" :key="value.id" class="relative flex items-center">
        <input
          type="checkbox"
          :id="value.id"
          :value="value.id"
          :checked="isChecked(filter.id, value.id)"
          class="h-4 w-4 cursor-pointer appearance-none rounded border border-sky-500 bg-white checked:bg-sky-500"
          @change="handleFilterChange(filter.id, value.id)"
        />
        <span v-if="isChecked(filter.id, value.id)" class="pointer-events-none absolute ms-[2px] text-white">
          <Icon name="mingcute:check-line" size="12px" />
        </span>
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
const selectedFilters = ref(parseFiltersFromQuery(route.query))

const handleFilterChange = (filterId, valueId) => {
  const filter = (selectedFilters.value[filterId] ||= [])
  const index = filter.indexOf(valueId)
  if (index === -1) {
    filter.push(valueId)
  } else {
    filter.splice(index, 1)
    if (!filter.length) {
      delete selectedFilters.value[filterId]
    }
  }
  submitFilters()
}

const submitFilters = () => {
  const query = buildQueryFromFilters(selectedFilters.value)
  router.push({ query })
  emit('filterChange', selectedFilters.value)
}

const isChecked = (filterId, valueId) => {
  return selectedFilters.value[filterId]?.includes(valueId) || false
}

function parseFiltersFromQuery(query) {
  const filters = {}
  for (const [key, value] of Object.entries(query)) {
    filters[key] = Array.isArray(value) ? value.map(Number) : [Number(value)]
  }
  return filters
}

const buildQueryFromFilters = (filters) => ({ ...filters })

onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    emit('filterChange', selectedFilters.value)
  }
})
</script>
