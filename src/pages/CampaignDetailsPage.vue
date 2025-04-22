<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Battle } from '@/types/battle'
import { useCampaignsStore } from '@/stores/campaigns'

const route = useRoute()
const router = useRouter()
const campaignsStore = useCampaignsStore()
const showNewBattleDialog = ref(false)

const campaign = computed(() => {
  const id = route.params.id as string
  return campaignsStore.getCampaign(id)
})

const newBattle = ref<Omit<Battle, 'id'>>({
  name: '',
  type: 'assault',
  location: '',
  date: '',
  description: '',
  result: 'pre-battle',
  warchestChange: 0
})

const handleCreateBattle = () => {
  // TODO: Implement battle creation
  showNewBattleDialog.value = false
}

// Redirect if campaign not found
if (!campaign.value) {
  router.push('/campaigns')
}
</script>

<template>
  <div v-if="campaign" class="space-y-8">
    <!-- Campaign Header -->
    <div class="card">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ campaign.name }}</h1>
          <p class="text-gray-600 dark:text-gray-300">
            {{ campaign.description }}
          </p>
        </div>
        <button
          class="btn btn-primary"
          @click="showNewBattleDialog = true"
        >
          New Battle
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Employer</h3>
          <p class="mt-1 text-lg">{{ campaign.employer }}</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Unit</h3>
          <p class="mt-1 text-lg">{{ campaign.unit }}</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Planet</h3>
          <p class="mt-1 text-lg">{{ campaign.planet }}</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Contract Type</h3>
          <p class="mt-1 text-lg">{{ campaign.contractType }}</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Contract Length</h3>
          <p class="mt-1 text-lg">{{ campaign.length }} months</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Base Pay</h3>
          <p class="mt-1 text-lg">{{ campaign.basePay }}%</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Support</h3>
          <p class="mt-1 text-lg">{{ campaign.support }}%</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Salvage</h3>
          <p class="mt-1 text-lg">{{ campaign.salvage }}%</p>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Warchest</h3>
          <p class="mt-1 text-lg">{{ campaign.warchest }}</p>
        </div>
      </div>
    </div>

    <!-- Battle List -->
    <div class="card">
      <h2 class="text-2xl font-semibold mb-6">Battles</h2>
      <div class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">Battle {{ i }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mt-1">
                A sample battle description that would be replaced with actual battle data.
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500 dark:text-gray-400">Location: Sample Location</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Date: 3025-01-{{ i }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Battle Dialog -->
    <div
      v-if="showNewBattleDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">New Battle</h2>
        <form @submit.prevent="handleCreateBattle" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Battle Name</label>
            <input
              v-model="newBattle.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Battle Type</label>
              <select
                v-model="newBattle.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="attack">Attack</option>
                <option value="defend">Defend</option>
                <option value="recon">Recon</option>
                <option value="pursuit">Pursuit</option>
                <option value="breakthrough">Breakthrough</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Location</label>
              <input
                v-model="newBattle.location"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Date</label>
            <input
              v-model="newBattle.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              v-model="newBattle.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Result</label>
              <select
                v-model="newBattle.result"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Result</option>
                <option value="victory">Victory</option>
                <option value="defeat">Defeat</option>
                <option value="draw">Draw</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Warchest Change</label>
              <input
                v-model="newBattle.warchestChange"
                type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              @click="showNewBattleDialog = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Battle
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 