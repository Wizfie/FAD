<template>
  <button :class="buttonClass" @click="handleClick">
    {{ label }}
  </button>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  buttonClass: {
    type: String,
    default:
      'px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 hover:bg-gray-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300',
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  to: {
    type: String,
    required: true,
  },
  replace: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const route = useRoute()

const handleClick = () => {
  props.onClick()

  if (props.replace) {
    router.replace(props.to)
  } else {
    router.push(props.to)
  }
}

const buttonClass = computed(() => {
  return {
    [props.buttonClass]: true,
    'bg-gray-500 text-white': route.path === props.to,
  }
})
</script>
