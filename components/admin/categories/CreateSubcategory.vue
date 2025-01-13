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
        <Icon v-if="loadingGetSubcategories" name="svg-spinners:8-dots-rotate" size="24px" class="text-sky-500" />
        <div v-else-if="subcategories.length" class="relative">
          <label for="category" class="ms-1 text-sm"> {{ $t('Name') }}<sup class="text-red-500">*</sup> </label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <div class="absolute right-2.5 top-[33px] text-gray-400">
            <Icon v-if="filteredSubcategories.length" name="mingcute:down-fill" size="24px" class="text-gray-400" />
            <Icon v-else-if="!subcategoryName" name="mingcute:left-fill" size="24px" class="text-gray-400" />
            <Icon v-else-if="subcategoryId" name="mingcute:check-circle-line" size="24px" class="text-green-300" />
          </div>
          <input
            v-model="subcategoryName"
            type="text"
            name="subcategory"
            id="subcategory"
            :placeholder="$t('Name')"
            class="w-full rounded-lg border p-2 pl-10 pr-8 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'subcategory',
              'border-red-500': errorField === 'subcategory'
            }"
            @input="handleSubcategoryInput"
          />
          <p v-if="errorField === 'subcategory'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
          <ul
            v-if="filteredSubcategories.length"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li
              v-for="subcat in filteredSubcategories"
              :key="subcat.id"
              class="cursor-pointer px-4 py-2 hover:bg-sky-100"
              @click="selectSubcategory(subcat)"
            >
              {{ subcat.name }}
            </li>
          </ul>
          <ul
            v-else-if="subcategoryName && !subcategoryId"
            class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
          >
            <li class="px-4 py-2">{{ $t('Nothing found') }}</li>
          </ul>
        </div>
        <div v-if="subcategoryId" class="relative col-span-2">
          <label for="name" class="ms-1 text-sm">{{ $t('Name') }}<sup class="text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-open-line" size="24px" />
          </div>
          <input
            v-model="name"
            type="text"
            name="name"
            id="name"
            :placeholder="$t('Name')"
            class="w-full rounded-lg border p-2 pl-10 pr-8 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'name',
              'border-red-500': errorField === 'name'
            }"
          />
          <p v-if="errorField === 'name'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
        </div>
      </div>
      <div v-if="name" class="mt-4 flex justify-end">
        <button type="submit" class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600" :disabled="loading">
          <Icon v-if="loading" name="svg-spinners:8-dots-rotate" size="24px" class="flex" />
          <span v-else>{{ $t('Create') }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const categoryName = ref('')
const subcategoryName = ref('')
const name = ref('')
const categoryId = ref('')
const subcategoryId = ref('')
const successResponse = ref(null)
const errorResponse = ref(null)
const errorField = ref(null)
const filteredCategories = ref([])
const filteredSubcategories = ref([])
const config = useRuntimeConfig()
const loadingGetSubcategories = ref(false)
const subcategories = ref([])

const { data, status, error } = await useLazyFetch(config.public.backendUrl + `/admin/category/get-categories`, {
  timeout: 5000
})

if (error.value) {
  showError({
    statusCode: error.statusCode,
    statusMessage: error.value.statusMessage || 'Request aborted due to timeout'
  })
}

const handleCategoryInput = () => {
  categoryId.value = ''
  filterCategories()
}

const handleSubcategoryInput = () => {
  subcategoryId.value = ''
  filterSubcategories()
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

const filterSubcategories = () => {
  if (subcategoryName.value) {
    filteredSubcategories.value = subcategories.value.filter((cat) =>
      cat.name.toLowerCase().includes(subcategoryName.value.toLowerCase())
    )
  } else {
    filteredSubcategories.value = []
  }
}

const selectCategory = (category) => {
  categoryName.value = category.name
  categoryId.value = category.id
  filteredCategories.value = []
  getSubcategories(categoryId.value)
}

const selectSubcategory = (subcategory) => {
  subcategoryName.value = subcategory.name
  subcategoryId.value = subcategory.id
  filteredSubcategories.value = []
}

const getSubcategories = async (categoryId) => {
  loadingGetSubcategories.value = true
  try {
    const response = await $fetch(config.public.backendUrl + `/admin/category/get-subcategories`, {
      params: {
        categoryId: categoryId
      },
      timeout: 5000
    })
    subcategories.value = response.subcategories
  } catch (error) {
    showError({
      statusCode: error.statusCode,
      statusMessage: error.response?._data?.name || error.statusMessage || 'Request aborted due to timeout'
    })
  } finally {
    loadingGetSubcategories.value = false
  }
}
</script>
