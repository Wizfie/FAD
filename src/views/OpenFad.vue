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
        <NavButton label="Open" :to="'/open'" :replace="true" />
        <NavButton label="OnProgress" :to="'/progress'" :replace="true" />
        <NavButton label="Closed" :to="'/closed'" :replace="true" />
      </div>
      <div class="relative flex items-center mt-4 md:mt-0">
        <span class="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
    </div>

    <!-- Table Component -->
    <TableComponent
      :headers="headersFad"
      :body-data="filteredData"
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :edit-table="editRow"
      :delete-table="deleteFad"
      :show-action="false"
    />

    <!-- Pagination Component -->
    <Pagination
      :currentPage="currentPage"
      :total-pages="totalPages"
      @update:currentPage="updatePage"
      @updateNext="nextPage"
      @updatePrev="prevPage"
    />

    <!-- Total Pages Information -->
    <div class="mt-2 text-md text-gray-500 dark:text-gray-400">
      Showing page <span class="font-bold">{{ currentPage }}</span> of
      <span class="font-bold">{{ totalPages }}</span> pages
    </div>

    <!-- Form Slide-In -->
    <div
      class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': isFormOpen, 'translate-x-full': !isFormOpen }"
    >
      <!-- Menggunakan Komponen FormFad -->
      <FormFad
        :isFormOpen="isFormOpen"
        @toggle-form="toggleForm"
        :init-data="inputData"
        :is-edit-mode="isEditMode"
        @submit-form="handleSubmit"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import FormFad from '@/components/FormFad.vue'
import Pagination from '@/components/Pagination.vue'
import NavButton from '@/components/NavButton.vue'
import axios from 'axios'

const isFormOpen = ref(false)
const isEditMode = ref(false)

const dataFad = ref([])
const currentPage = ref(1) // Halaman aktif
const itemsPerPage = 5
const searchQuery = ref('')
const Open = ref('Open')
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage))

// Filter data berdasarkan pencarian
const filteredData = computed(() => {
  // Jika ada search query, cari berdasarkan query dan status OnProgress
  if (searchQuery.value) {
    return dataFad.value.filter((item) => {
      return (
        item.status.toLowerCase() == Open.value.toLowerCase() &&
        (item.noFad.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.item.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.vendor.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    })
  }

  // Jika tidak ada search query, hanya tampilkan data dengan status OnProgress
  return dataFad.value.filter((item) => {
    return item.status.toLowerCase() === Open.value.toLowerCase()
  })
})

const headersFad = [
  'NO',
  'No FAD',
  'Item',
  'plant',
  'Terima FAD',
  'Terima BBM',
  'Vendor',
  'Status',
  'Deskripsi',
  'Keterangan',
]

// Toggle form
const toggleForm = () => {
  if (isFormOpen.value && isEditMode.value) {
    resetForm()
    isEditMode.value = false
  }
  isFormOpen.value = !isFormOpen.value
}

// Mengupdate halaman saat tombol pagination diklik
const updatePage = (newPage) => {
  currentPage.value = newPage
}

// Fungsi untuk tombol Next
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Fungsi untuk tombol Previous
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Fetch Data
const getData = async () => {
  try {
    const response = await axios.get('/api/v1/get-fad')
    if (response.status === 200) {
      dataFad.value = response.data.map((item, index) => ({
        noFad: item.noFad,
        item: item.item,
        plant: item.plant,
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

<style scoped></style>
