<template>
  <div class="flex flex-col mt-6">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  v-for="(header, index) in headers"
                  :key="index"
                  scope="col"
                  class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <span>{{ header }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              <!-- Menampilkan vendor yang sudah dikelompokkan -->
              <tr v-for="(group, vendor, index) in groupedData" :key="vendor">
                <!-- Menampilkan nomor urut -->
                <td class="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                  {{ index + 1 }}
                  <!-- Nomor urut berdasarkan urutan vendor -->
                </td>
                <td class="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                  {{ vendor }}
                </td>
                <td class="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                  {{ group.length }}
                  <!-- Menampilkan jumlah item per vendor -->
                </td>
              </tr>
              <!-- Menampilkan baris total -->
              <tr class="font-bold bg-gray-100 dark:bg-gray-800">
                <td colspan="2" class="px-4 py-4 text-sm dark:text-white text-center">Total</td>
                <td class="px-4 py-4 text-sm dark:text-white text-left">
                  {{ totalCount }}
                  <!-- Total jumlah item -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  headers: Array,
  bodyData: Array,
})

// Mengelompokkan data berdasarkan vendor
const groupedData = computed(() => {
  return props.bodyData.reduce((groups, item) => {
    if (!groups[item.vendor]) {
      groups[item.vendor] = []
    }
    groups[item.vendor].push(item)
    return groups
  }, {})
})

// Menghitung total jumlah item dari semua vendor
const totalCount = computed(() => {
  return Object.values(groupedData.value).reduce((total, group) => {
    return total + group.length
  }, 0)
})
</script>

<style scoped></style>
