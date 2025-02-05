<template>
  <div :class="{ dark: isDarkMode }">
    <Navbar :isDarkMode="isDarkMode" :toggleDarkMode="toggleDarkMode" />
    <div class="min-h-screen bg-white dark:bg-gray-900">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'

const isDarkMode = ref(false)

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode) {
    isDarkMode.value = savedMode === 'true'
  } else {
    // Cek preferensi sistem jika tidak ada pengaturan sebelumnya
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Set dark mode class pada body atau html
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  // Simpan pilihan mode di localStorage
  localStorage.setItem('darkMode', isDarkMode.value.toString())

  // Update class pada elemen html atau body untuk mengganti tema
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>
