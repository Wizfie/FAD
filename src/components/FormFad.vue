<template>
  <div class="p-6 scrollable-form">
    <!-- Form Header -->
    <div class="mb-6 border-b dark:border-gray-700">
      <div class="flex items-center gap-x-3">
        <h3 class="text-lg font-semibold dark:text-white">
          {{ isEditMode ? 'Edit Data' : 'Add Data' }} FAD
        </h3>
        <span
          class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
        >
          Form Input
        </span>
      </div>
    </div>

    <!-- Form Input -->
    <form @submit.prevent="handleSubmit" class="space-y-6 flex flex-col">
      <div class="grid grid-cols-1 gap-6">
        <!-- No FAD -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">No FAD</label>
          <input
            v-model="form.noFad"
            type="text"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Masukkan Nomor FAD"
            required
          />
        </div>

        <!-- Item -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">Item</label>
          <input
            v-model="form.item"
            type="text"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Nama Item"
            required
          />
        </div>
        <!-- Plant -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">Plant</label>
          <select
            v-model="form.plant"
            required
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="A/C">A/C</option>
            <option value="BHI">BHI</option>
            <option value="DK">DK</option>
            <option value="Mixing/E">Mixing/E</option>
            <option value="TBR">TBR</option>
            <option value="LOG">LOG</option>
            <option value="HO">HO</option>
            <option value="ENG">ENG</option>
            <option value="JQA">JQA</option>
            <option value="GA">GA</option>
            <option value="IT/EDP">IT/EDP</option>
          </select>
        </div>

        <!-- Terima FAD -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >Tanggal Terima FAD</label
          >
          <input
            v-model="form.terimaFad"
            type="date"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <!-- terima bbm -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >Tanggal Terima BBM</label
          >
          <input
            v-model="form.terimaBbm"
            type="date"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <!-- BAST -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300"
            >BAST (Bukti Aktual Serah Terima)</label
          >
          <input
            v-model="form.bast"
            type="date"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <!-- Vendor -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">Vendor</label>
          <select
            v-model="form.vendor"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.name">
              {{ vendor.name }}
            </option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">Status</label>
          <select
            v-model="form.status"
            required
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="OnProgress">On Progress</option>
          </select>
        </div>
        <!-- Deskripsi -->
        <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">Deskripsi</label>
        <textarea
          v-model="form.deskripsi"
          rows="3"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Deskripsi"
        ></textarea>
      </div>
      <!-- Keterangan -->
      <div>
        <label class="block mb-2 text-sm text-gray-700 dark:text-gray-300">Keterangan</label>
        <textarea
          v-model="form.keterangan"
          rows="3"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Tambahkan keterangan"
        ></textarea>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-x-3 mt-auto">
        <button
          type="button"
          @click="toggleForm()"
          class="px-6 py-2.5 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
        >
          Batal
        </button>

        <button
          type="submit"
          class="flex items-center px-6 py-2.5 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600 gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {{ isEditMode ? 'Update' : 'Save' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  initData: {
    type: Object,
    default: () => ({
      noFad: '',
      item: '',
      plant: '',
      terimaFad: '',
      terimaBbm: '',
      bast: '',
      vendor: '',
      status: '',
      deskripsi: '',
      keterangan: '',
      id: '',
    }),
  },
  isFormOpen: {
    type: Boolean,
    required: true,
  },

  isEditMode: Boolean,
})
const form = ref({
  noFad: props.initData.noFad || '',
  item: props.initData.item || '',
  plant: props.initData.plant || '',
  terimaFad: props.initData.terimaFad || '',
  terimaBbm: props.initData.terimaBbm || '',
  bast: props.initData.bast || '',
  vendor: props.initData.vendor || '',
  status: props.initData.status || '',
  deskripsi: props.initData.deskripsi || '',
  keterangan: props.initData.keterangan || '',
  id: props.initData.id || '',
})
const resetForm = () => {
  form.value = {
    noFad: '',
    item: '',
    plant: '',
    terimaFad: '',
    terimaBbm: '',
    bast: '',
    vendor: '',
    status: '',
    deskripsi: '',
    keterangan: '',
    id: '',
  }
}

watch(
  () => props.initData,
  (newData) => {
    if (props.isEditMode) {
      form.value = { ...newData }
    } else {
      resetForm()
    }
  },
  { deep: true, immediate: true },
)

const emit = defineEmits(['toggleForm', 'submitForm'])

const toggleForm = () => {
  emit('toggleForm')
  if (!props.isEditMode) {
    resetForm()
  } else {
    form.value = { ...props.initData }
  }
}
const trimInput = (key) => {
  form.value[key] = form.value[key].trim()
}

const handleSubmit = () => {
  Object.keys(form.value).forEach((key) => trimInput(key))
  emit('submitForm', form.value)
  if (!props.isEditMode) {
    resetForm()
  }
}

const vendors = ref([])

// Ambil data vendor dari backend
const fetchVendors = async () => {
  try {
    const response = await axios.get('/api/v1/get-vendor')
    vendors.value = response.data.filter((vendor) => vendor.active) // Hanya vendor aktif
  } catch (error) {
    console.error('Gagal mengambil data vendor:', error)
  }
}

// Ambil data vendor saat komponen dimuat
onMounted(() => {
  fetchVendors()
})
</script>

<style scoped>
/* Menambahkan scroll pada form jika konten melebihi tinggi kontainer */
.scrollable-form {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
