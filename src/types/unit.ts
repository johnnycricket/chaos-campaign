export type UnitType = "mech" | "tank" | "infantry";
export type UnitStatus =
  | "operational"
  | "damaged"
  | "crippled"
  | "destroyed"
  | "repairing";

export type Unit = {
  id: string;
  name: string;
  type: UnitType;
  pointValue: number;
  isSupport: boolean;
  supportCost: number;
  currentArmor: number;
  maxArmor: number;
  currentStructure: number;
  maxStructure: number;
  pilotSkill: number;
  repairCost: number;
  status: UnitStatus;
  tonnage: number;
};

export interface UnitInput {
  name: string;
  type: UnitType;
  pointValue: number;
  isSupport: boolean;
  supportCost: number;
  currentArmor: number;
  maxArmor: number;
  currentStructure: number;
  maxStructure: number;
  pilotSkill: number;
  repairCost: number;
  status: UnitStatus;
  tonnage: number;
}

export interface UnitUpdate {
  name?: string;
  type?: UnitType;
  pointValue?: number;
  isSupport?: boolean;
  supportCost?: number;
  currentArmor?: number;
  maxArmor?: number;
  currentStructure?: number;
  maxStructure?: number;
  pilotSkill?: number;
  repairCost?: number;
  status?: UnitStatus;
  tonnage?: number;
}

export const validateUnitInput = (
  input: Partial<UnitUpdate>
): input is UnitUpdate => {
  if (
    !input.name ||
    typeof input.name !== "string" ||
    input.name.trim().length === 0
  ) {
    return false;
  }

  if (!input.type || !["mech", "tank", "infantry"].includes(input.type)) {
    return false;
  }

  if (typeof input.pointValue !== "number" || input.pointValue < 0) {
    return false;
  }

  if (typeof input.isSupport !== "boolean") {
    return false;
  }

  if (typeof input.supportCost !== "number" || input.supportCost < 0) {
    return false;
  }

  if (typeof input.currentArmor !== "number" || input.currentArmor < 0) {
    return false;
  }

  if (
    typeof input.maxArmor !== "number" ||
    input.maxArmor < 0 ||
    input.maxArmor < input.currentArmor
  ) {
    return false;
  }

  if (
    typeof input.currentStructure !== "number" ||
    input.currentStructure < 0
  ) {
    return false;
  }

  if (
    typeof input.maxStructure !== "number" ||
    input.maxStructure < 0 ||
    input.maxStructure < input.currentStructure
  ) {
    return false;
  }

  if (
    typeof input.pilotSkill !== "number" ||
    input.pilotSkill < 0 ||
    input.pilotSkill > 6
  ) {
    return false;
  }

  if (typeof input.repairCost !== "number" || input.repairCost < 0) {
    return false;
  }

  if (
    !input.status ||
    !["operational", "damaged", "destroyed", "repairing"].includes(input.status)
  ) {
    return false;
  }

  if (typeof input.tonnage !== "number" || input.tonnage < 0) {
    return false;
  }

  return true;
};

export const createUnit = (input: UnitUpdate): Unit => {
  if (!validateUnitInput(input)) {
    throw new Error("Invalid unit input");
  }

  return {
    id: crypto.randomUUID(),
    name: input.name?.trim() ?? "",
    type: input.type as UnitType,
    pointValue: Math.floor(input.pointValue ?? 0),
    isSupport: input.isSupport ?? false,
    supportCost: Math.floor(input.supportCost ?? 0),
    currentArmor: Math.floor(input.currentArmor ?? 0),
    maxArmor: Math.floor(input.maxArmor ?? 0),
    currentStructure: Math.floor(input.currentStructure ?? 0),
    maxStructure: Math.floor(input.maxStructure ?? 0),
    pilotSkill: Math.floor(input.pilotSkill ?? 0),
    repairCost: Math.floor(input.repairCost ?? 0),
    status: input.status ?? "operational",
    tonnage: Math.floor(input.tonnage ?? 0),
  };
};

export const updateUnit = (unit: Unit, updates: UnitUpdate): Unit => {
  const updatedUnit = { ...unit };

  if (updates.name !== undefined) {
    if (typeof updates.name !== "string" || updates.name.trim().length === 0) {
      throw new Error("Invalid force name");
    }
    updatedUnit.name = updates.name.trim();
  }

  if (updates.type !== undefined) {
    if (!["mech", "tank", "infantry"].includes(updates.type)) {
      throw new Error("Invalid force type");
    }
    updatedUnit.type = updates.type;
  }

  if (updates.pointValue !== undefined) {
    if (typeof updates.pointValue !== "number" || updates.pointValue < 0) {
      throw new Error("Invalid point value");
    }
    updatedUnit.pointValue = Math.floor(updates.pointValue);
  }

  if (updates.isSupport !== undefined) {
    if (typeof updates.isSupport !== "boolean") {
      throw new Error("Invalid support status");
    }
    updatedUnit.isSupport = updates.isSupport;
  }

  if (updates.supportCost !== undefined) {
    if (typeof updates.supportCost !== "number" || updates.supportCost < 0) {
      throw new Error("Invalid support cost");
    }
    updatedUnit.supportCost = Math.floor(updates.supportCost);
  }

  if (updates.currentArmor !== undefined) {
    if (typeof updates.currentArmor !== "number" || updates.currentArmor < 0) {
      throw new Error("Invalid current armor");
    }
    updatedUnit.currentArmor = Math.floor(updates.currentArmor);
  }

  if (updates.maxArmor !== undefined) {
    if (
      typeof updates.maxArmor !== "number" ||
      updates.maxArmor < 0 ||
      updates.maxArmor < updatedUnit.currentArmor
    ) {
      throw new Error("Invalid max armor");
    }
    updatedUnit.maxArmor = Math.floor(updates.maxArmor);
  }

  if (updates.currentStructure !== undefined) {
    if (
      typeof updates.currentStructure !== "number" ||
      updates.currentStructure < 0
    ) {
      throw new Error("Invalid current structure");
    }
    updatedUnit.currentStructure = Math.floor(updates.currentStructure);
  }

  if (updates.maxStructure !== undefined) {
    if (
      typeof updates.maxStructure !== "number" ||
      updates.maxStructure < 0 ||
      updates.maxStructure < updatedUnit.currentStructure
    ) {
      throw new Error("Invalid max structure");
    }
    updatedUnit.maxStructure = Math.floor(updates.maxStructure);
  }

  if (updates.pilotSkill !== undefined) {
    if (
      typeof updates.pilotSkill !== "number" ||
      updates.pilotSkill < 0 ||
      updates.pilotSkill > 6
    ) {
      throw new Error("Invalid pilot skill");
    }
    updatedUnit.pilotSkill = Math.floor(updates.pilotSkill);
  }

  if (updates.repairCost !== undefined) {
    if (typeof updates.repairCost !== "number" || updates.repairCost < 0) {
      throw new Error("Invalid repair cost");
    }
    updatedUnit.repairCost = Math.floor(updates.repairCost);
  }

  if (updates.status !== undefined) {
    if (
      !["operational", "damaged", "destroyed", "repairing"].includes(
        updates.status
      )
    ) {
      throw new Error("Invalid force status");
    }
    updatedUnit.status = updates.status;
  }

  if (updates.tonnage !== undefined) {
    if (typeof updates.tonnage !== "number" || updates.tonnage < 0) {
      throw new Error("Invalid tonnage");
    }
    updatedUnit.tonnage = Math.floor(updates.tonnage);
  }

  return updatedUnit;
};
