<template>
  <div class="p-6">
    <!-- Tombol Back -->
    <div class="mb-4">
      <button
        @click="goBack"
        class="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-600"
      >
        ← Kembali
      </button>
    </div>

    <!-- Judul Halaman -->
    <h3 class="text-lg font-semibold mb-4">Kelola Vendor</h3>

    <!-- Form Tambah/Edit Vendor -->
    <form @submit.prevent="handleSubmit" class="mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Input Nama Vendor -->
        <div>
          <label class="block mb-2 text-sm text-gray-700">Nama Vendor</label>
          <input
            v-model="newVendor.name"
            type="text"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Masukkan nama vendor"
            required
          />
        </div>

        <!-- Input Status Vendor (Hanya saat Edit) -->
        <div v-if="isEditMode">
          <label class="block mb-2 text-sm text-gray-700">Status Vendor</label>
          <select
            v-model="newVendor.active"
            class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option :value="true">Aktif</option>
            <option :value="false">Non Aktif</option>
          </select>
        </div>
      </div>

      <!-- Tombol Submit -->
      <div class="flex justify-end gap-2 mt-4">
        <button
          type="submit"
          class="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {{ isEditMode ? 'Update' : 'Tambah' }}
        </button>
        <button
          v-if="isEditMode"
          type="button"
          @click="cancelEdit"
          class="px-4 py-2 text-sm text-white bg-gray-500 rounded-lg hover:bg-gray-600"
        >
          Batal
        </button>
      </div>
    </form>

    <!-- Daftar Vendor -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th scope="col" class="px-6 py-3">Nama Vendor</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(vendor, index) in vendors"
            :key="vendor.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4">{{ vendor.name }}</td>
            <td class="px-6 py-4">{{ vendor.active ? 'AKTIF' : 'NON AKTIF' }}</td>
            <td class="px-6 py-4 text-right">
              <button
                @click="editVendor(vendor)"
                class="px-3 py-1 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                @click="deleteVendor(vendor.id)"
                class="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 ml-2"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const vendors = ref([])
const newVendor = ref({ name: '', active: true })
const isEditMode = ref(false)
const editingVendorId = ref(null)

// Fungsi untuk kembali ke halaman sebelumnya
const goBack = () => {
  router.back()
}

// Ambil data vendor dari backend
const fetchVendors = async () => {
  try {
    const response = await axios.get('/api/v1/get-vendor')
    vendors.value = response.data
  } catch (error) {
    console.error('Gagal mengambil data vendor:', error)
  }
}

// Tambah atau Update Vendor
const handleSubmit = async () => {
  if (newVendor.value.name.trim() === '') return

  try {
    if (isEditMode.value) {
      console.log('Mengupdate vendor:', newVendor.value) // Debugging
      console.log('id vendor:', editingVendorId.value) // Debugging
      await axios.put(`/api/v1/update-vendor/${editingVendorId.value}`, newVendor.value)
      alert('Vendor berhasil diperbarui')
    } else {
      console.log('Menambahkan vendor baru:', newVendor.value)
      await axios.post('/api/v1/save-vendor', newVendor.value)
      alert('Vendor berhasil ditambahkan')
    }
    fetchVendors()
    cancelEdit()
  } catch (error) {
    console.error('Gagal menyimpan data vendor:', error)
  }
}

// Hapus Vendor
const deleteVendor = async (id) => {
  if (!confirm('Hapus vendor ini?')) return

  try {
    await axios.delete(`/api/v1/delete-vendor/${id}`)
    fetchVendors()
    alert('Vendor berhasil dihapus')
  } catch (error) {
    console.error('Gagal menghapus vendor:', error)
  }
}

// Edit Vendor
const editVendor = (vendor) => {
  console.log('Vendor yang dipilih untuk edit:', vendor)

  isEditMode.value = true
  editingVendorId.value = vendor.id
  newVendor.value = { ...vendor } // Salin data vendor
}

// Batalkan Edit
const cancelEdit = () => {
  isEditMode.value = false
  editingVendorId.value = null
  newVendor.value = { name: '', active: true }
}

// Ambil data vendor saat halaman dimuat
onMounted(() => {
  fetchVendors()
})
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
