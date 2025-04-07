<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Campaign } from '@/types/campaign'
import CampaignCard from '@/components/CampaignCard.vue'
import CampaignForm from '@/components/CampaignForm.vue'

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
      <CampaignForm
        v-model="newCampaign"
        @submit="handleCreate"
        @cancel="showCreateDialog = false"
      />
    </div>
  </div>
</template> 