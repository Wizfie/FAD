<template>
  <div class="mt-6 md:flex md:items-center md:justify-between">
    <!-- Pagination Buttons -->
    <div
      class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
    >
      <button
        v-for="(option, index) in visiblePageNumbers"
        :key="index"
        :class="['px-5 py-2 text-sm font-medium', buttonClasses(option)]"
        @click="changePage(option)"
      >
        {{ option }}
      </button>
    </div>

    <!-- Search Input -->
    <div class="relative flex items-center mt-4 md:mt-0">
      <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
        <button
          :disabled="props.currentPage === 1"
          @click="prevButton"
          class="flex items-center cursor-pointer justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span> previous </span>
        </button>

        <button
          :disabled="props.currentPage === props.totalPages"
          @click="nextButton"
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm cursor-pointer text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span> Next </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

// Define props
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const visiblePageNumbers = computed(() => {
  const maxVisiblePages = 10
  const startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1)

  let visiblePages = []
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i)
  }

  return visiblePages
})

// Define emits
const emit = defineEmits(['update:currentPage'])

const changePage = (option) => {
  emit('update:currentPage', option)
}

const nextButton = () => {
  emit('updateNext')
}

const prevButton = () => {
  emit('updatePrev')
}
// Compute button classes based on the current page
const buttonClasses = (option) => {
  return option === props.currentPage
    ? 'text-blue-600 bg-blue-100 dark:bg-gray-800 dark:text-blue-400'
    : 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100'
}
</script>

<style scoped></style>
