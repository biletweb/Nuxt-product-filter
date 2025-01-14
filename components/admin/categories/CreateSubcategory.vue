<template>
  <div class="rounded-lg border border-slate-300 bg-slate-100 p-4">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-xl font-bold">{{ $t('Create subcategory') }}</div>
      <div v-if="successResponse" class="rounded-lg border border-green-100 bg-green-50 p-1 text-xs text-green-500">
        {{ successResponse }}
      </div>
    </div>
    <form @submit.prevent="createSubcategory">
      <div class="relative">
        <label for="category" class="ms-1 text-sm"> {{ $t('Parent category name') }}<sup class="text-red-500">*</sup> </label>
        <div class="absolute left-2.5 top-[33px] text-gray-400">
          <Icon name="mingcute:folder-line" size="24px" />
        </div>
        <div class="absolute right-2.5 top-[33px] text-gray-400">
          <Icon v-if="status === 'pending'" name="svg-spinners:8-dots-rotate" size="24px" class="text-sky-500" />
          <Icon v-else-if="filteredCategories.length" name="mingcute:down-fill" size="24px" class="text-gray-400" />
          <Icon v-else-if="!parentCategoryName" name="mingcute:left-fill" size="24px" class="text-gray-400" />
          <Icon v-else-if="parentCategoryId" name="mingcute:check-circle-line" size="24px" class="text-green-300" />
        </div>
        <input
          v-model="parentCategoryName"
          type="text"
          name="category"
          id="category"
          :placeholder="$t('Parent category name')"
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
          v-else-if="parentCategoryName && !parentCategoryId"
          class="absolute z-10 mt-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-white"
        >
          <li class="px-4 py-2">{{ $t('Nothing found') }}</li>
        </ul>
      </div>
      <div v-if="parentCategoryId" class="my-4 grid grid-cols-2 gap-4">
        <div class="relative">
          <label for="name" class="ms-1 text-sm">{{ $t('Name') }}<sup class="text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folder-line" size="24px" />
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
        <div class="relative">
          <label for="name" class="ms-1 text-sm">{{ $t('Slug') }}</label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:folders-line" size="24px" />
          </div>
          <input
            v-model="slug"
            type="text"
            name="slug"
            id="slug"
            :placeholder="$t('Slug')"
            class="w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'slug',
              'border-red-500': errorField === 'slug'
            }"
          />
          <p v-if="errorField === 'slug'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
        </div>
        <div class="relative col-span-2">
          <label for="description" class="ms-1 text-sm">{{ $t('Description SEO') }}<sup class="text-red-500">*</sup></label>
          <div class="absolute left-2.5 top-[33px] text-gray-400">
            <Icon name="mingcute:information-line" size="24px" />
          </div>
          <textarea
            v-model="description"
            name="description"
            id="description"
            :placeholder="$t('Description SEO')"
            class="min-h-[42px] w-full rounded-lg border p-2 pl-10 focus:outline-none"
            :class="{
              'focus:border-sky-500': errorField !== 'description',
              'border-red-500': errorField === 'description'
            }"
            rows="2"
          />
          <p v-if="errorField === 'description'" class="ms-1 mt-1 text-xs text-red-500">{{ errorResponse }}</p>
        </div>
      </div>

      <div v-if="parentCategoryId" class="mt-4 flex justify-end">
        <button type="submit" class="rounded-lg bg-sky-500 px-4 py-2 text-white hover:bg-sky-600" :disabled="loading">
          <Icon v-if="loading" name="svg-spinners:8-dots-rotate" size="24px" class="flex" />
          <span v-else>{{ $t('Create') }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const parentCategoryName = ref('')
const name = ref('')
const slug = ref('')
const description = ref('')
const parentCategoryId = ref('')
const successResponse = ref(null)
const errorResponse = ref(null)
const errorField = ref(null)
const filteredCategories = ref([])
const config = useRuntimeConfig()
const loading = ref(false)

const { data, status, error, refresh } = await useLazyFetch(config.public.backendUrl + `/admin/category/get-categories`, {
  timeout: 5000
})

if (error.value) {
  showError({
    statusCode: error.statusCode,
    statusMessage: error.value.statusMessage || 'Request aborted due to timeout'
  })
}

const handleCategoryInput = () => {
  parentCategoryId.value = ''
  filterCategories()
}

const filterCategories = () => {
  if (parentCategoryName.value) {
    filteredCategories.value = data.value.categories.filter((cat) =>
      cat.name.toLowerCase().includes(parentCategoryName.value.toLowerCase())
    )
  } else {
    filteredCategories.value = []
  }
}

const selectCategory = (category) => {
  parentCategoryName.value = category.name
  parentCategoryId.value = category.id
  filteredCategories.value = []
}

const createSubcategory = async () => {
  loading.value = true
  errorField.value = null
  errorResponse.value = null
  successResponse.value = null
  try {
    const response = await $fetch(config.public.backendUrl + `/admin/category/create-subcategory`, {
      method: 'POST',
      body: {
        name: name.value,
        slug: slug.value,
        description: description.value,
        categoryId: parentCategoryId.value
      },
      timeout: 5000
    })
    if (response.error) {
      errorResponse.value = response.error
      errorField.value = response.field
    } else {
      successResponse.value = response.message
      name.value = ''
      slug.value = ''
      description.value = ''
      parentCategoryName.value = ''
      parentCategoryId.value = ''
      refresh()
    }
  } catch (error) {
    showError({
      statusCode: error.statusCode,
      statusMessage: error.response?._data?.name || error.statusMessage || 'Request aborted due to timeout'
    })
  } finally {
    loading.value = false
  }
}
</script>
