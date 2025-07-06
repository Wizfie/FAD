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

    <div class="my-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div
        class="flex flex-wrap overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
      >
        <NavGroup />
      </div>
      <div class="flex justify-center md:justify-end">
        <button
          @click="openUserGuide"
          class="px-4 py-2 border border-blue-300 rounded-md font-medium hover:bg-blue-400 dark:text-white"
        >
          User Guide
        </button>
      </div>
    </div>

    <div>
      <h3 class="mt-2 text-lg font-semibold">Last Update</h3>
      <template v-if="lastUpdateData">
        <strong class="font-semibold text-gray-500 dark:text-gray-400">
          {{
            lastUpdateData.lastUpdate.timestamp
              ? new Date(lastUpdateData.lastUpdate.timestamp).toLocaleString()
              : 'Tidak tersedia'
          }}
        </strong>
      </template>
    </div>

    <!-- Kanban Columns -->
    <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2">
      <!-- Wrapper untuk Open, OnProgress, dan Closed -->
      <div
        v-for="status in ['Open', 'OnProgress', 'Closed']"
        :key="status"
        class="p-4 max-h-fit border-2 rounded transition-all"
      >
        <!-- Header Status -->
        <div
          @click="toggleAccordion(status)"
          class="flex justify-between items-center mb-4 p-5 rounded cursor-pointer"
          :class="{
            'bg-blue-200 dark:bg-blue-600 hover:border-blue-500 border-2': status === 'Open',
            'bg-yellow-100 dark:bg-yellow-600 hover:border-yellow-500 border-2':
              status === 'OnProgress',
            'bg-gray-100 dark:bg-gray-600 hover:border-gray-500 border-2': status === 'Closed',
          }"
        >
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ status }}</h3>
          <span class="text-lg font-bold text-gray-900 dark:text-white">
            {{ getStatusCount(status) }} Proyek
          </span>
        </div>

        <!-- Accordion Konten untuk Status Tertentu -->
        <div v-show="isAccordionOpen(status)" class="transition-all">
          <!-- Accordion untuk setiap plant -->
          <div
            v-for="plantGroup in groupedDataByPlant(status)"
            :key="plantGroup.plant"
            class="mb-6"
          >
            <div class="border-b">
              <!-- Accordion Header untuk Plant -->
              <button
                @click="togglePlantAccordion(status, plantGroup.plant)"
                class="w-full text-left p-3 text-lg font-medium text-gray-800 dark:text-white rounded-lg shadow-sm flex justify-between"
                :class="{
                  'hover:bg-blue-200 dark:hover:bg-blue-600': status === 'Open',
                  'hover:bg-yellow-100 dark:hover:bg-yellow-600': status === 'OnProgress',
                  'hover:bg-gray-100 dark:hover:bg-gray-600': status === 'Closed',
                }"
              >
                {{ plantGroup.plant }} - ({{ plantGroup.items.length }} Proyek)
                <span v-if="isPlantAccordionOpen(status, plantGroup.plant)" class="ml-2">▼</span>
                <span v-else class="ml-2">▲</span>
              </button>

              <!-- Accordion Content untuk Plant -->
              <div
                v-show="isPlantAccordionOpen(status, plantGroup.plant)"
                class="mt-2 transition-all max-h-80 overflow-y-auto"
              >
                <ul class="space-y-4">
                  <li
                    v-for="item in plantGroup.items"
                    :key="item.id"
                    class="p-3 border-2 hover:shadow-md hover:transform hover:translate-y-[-10px] transition-all rounded-lg bg-gr dark:text-white"
                  >
                    <div @click="redirectToSearch(item.status, item.noFad)" class="cursor-pointer">
                      <div class="text-md font-medium text-black dark:text-white">
                        {{ item.item }}
                      </div>
                      <div class="text-md text-gray-600 dark:text-gray-100">
                        Terima FAD: {{ item.terimaFad }}
                      </div>
                      <div class="text-md font-medium text-gray-600 dark:text-gray-100">
                        Vendor: {{ item.vendor }}
                      </div>
                      <div class="text-xl font-medium dark:text-gray-100">
                        Deskripsi: {{ item.deskripsi }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container px-4 py-6 mx-auto">
    <!-- Tabel Baru: Statistik Vendor -->
    <div class="mt-6">
      <h3 class="text-lg font-medium text-center text-gray-800 dark:text-white">
        Statistik FAD Berdasarkan Vendor dan Plant
      </h3>
      <TableClosedStat
        :headers-vendor="headersVendor"
        :headers-plant="headersPlant"
        :body-data="filteredClosed"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import NavGroup from '@/components/NavGroup.vue'
import { useRouter } from 'vue-router'
import TableClosedStat from '@/components/TableClosedStat.vue'

const router = useRouter()
const dataFad = ref([])
const closed = ref('closed')
const lastUpdateData = ref()

const lastUpdate = async () => {
  try {
    const response = await axios.get('/api/v1/get-log-update')
    if (response.status === 200) {
      lastUpdateData.value = response.data
      console.log('Last Update:', lastUpdateData.value.lastUpdate.timestamp) // Cek apakah data sudah benar
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data:', error)
  }
}

// Menyimpan state apakah accordion status terbuka atau tidak
const accordionState = ref({
  Open: false,
  OnProgress: false,
  Closed: false,
})

const plantAccordionState = ref({
  Open: {},
  OnProgress: {},
  Closed: {},
})

// Fetch Data
const getData = async () => {
  try {
    const response = await axios.get('/api/v1/get-fad')
    if (response.status === 200) {
      dataFad.value = response.data.map((item) => ({
        noFad: item.noFad,
        item: item.item,
        plant: item.plant,
        terimaFad: item.terimaFad,
        terimaBbm: item.terimaBbm,
        bast: item.bast,
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

// Filter data berdasarkan pencarian
const filteredClosed = computed(() => {
  return dataFad.value.filter((item) => {
    return item.status.toLowerCase() == closed.value.toLowerCase()
  })
})

const headersVendor = ['No', 'Vendor', ' FAD Closed']
const headersPlant = ['No', 'Plant', ' FAD Closed']

// Filter data berdasarkan status Open, OnProgress, Closed
const filteredData = computed(() => {
  return dataFad.value.filter(
    (item) => item.status === 'Open' || item.status === 'OnProgress' || item.status === 'Closed',
  )
})

// Kelompokkan data berdasarkan Plant
const groupedDataByPlant = (status) => {
  const filtered = filteredData.value.filter((item) => item.status === status)
  const grouped = filtered.reduce((acc, item) => {
    const plantGroup = acc.find((group) => group.plant === item.plant)
    if (plantGroup) {
      plantGroup.items.push(item)
    } else {
      acc.push({ plant: item.plant, items: [item] })
    }
    return acc
  }, [])
  return grouped
}

// Hitung jumlah proyek berdasarkan status
const getStatusCount = (status) => {
  return filteredData.value.filter((item) => item.status === status).length
}

// Toggle Accordion untuk Status
const toggleAccordion = (status) => {
  accordionState.value[status] = !accordionState.value[status]
}

// Cek status apakah accordion status terbuka
const isAccordionOpen = (status) => {
  return accordionState.value[status]
}

// Toggle Accordion untuk Plant di dalam Status
const togglePlantAccordion = (status, plant) => {
  if (!plantAccordionState.value[status]) {
    plantAccordionState.value[status] = {}
  }
  plantAccordionState.value[status][plant] = !plantAccordionState.value[status][plant]
}

// Cek status apakah accordion plant terbuka
const isPlantAccordionOpen = (status, plant) => {
  return plantAccordionState.value[status] && plantAccordionState.value[status][plant]
}

const redirectToSearch = (status, noFad) => {
  const path = `/${status.toLowerCase()}`
  router.push({ path, query: { q: noFad } })
}

const openUserGuide = () => {
  const userGuideUrl = import.meta.env.VITE_BASE_URL_IP

  // Membuka PDF di tab baru
  window.open(userGuideUrl, '_blank')
}

// Ambil data saat komponen dimuat
onMounted(() => {
  getData()
  lastUpdate()
})
</script>

<style scoped></style>
