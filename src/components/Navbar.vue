<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white">Vue App</div>
      <button @click="toggleDarkMode" class="text-white p-2 rounded">Toggle Dark Mode</button>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  toggleDarkMode: Function,
})
</script>
