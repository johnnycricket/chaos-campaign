<script setup lang="ts">
import { type Force } from '@/types/force'
import { useRouter } from 'vue-router'

interface Props {
  force: Force
}

const props = defineProps<Props>()
const router = useRouter()

const handleClick = () => {
  console.log(props.force.id)
  router.push(`/forces/${props.force.id}`)
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 h-full"
    @click="handleClick"
  >
    <div class="flex justify-between items-start">
      <h3 class="text-lg font-medium text-gray-900">{{ force.name }}</h3>
    </div>
    <div class="mt-4 space-y-2">
      <p class="text-sm text-gray-500">
        <span class="font-medium">Warchest:</span> {{ force.warchest }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-medium">Scale:</span> {{ force.scale }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-medium">Units:</span> {{ force.units.length }}
      </p>
    </div>
  </div>
</template> 