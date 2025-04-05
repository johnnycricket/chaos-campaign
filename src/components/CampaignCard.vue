<script setup lang="ts">
interface CampaignCardProps {
  name: string
  description: string
  employer: string
  unit: string
}

defineProps<CampaignCardProps>()
</script>

<template>
  <div class="card hover:shadow-lg transition-shadow duration-200 cursor-pointer">
    <h3 class="text-xl font-semibold mb-2">{{ name }}</h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {{ description }}
    </p>
    <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
      <span>Employer: {{ employer }}</span>
      <span>Unit: {{ unit }}</span>
    </div>
  </div>
</template> 