<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Campaign } from '@/types/campaign'
import CampaignCard from '@/components/CampaignCard.vue'
import CampaignForm from '@/components/CampaignForm.vue'
import { useCampaignsStore } from '@/stores/campaigns'

const router = useRouter()
const campaignsStore = useCampaignsStore()
const showCreateDialog = ref(false)

const newCampaign = ref<Omit<Campaign, 'id' | 'battleIds' | 'createdAt' | 'updatedAt'>>({
  name: '',
  description: '',
  employer: '',
  unit: '',
  planet: '',
  contractType: 'Raid',
  scale: 1,
  length: 12,
  basePay: 100,
  transportation: 100,
  support: 100,
  salvage: 100,
  commandType: 'independent',
  warchest: 0
})

const handleCreate = () => {
  const campaign = campaignsStore.createCampaign(newCampaign.value)
  showCreateDialog.value = false
  router.push(`/campaigns/${campaign.id}`)
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
        v-for="campaign in campaignsStore.campaigns"
        :key="campaign.id"
        :name="campaign.name"
        :description="campaign.description"
        :employer="campaign.employer"
        :unit="campaign.unit"
        @click="router.push(`/campaigns/${campaign.id}`)"
      />
    </div>

    <!-- Create Campaign Dialog -->
    <div
      v-if="showCreateDialog"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <CampaignForm
        v-model="newCampaign"
        @submit="handleCreate"
        @cancel="showCreateDialog = false"
      />
    </div>
  </div>
</template> 