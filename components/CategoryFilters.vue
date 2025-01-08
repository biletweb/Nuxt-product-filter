<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div v-for="(filter, index) in categoryFilters" :key="filter.id" :class="{ 'mb-2': index !== categoryFilters.length - 1 }">
      <span class="font-bold">{{ filter.name }}</span>
      <div v-for="value in filter.values" :key="value.id" class="flex items-center">
        <input type="checkbox" :value="value.id" :id="value.id" @change="handleFilterChange(filter.id, value.id)" />
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
</script>
