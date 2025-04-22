<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        BattleTech Alpha Strike Chaos Campaign
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300">
        Track your mercenary unit's journey through the Inner Sphere
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card hover:shadow-lg transition-shadow duration-200">
        <h2 class="text-2xl font-semibold mb-4">Campaigns</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Create and manage your mercenary campaigns. Track contracts, battles, and unit progress.
        </p>
        <button
          class="btn btn-primary"
          @click="router.push('/campaigns')"
        >
          View Campaigns
        </button>
      </div>

      <div class="card hover:shadow-lg transition-shadow duration-200">
        <h2 class="text-2xl font-semibold mb-4">Forces</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Manage your mercenary forces. Track their composition, equipment, and battle history.
        </p>
        <button
          class="btn btn-primary"
          @click="router.push('/forces')"
        >
          View Forces
        </button>
      </div>
    </div>
  </div>
</template> 