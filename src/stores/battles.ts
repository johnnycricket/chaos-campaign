import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Battle } from "@/types/battle";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "battles";

export const useBattlesStore = defineStore("battles", () => {
  const battles = ref<Battle[]>([]);

  // Load battles from localStorage on store initialization
  const loadBattles = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      battles.value = JSON.parse(stored);
    }
  };

  // Save battles to localStorage whenever they change
  watch(
    battles,
    (newBattles) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBattles));
    },
    { deep: true }
  );

  // Create a new battle
  const createBattle = (battleData: Omit<Battle, "id">) => {
    const newBattle: Battle = {
      ...battleData,
      id: uuidv4(),
    };
    battles.value.push(newBattle);
    return newBattle;
  };

  // Update an existing battle
  const updateBattle = (id: string, battleData: Partial<Battle>) => {
    const index = battles.value.findIndex((b) => b.id === id);
    if (index !== -1) {
      battles.value[index] = {
        ...battles.value[index],
        ...battleData,
      };
    }
  };

  // Delete a battle
  const deleteBattle = (id: string) => {
    const index = battles.value.findIndex((b) => b.id === id);
    if (index !== -1) {
      battles.value.splice(index, 1);
    }
  };

  // Get a single battle by ID
  const getBattle = (id: string) => {
    return battles.value.find((b) => b.id === id);
  };

  // Get all battles for a campaign
  const getBattlesForCampaign = (campaignId: string) => {
    return battles.value.filter((b) => b.campaignId === campaignId);
  };

  // Initialize the store
  loadBattles();

  return {
    battles,
    createBattle,
    updateBattle,
    deleteBattle,
    getBattle,
    getBattlesForCampaign,
  };
});
