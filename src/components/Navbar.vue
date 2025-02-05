<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white font-bold text-xl">FAD Process</div>

      <button @click="toggleDarkMode" class="text-white p-2 rounded flex items-center">
        <transition name="rotate" mode="out-in">
          <component
            :is="isDarkMode ? MoonIcon : SunIcon"
            class="w-6 h-6 transition-transform duration-75"
          />
        </transition>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  isDarkMode: Boolean,
  toggleDarkMode: Function,
})
</script>

<style scoped>
/* Animasi rotasi untuk transisi icon */
.rotate-enter-active,
.rotate-leave-active {
  transition: transform 1s ease-in-out;
}

.rotate-enter, 
.rotate-leave-to /* .rotate-leave-active in <2.1.8 */ {
  transform: rotate(360deg);
}
</style>
