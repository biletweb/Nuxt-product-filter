<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div v-for="(filter, index) in categoryFilters" :key="filter.id" :class="{ 'mb-2': index !== categoryFilters.length - 1 }">
      <span class="font-bold">{{ filter.name }}</span>
      <div v-for="value in filter.values" :key="value.id" class="relative flex items-center">
        <input
          type="checkbox"
          :id="value.id"
          :value="value.value"
          :checked="isChecked(filter.name, value.value)"
          class="h-4 w-4 cursor-pointer appearance-none rounded border border-sky-500 bg-white checked:bg-sky-500"
          @change="handleFilterChange(filter.name, value.value)"
        />
        <span v-if="isChecked(filter.name, value.value)" class="pointer-events-none absolute ms-[2px] text-white">
          <Icon name="mingcute:check-line" size="12px" />
        </span>
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
const route = useRoute()
const router = useRouter()

const parseFiltersFromQuery = (query) =>
  Object.fromEntries(Object.entries(query).map(([key, value]) => [key, Array.isArray(value) ? value : [value]]))

const buildQueryFromFilters = (filters) =>
  Object.fromEntries(
    Object.entries(filters)
      .filter(([, values]) => values.length > 0)
      .map(([key, values]) => [key, values.length === 1 ? values[0] : values])
  )

const selectedFilters = useState('selectedFilters', () => parseFiltersFromQuery(route.query))

const handleFilterChange = (name, value) => {
  const filters = { ...selectedFilters.value }
  if (!filters[name]) {
    filters[name] = []
  }
  const index = filters[name].indexOf(value)
  if (index > -1) {
    filters[name].splice(index, 1)
    if (filters[name].length === 0) {
      delete filters[name]
    }
  } else {
    filters[name].push(value)
  }
  selectedFilters.value = filters
}

const isChecked = (name, value) => {
  return selectedFilters.value[name]?.includes(value) || false
}

watch(
  selectedFilters,
  (newFilters) => {
    const query = buildQueryFromFilters(newFilters)
    if (JSON.stringify(route.query) !== JSON.stringify(query)) {
      router.push({ query })
    }
    emit('filterChange', newFilters)
  },
  { deep: true }
)

watch(
  () => route.fullPath,
  () => {
    selectedFilters.value = parseFiltersFromQuery(route.query)
  }
)

onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    emit('filterChange', selectedFilters.value)
  }
})

onUnmounted(() => {
  selectedFilters.value = {}
})
</script>
