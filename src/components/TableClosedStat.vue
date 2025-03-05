<template>
  <!-- Vendor -->
  <div class="flex flex-col md:flex-row gap-2 mt-6">
    <div class="-mx-4 -my-2 w-full overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 md:px-6 lg:px-8">
        <div class="flex overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table class="min-w-full divide-y text-center divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  v-for="(header, index) in headersVendor"
                  :key="index"
                  scope="col"
                  class="py-3.5 px-4 text-md font-semibold text-gray-900 dark:text-white"
                >
                  <span>{{ header }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              <!-- Menampilkan vendor yang sudah dikelompokkan -->
              <tr v-for="(group, vendor, index) in groupedVendor" :key="vendor">
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
                <td class="px-4 py-4 text-sm dark:text-white">
                  {{ totalVendor }}
                  <!-- Total jumlah item -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Plant -->
    <div class="-mx-4 -my-2 w-full overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="flex overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
          <table class="min-w-full divide-y text-center divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  v-for="(header, index) in headersPlant"
                  :key="index"
                  scope="col"
                  class="py-3.5 px-4 text-md font-semibold text-gray-900 dark:text-white"
                >
                  <span>{{ header }}</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              <!-- Menampilkan vendor yang sudah dikelompokkan -->
              <tr v-for="(group, plant, index) in groupedPlant" :key="plant">
                <!-- Menampilkan nomor urut -->
                <td class="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                  {{ index + 1 }}
                  <!-- Nomor urut berdasarkan urutan vendor -->
                </td>
                <td class="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                  {{ plant }}
                </td>
                <td class="px-4 py-4 text-sm dark:text-white whitespace-nowrap">
                  {{ group.length }}
                  <!-- Menampilkan jumlah item per vendor -->
                </td>
              </tr>
              <!-- Menampilkan baris total -->
              <tr class="font-bold bg-gray-100 dark:bg-gray-800">
                <td colspan="2" class="px-4 py-4 text-sm dark:text-white text-center">Total</td>
                <td class="px-4 py-4 text-sm dark:text-white">
                  {{ totalPlant }}
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
  headersVendor: Array,
  headersPlant: Array,
  bodyData: Array,
})

// Mengelompokkan data berdasarkan vendor
const groupedVendor = computed(() => {
  return props.bodyData.reduce((groups, item) => {
    if (!groups[item.vendor]) {
      groups[item.vendor] = []
    }
    groups[item.vendor].push(item)
    console.log('VENDOR' + groups)
    return groups
  }, {})
})
// Mengelompokkan data berdasarkan plant, mempertimbangkan duplikat noFad
const groupedPlant = computed(() => {
  const seenFad = new Set() // Menyimpan noFad yang sudah diproses
  return props.bodyData.reduce((groups, item) => {
    // Memeriksa jika noFad sudah ada, jika ya, abaikan item
    if (!seenFad.has(item.noFad)) {
      seenFad.add(item.noFad)
      if (!groups[item.plant]) {
        groups[item.plant] = []
      }
      groups[item.plant].push(item)
    }
    console.log('PLANT' + groups)
    return groups
  }, {})
})

// Menghitung total jumlah item dari semua vendor
const totalVendor = computed(() => {
  return Object.values(groupedVendor.value).reduce((total, group) => {
    return total + group.length
  }, 0)
})

// Menghitung total jumlah item dari semua plant, hanya menghitung data unik berdasarkan noFad
const totalPlant = computed(() => {
  return Object.values(groupedPlant.value).reduce((total, group) => {
    // Membuat set untuk menghitung noFad yang unik dalam setiap grup
    const uniqueFads = new Set(group.map((item) => item.noFad))
    return total + uniqueFads.size
  }, 0)
})
</script>

<style scoped></style>
