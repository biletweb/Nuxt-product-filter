<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-xl font-bold">{{ $t('Create subcategory') }}</div>
      <div v-if="successResponse" class="rounded-lg border border-green-100 bg-green-50 p-1 text-xs text-green-500">
        {{ successResponse }}
      </div>
    </div>
    <form @submit.prevent="">
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label for="category" class="ms-1 text-sm"> {{ $t('Name') }}<sup class="text-red-500">*</sup> </label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <div class="absolute right-2.5 top-[33px] text-gray-400">
            <Icon v-if="status === 'pending'" name="svg-spinners:8-dots-rotate" size="24px" class="text-sky-500" />
            <Icon v-else-if="filteredCategories.length" name="mingcute:down-fill" size="24px" class="text-gray-400" />
            <Icon v-else-if="!categoryName" name="mingcute:left-fill" size="24px" class="text-gray-400" />
            <Icon v-else-if="categoryId" name="mingcute:check-circle-line" size="24px" class="text-green-300" />
          </div>
          <input
            v-model="categoryName"
            type="text"
            name="category"
            id="category"
            :placeholder="$t('Name')"
            class="w-full rounded-lg border p-2 pl-10 pr-8 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'category',
              'border-red-500': errorField === 'category',
              'bg-gray-100': status === 'pending'
            }"
            @input="handleCategoryInput"
            :disabled="status === 'pending'"
          />
          <p v-if="errorField === 'category'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
          <ul
            v-if="filteredCategories.length"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li
              v-for="cat in filteredCategories"
              :key="cat.id"
              class="cursor-pointer px-4 py-2 hover:bg-sky-100"
              @click="selectCategory(cat)"
            >
              {{ cat.name }}
            </li>
          </ul>
          <ul
            v-else-if="categoryName && !categoryId"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li class="px-4 py-2">{{ $t('Nothing found') }}</li>
          </ul>
        </div>
        <div>
          <Icon v-if="loadingGetSubcategories" name="svg-spinners:8-dots-rotate" size="24px" class="text-sky-500" />
          <div v-else v-for="subcategory in subcategories" :key="subcategory.id">
            {{ subcategory.name }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const categoryName = ref('')
const categoryId = ref('')
const successResponse = ref(null)
const errorResponse = ref(null)
const errorField = ref(null)
const filteredCategories = ref([])
const config = useRuntimeConfig()
const loadingGetSubcategories = ref(false)
const subcategories = ref([])

const { data, status, error } = await useLazyFetch(config.public.backendUrl + `/admin/category/get-categories`, {
  timeout: 5000
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage || 'Request aborted due to timeout',
    fatal: true
  })
}

const handleCategoryInput = () => {
  categoryId.value = ''
  filterCategories()
}

const filterCategories = () => {
  if (categoryName.value) {
    filteredCategories.value = data.value.categories.filter((cat) =>
      cat.name.toLowerCase().includes(categoryName.value.toLowerCase())
    )
  } else {
    filteredCategories.value = []
  }
}

const selectCategory = (category) => {
  categoryName.value = category.name
  categoryId.value = category.id
  filteredCategories.value = []
  getSubcategories(categoryId.value)
}

const getSubcategories = async (categoryId) => {
  loadingGetSubcategories.value = true
  try {
    const response = await $fetch(config.public.backendUrl + `/admin/category/get-subcategories`, {
      params: {
        categoryId: categoryId
      },
      timeout: 50
    })
    subcategories.value = response.subcategories
  } catch (error) {
    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.response?._data?.name || error.statusMessage || 'Request aborted due to timeout',
      fatal: true
    })
  } finally {
    loadingGetSubcategories.value = false
  }
}
</script>
