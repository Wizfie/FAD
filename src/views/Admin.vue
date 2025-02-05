<template>
  <section class="container px-4 py-4 mx-auto">
    <!-- Header dan Tombol -->
    <div class="sm:flex sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-x-3">
          <h2 class="text-lg font-medium text-gray-800 dark:text-white">Monitoring FAD ADMIN</h2>
          <span
            class="px-3 py-1 text-xs font-bold text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
            >{{ dataFad.length }} Record</span
          >
        </div>
      </div>

      <div class="flex items-center mt-4 gap-x-3">
        <button
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3098_154395)">
              <path
                d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                stroke="currentColor"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3098_154395">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Export</span>
        </button>

        <button
          @click="toggleForm"
          class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Add Data</span>
        </button>
      </div>
    </div>

    <!-- Search dan Tabel -->
    <div class="mt-6 md:flex md:items-center md:justify-between">
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
      :headers="headers"
      :body-data="paginatedData"
      :edit-table="editRow"
      :delete-table="deleteFad"
      show-action="true"
    />

    <!-- Pagination Component -->
    <Pagination
      :paginationOptions="visiblePageNumbers"
      :currentPage="currentPage"
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
import axios from 'axios'

const isFormOpen = ref(false)
const isEditMode = ref(false)

// Pisahkan dataFad untuk read data
const dataFad = ref([])
const currentPage = ref(1) // Halaman aktif
const itemsPerPage = 10
const searchQuery = ref('')
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage))

const visiblePageNumbers = computed(() => {
  const maxVisiblePages = 8
  const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)

  let visiblePages = []
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i)
  }
  return visiblePages
})

// Filter data berdasarkan pencarian
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return dataFad.value
  }
  return dataFad.value.filter((item) => {
    return (
      item['noFad'].toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.item.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

// Mengambil data untuk setiap halaman
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const paginated = filteredData.value.slice(startIndex, endIndex)

  return paginated
})

const inputData = ref({
  noFad: '',
  item: '',
  terimaFad: '',
  terimaBbm: '',
  vendor: '',
  status: '',
  deskripsi: '',
  keterangan: '',
  id: '',
})

// Reset form data
const resetForm = () => {
  inputData.value = {
    noFad: '',
    item: '',
    terimaFad: '',
    terimaBbm: '',
    vendor: '',
    status: '',
    deskripsi: '',
    keterangan: '',
    id: '',
  }
}

const editRow = (row) => {
  // Menetapkan data yang akan diedit ke dalam inputData

  inputData.value = {
    noFad: row['noFad'],
    item: row.item,
    terimaFad: row['terimaFad'],
    terimaBbm: row['terimaBbm'],
    vendor: row.vendor,
    status: row.status,
    deskripsi: row.deskripsi,
    keterangan: row.keterangan,
    id: row.id,
  }

  // Menentukan bahwa ini adalah mode edit
  isFormOpen.value = true
  isEditMode.value = true
  console.log(isEditMode.value)
}

const headers = [
  'NO',
  'No FAD',
  'Item',
  'Terima FAD',
  'Terima BBM',
  'Vendor',
  'Status',
  'Keterangan',
  'Durasi',
  'Action',
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
        no: index + 1,
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

// Handle form submission

const handleSubmit = async (formData) => {
  try {
    if (isEditMode.value) {
      await updateDataFad(formData)
    } else {
      await addDataFad(formData)
    }

    isFormOpen.value = false
    isEditMode.value = false
    resetForm()
  } catch (error) {
    console.error('Terjadi kesalahan saat submit:', error)
    alert('Terjadi kesalahan saat submit data.')
  }
}

const addDataFad = async (formData) => {
  try {
    const response = await axios.post('/api/v1/save-fad', formData)
    if (response.status === 200) {
      getData()
      alert('Data berhasil disimpan!')
      isFormOpen.value = false
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat menyimpan data:', error)
    alert('Terjadi kesalahan saat menyimpan data.')
  }
}

const updateDataFad = async (formData) => {
  try {
    if (!formData.id) {
      console.error('ID tidak ditemukan!', formData)
      alert('Terjadi kesalahan: ID tidak ditemukan.')
      return
    }

    console.log('Mengupdate data dengan ID:', formData.id) // Debugging

    const response = await axios.put(`/api/v1/update-fad/${formData.id}`, formData)
    if (response.status === 200) {
      const index = dataFad.value.findIndex((item) => item.id === formData.id)
      if (index !== -1) {
        dataFad.value[index] = { ...dataFad.value[index], ...formData }
      }
      alert('Data berhasil diperbarui!')
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat memperbarui data:', error)
    alert('Terjadi kesalahan saat memperbarui data.')
  }
}

const deleteFad = async (id) => {
  if (!confirm('Hapus data?')) return

  try {
    const res = await axios.delete(`/api/v1/delete-fad/${id}`)
    if (res.status == 200) {
      alert('Data berhasil di hapus')
    }
    getData()
  } catch (error) {
    console.log(error)
    alert('Gagal menghapus data')
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
