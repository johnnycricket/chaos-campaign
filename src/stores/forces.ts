import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  type Force,
  type ForceInput,
  createForce,
  updateForce,
} from "@/types/force";
import {
  type Unit,
  type UnitInput,
  createUnit,
  updateUnit,
} from "@/types/unit";

const STORAGE_KEY = "chaos-campaign-forces";

export const useForcesStore = defineStore("forces", () => {
  const forces = ref<Force[]>([]);

  // Load units from localStorage on store initialization
  const loadForces = () => {
    const storedForces = localStorage.getItem(STORAGE_KEY);
    if (storedForces) {
      forces.value = JSON.parse(storedForces);
    }
  };

  // Save forces to localStorage whenever they change
  watch(
    forces,
    (newForces) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newForces));
    },
    { deep: true }
  );

  // Initialize store by loading forces
  loadForces();

  const addForce = (input: ForceInput) => {
    const force = createForce(input);
    forces.value.push(force);
    return force;
  };

  const updateForceDetails = (id: string, input: Partial<ForceInput>) => {
    const index = forces.value.findIndex((f) => f.id === id);
    if (index === -1) return null;

    const updatedForce = updateForce(forces.value[index], input);
    forces.value[index] = updatedForce;
    return updatedForce;
  };

  const deleteForce = (id: string) => {
    const index = forces.value.findIndex((f) => f.id === id);
    if (index === -1) return false;

    forces.value.splice(index, 1);
    return true;
  };

  const getForce = (id: string) => {
    return forces.value.find((f) => f.id === id) || null;
  };

  const addUnitToForce = (forceId: string, input: UnitInput) => {
    const force = getForce(forceId);
    if (!force) return null;

    const unit = createUnit(input);
    force.units.push(unit);
    return unit;
  };

  const updateUnitInForce = (
    unitId: string,
    input: Partial<UnitInput>
  ): Unit | null => {
    for (const force of forces.value) {
      const unitIndex = force.units.findIndex((u) => u.id === unitId);
      if (unitIndex !== -1) {
        const updatedUnit = updateUnit(force.units[unitIndex], input);
        force.units[unitIndex] = updatedUnit;
        return updatedUnit;
      }
    }
    return null;
  };

  const removeUnitFromForce = (forceId: string, unitId: string) => {
    const force = getForce(forceId);
    if (!force) return false;

    const index = force.units.findIndex((u) => u.id === unitId);
    if (index === -1) return false;

    force.units.splice(index, 1);
    return true;
  };

  return {
    forces,
    addForce,
    updateForceDetails,
    deleteForce,
    getForce,
    addUnitToForce,
    updateUnit: updateUnitInForce,
    removeUnitFromForce,
  };
});

export const useUnitStore = defineStore("units", {
  state: () => ({
    units: [] as Unit[],
  }),

  getters: {
    getUnit: (state) => (id: string) => {
      return state.units.find((unit) => unit.id === id);
    },
  },

  actions: {
    addUnit(unitInput: UnitInput) {
      const unit = createUnit(unitInput);
      this.units.push(unit);
    },

    updateUnit(id: string, updates: Partial<UnitInput>) {
      const index = this.units.findIndex((unit) => unit.id === id);
      if (index !== -1) {
        const unit = this.units[index];
        this.units[index] = { ...unit, ...updates };
      }
    },

    deleteUnit(id: string) {
      const index = this.units.findIndex((unit) => unit.id === id);
      if (index !== -1) {
        this.units.splice(index, 1);
      }
    },
  },
});
