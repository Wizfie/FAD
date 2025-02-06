<template>
  <section class="container px-4 py-4 mx-auto">
    <!-- Header dan Tombol -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">Monitoring FAD</h2>
          <span
            class="px-3 py-1 text-xs font-bold text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
            >{{ filteredData.length }} Record</span
          >
        </div>
      </div>
    </div>

    <!-- Search dan Tabel -->
    <div class="mt-6 md:flex md:items-center md:justify-between">
      <div
        class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
      >
        <NavButton label="View All" :to="'/'" :replace="true" />
        <NavButton label="OnProgress" :to="'/Progress'" :replace="true" />
        <NavButton label="Closed" :to="'/closed'" :replace="true" />
        <NavButton label="Closed Statistik" :to="'/closed/statistic'" :replace="true" />
      </div>
    </div>

    <!-- Tabel Baru: Statistik Vendor -->
    <div class="mt-6">
      <h3 class="text-lg font-medium text-gray-800 dark:text-white">
        Statistik FAD Berdasarkan Vendor
      </h3>
      <TableClosedStat :headers="headersVendor" :body-data="filteredData" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import FormFad from '@/components/FormFad.vue'
import NavButton from '@/components/NavButton.vue'
import axios from 'axios'
import TableClosedStat from '@/components/TableClosedStat.vue'

const dataFad = ref([])
const closed = ref('closed')

// Filter data berdasarkan pencarian
const filteredData = computed(() => {
  return dataFad.value.filter((item) => {
    return item.status.toLowerCase() == closed.value.toLowerCase()
  })
})

const headersVendor = ['No', 'Vendor', 'Jumlah FAD Closed']

// Fetch Data
const getData = async () => {
  try {
    const response = await axios.get('/api/v1/get-fad')
    if (response.status === 200) {
      dataFad.value = response.data.map((item, index) => ({
        noFad: item.noFad,
        item: item.item,
        terimaFad: item.terimaFad,
        terimaBbm: item.terimaBbm,
        vendor: item.vendor,
        status: item.status,
        deskripsi: item.deskripsi,
        keterangan: item.keterangan,
        id: item.id,
      }))
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data:', error)
  }
}

// Ambil data saat komponen dimuat
onMounted(() => {
  getData()
})
</script>

<style scoped>
/* Animasi slide-in */
.transform {
  transition: transform 0.3s ease-in-out;
}
.translate-x-0 {
  transform: translateX(0);
}
.translate-x-full {
  transform: translateX(100%);
}
</style>
