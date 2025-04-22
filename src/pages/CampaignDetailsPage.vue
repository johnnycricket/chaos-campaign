<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Battle } from '@/types/battle'
import { useCampaignsStore } from '@/stores/campaigns'
import { useBattlesStore } from '@/stores/battles'

const route = useRoute()
const router = useRouter()
const campaignsStore = useCampaignsStore()
const battlesStore = useBattlesStore()

const showNewBattleDialog = ref(false)
const showEditBattleDialog = ref(false)
const selectedBattle = ref<Battle | null>(null)

const campaign = computed(() => {
  const id = route.params.id as string
  return campaignsStore.getCampaign(id)
})

const battles = computed(() => {
  if (!campaign.value) return []
  return battlesStore.getBattlesForCampaign(campaign.value.id)
})

const newBattle = ref<Omit<Battle, 'id' | 'campaignId'>>({
  name: '',
  type: 'assault',
  location: '',
  date: '',
  description: '',
  result: 'pre-battle',
  warchestChange: 0
})

const handleCreateBattle = () => {
  if (!campaign.value) return
  const battle = battlesStore.createBattle({
    ...newBattle.value,
    campaignId: campaign.value.id
  })
  showNewBattleDialog.value = false
  newBattle.value = {
    name: '',
    type: 'assault',
    location: '',
    date: '',
    description: '',
    result: 'pre-battle',
    warchestChange: 0
  }
}

const handleEditBattle = (battle: Battle) => {
  selectedBattle.value = battle
  showEditBattleDialog.value = true
}

const handleUpdateBattle = (updatedBattle: Battle) => {
  if (!selectedBattle.value) return
  battlesStore.updateBattle(selectedBattle.value.id, updatedBattle)
  showEditBattleDialog.value = false
  selectedBattle.value = null
}

const handleDeleteBattle = (battle: Battle) => {
  if (!confirm(`Are you sure you want to delete ${battle.name}?`)) return
  battlesStore.deleteBattle(battle.id)
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
          v-for="battle in battles"
          :key="battle.id"
          class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">{{ battle.name }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mt-1">
                {{ battle.description }}
              </p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <p class="text-sm text-gray-500 dark:text-gray-400">Location: {{ battle.location }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Date: {{ battle.date }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Type: {{ battle.type }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Result: {{ battle.result }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Warchest Change: {{ battle.warchestChange }}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  @click="handleEditBattle(battle)"
                >
                  Edit
                </button>
                <button
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  @click="handleDeleteBattle(battle)"
                >
                  Delete
                </button>
              </div>
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
                <option value="assault">Assault</option>
                <option value="defend">Defend</option>
                <option value="flank">Flank</option>
                <option value="meeting engagement">Meeting Engagement</option>
                <option value="objective raid">Objective Raid</option>
                <option value="pursuit">Pursuit</option>
                <option value="pushback">Pushback</option>
                <option value="recon">Recon</option>
                <option value="retreat">Retreat</option>
                <option value="strike">Strike</option>
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
                <option value="pre-battle">Pre-Battle</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Warchest Change</label>
              <input
                v-model.number="newBattle.warchestChange"
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

    <!-- Edit Battle Dialog -->
    <div
      v-if="showEditBattleDialog && selectedBattle"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Edit Battle</h2>
        <form @submit.prevent="handleUpdateBattle(selectedBattle)" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Battle Name</label>
            <input
              v-model="selectedBattle.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Battle Type</label>
              <select
                v-model="selectedBattle.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="assault">Assault</option>
                <option value="defend">Defend</option>
                <option value="flank">Flank</option>
                <option value="meeting engagement">Meeting Engagement</option>
                <option value="objective raid">Objective Raid</option>
                <option value="pursuit">Pursuit</option>
                <option value="pushback">Pushback</option>
                <option value="recon">Recon</option>
                <option value="retreat">Retreat</option>
                <option value="strike">Strike</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Location</label>
              <input
                v-model="selectedBattle.location"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Date</label>
            <input
              v-model="selectedBattle.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea
              v-model="selectedBattle.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Result</label>
              <select
                v-model="selectedBattle.result"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Result</option>
                <option value="victory">Victory</option>
                <option value="defeat">Defeat</option>
                <option value="draw">Draw</option>
                <option value="pre-battle">Pre-Battle</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700">Warchest Change</label>
              <input
                v-model.number="selectedBattle.warchestChange"
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
              @click="showEditBattleDialog = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 