<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Campaign } from '@/types/campaign'
import CampaignCard from '@/components/CampaignCard.vue'

const router = useRouter()
const showCreateDialog = ref(false)

const newCampaign = ref<Omit<Campaign, 'id' | 'battleIds' | 'createdAt' | 'updatedAt'>>({
  name: '',
  description: '',
  employer: '',
  unit: '',
  planet: '',
  contractType: 'attack',
  scale: 1,
  length: 12,
  basePay: 100,
  transportation: 100,
  support: 100,
  salvage: 100,
  commandType: 'attached',
  warchest: 0
})

const handleCreate = () => {
  // TODO: Implement campaign creation
  showCreateDialog.value = false
  router.push('/campaigns/new-campaign-id')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Campaigns</h1>
      <button
        class="btn btn-primary"
        @click="showCreateDialog = true"
      >
        New Campaign
      </button>
    </div>

    <!-- Campaign List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CampaignCard
        v-for="i in 3"
        :key="i"
        :name="`Campaign ${i}`"
        description="A sample campaign description that would be replaced with actual campaign data."
        employer="Sample Employer"
        unit="Sample Unit"
        @click="router.push(`/campaigns/${i}`)"
      />
    </div>

    <!-- Create Campaign Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="card max-w-2xl w-full">
        <h2 class="text-2xl font-semibold mb-6">New Campaign</h2>
        <form @submit.prevent="handleCreate" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Campaign Name</label>
            <input
              v-model="newCampaign.name"
              type="text"
              class="input"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="newCampaign.description"
              class="input"
              rows="3"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Employer</label>
              <input
                v-model="newCampaign.employer"
                type="text"
                class="input"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Unit</label>
              <input
                v-model="newCampaign.unit"
                type="text"
                class="input"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Planet</label>
            <input
              v-model="newCampaign.planet"
              type="text"
              class="input"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Contract Type</label>
              <select
                v-model="newCampaign.contractType"
                class="input"
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
              <label class="block text-sm font-medium mb-1">Scale</label>
              <select
                v-model="newCampaign.scale"
                class="input"
                required
              >
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Length (months)</label>
              <input
                v-model="newCampaign.length"
                type="number"
                class="input"
                required
                min="1"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Base Pay (%)</label>
              <input
                v-model="newCampaign.basePay"
                type="number"
                class="input"
                required
                min="0"
                max="100"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Transportation (%)</label>
              <input
                v-model="newCampaign.transportation"
                type="number"
                class="input"
                required
                min="0"
                max="100"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Support (%)</label>
              <input
                v-model="newCampaign.support"
                type="number"
                class="input"
                required
                min="0"
                max="100"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Salvage (%)</label>
              <input
                v-model="newCampaign.salvage"
                type="number"
                class="input"
                required
                min="0"
                max="100"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Command Type</label>
              <select
                v-model="newCampaign.commandType"
                class="input"
                required
              >
                <option value="">Select Type</option>
                <option value="independent">Independent</option>
                <option value="attached">Attached</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Starting Warchest</label>
              <input
                v-model="newCampaign.warchest"
                type="number"
                class="input"
                required
                min="0"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showCreateDialog = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template> 