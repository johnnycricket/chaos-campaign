import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Campaign } from "@/types/campaign";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "campaigns";

export const useCampaignsStore = defineStore("campaigns", () => {
  const campaigns = ref<Campaign[]>([]);

  // Load campaigns from localStorage on store initialization
  const loadCampaigns = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      campaigns.value = JSON.parse(stored);
    }
  };

  // Save campaigns to localStorage whenever they change
  watch(
    campaigns,
    (newCampaigns) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCampaigns));
    },
    { deep: true }
  );

  // Create a new campaign
  const createCampaign = (
    campaignData: Omit<Campaign, "id" | "battleIds" | "createdAt" | "updatedAt">
  ) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: uuidv4(),
      battleIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    campaigns.value.push(newCampaign);
    return newCampaign;
  };

  // Update an existing campaign
  const updateCampaign = (id: string, campaignData: Partial<Campaign>) => {
    const index = campaigns.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      campaigns.value[index] = {
        ...campaigns.value[index],
        ...campaignData,
        updatedAt: new Date().toISOString(),
      };
    }
  };

  // Delete a campaign
  const deleteCampaign = (id: string) => {
    const index = campaigns.value.findIndex((c) => c.id === id);
    if (index !== -1) {
      campaigns.value.splice(index, 1);
    }
  };

  // Get a single campaign by ID
  const getCampaign = (id: string) => {
    return campaigns.value.find((c) => c.id === id);
  };

  // Initialize the store
  loadCampaigns();

  return {
    campaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign,
  };
});
