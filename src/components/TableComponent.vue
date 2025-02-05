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
              <tr v-for="(row, index) in bodyData" :key="index">
                <td
                  v-for="(value, key) in row"
                  :key="key"
                  class="px-4 py-4 text-sm dark:text-white whitespace-nowrap"
                >
                  <div v-if="key !== 'id'">{{ value }}</div>
                </td>
                <template v-if="bodyData.length > 0">
                  <td v-if="showAction" class="px-4 py-4 text-sm whitespace-nowrap">
                    <div class="flex gap-2">
                      <button
                        @click="editTable(row)"
                        class="px-3 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteTable(row.id)"
                        class="px-3 text-sm text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },

  bodyData: {
    type: Array,
    required: true,
  },
  showAction: Boolean,
  editTable: Function,
  deleteTable: Function,
})
</script>
<style scoped></style>
