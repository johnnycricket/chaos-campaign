<script setup lang="ts">
defineProps<{
  name: string
  description: string
  employer: string
  unit: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 h-full min-w-[320px]"
    @click="$emit('click')"
  >
    <h3 class="text-xl font-semibold mb-3">{{ name }}</h3>
    <p class="text-gray-600 mb-5 line-clamp-2">{{ description }}</p>
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Employer:</span>
        <span class="font-medium text-gray-900">{{ employer }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">Unit:</span>
        <span class="font-medium text-gray-900">{{ unit }}</span>
      </div>
    </div>
  </div>
</template> 