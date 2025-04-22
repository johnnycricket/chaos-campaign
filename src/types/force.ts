export type ForceType = "mech" | "tank" | "infantry";
export type ForceStatus = "operational" | "damaged" | "destroyed" | "repairing";

export type Force = {
  id: string;
  name: string;
  type: ForceType;
  pointValue: number;
  isSupport: boolean;
  supportCost: number;
  currentArmor: number;
  maxArmor: number;
  currentStructure: number;
  maxStructure: number;
  pilotSkill: number;
  repairCost: number;
  status: ForceStatus;
  tonnage: number;
};

export interface ForceInput {
  name: string;
  type: ForceType;
  pointValue: number;
  isSupport: boolean;
  supportCost: number;
  currentArmor: number;
  maxArmor: number;
  currentStructure: number;
  maxStructure: number;
  pilotSkill: number;
  repairCost: number;
  status: ForceStatus;
  tonnage: number;
}

export interface ForceUpdate {
  name?: string;
  type?: ForceType;
  pointValue?: number;
  isSupport?: boolean;
  supportCost?: number;
  currentArmor?: number;
  maxArmor?: number;
  currentStructure?: number;
  maxStructure?: number;
  pilotSkill?: number;
  repairCost?: number;
  status?: ForceStatus;
  tonnage?: number;
}

export const validateForceInput = (
  input: Partial<ForceInput>
): input is ForceInput => {
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

export const createForce = (input: ForceInput): Force => {
  if (!validateForceInput(input)) {
    throw new Error("Invalid force input");
  }

  return {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    type: input.type,
    pointValue: Math.floor(input.pointValue),
    isSupport: input.isSupport,
    supportCost: Math.floor(input.supportCost),
    currentArmor: Math.floor(input.currentArmor),
    maxArmor: Math.floor(input.maxArmor),
    currentStructure: Math.floor(input.currentStructure),
    maxStructure: Math.floor(input.maxStructure),
    pilotSkill: Math.floor(input.pilotSkill),
    repairCost: Math.floor(input.repairCost),
    status: input.status,
    tonnage: Math.floor(input.tonnage),
  };
};

export const updateForce = (force: Force, updates: ForceUpdate): Force => {
  const updatedForce = { ...force };

  if (updates.name !== undefined) {
    if (typeof updates.name !== "string" || updates.name.trim().length === 0) {
      throw new Error("Invalid force name");
    }
    updatedForce.name = updates.name.trim();
  }

  if (updates.type !== undefined) {
    if (!["mech", "tank", "infantry"].includes(updates.type)) {
      throw new Error("Invalid force type");
    }
    updatedForce.type = updates.type;
  }

  if (updates.pointValue !== undefined) {
    if (typeof updates.pointValue !== "number" || updates.pointValue < 0) {
      throw new Error("Invalid point value");
    }
    updatedForce.pointValue = Math.floor(updates.pointValue);
  }

  if (updates.isSupport !== undefined) {
    if (typeof updates.isSupport !== "boolean") {
      throw new Error("Invalid support status");
    }
    updatedForce.isSupport = updates.isSupport;
  }

  if (updates.supportCost !== undefined) {
    if (typeof updates.supportCost !== "number" || updates.supportCost < 0) {
      throw new Error("Invalid support cost");
    }
    updatedForce.supportCost = Math.floor(updates.supportCost);
  }

  if (updates.currentArmor !== undefined) {
    if (typeof updates.currentArmor !== "number" || updates.currentArmor < 0) {
      throw new Error("Invalid current armor");
    }
    updatedForce.currentArmor = Math.floor(updates.currentArmor);
  }

  if (updates.maxArmor !== undefined) {
    if (
      typeof updates.maxArmor !== "number" ||
      updates.maxArmor < 0 ||
      updates.maxArmor < updatedForce.currentArmor
    ) {
      throw new Error("Invalid max armor");
    }
    updatedForce.maxArmor = Math.floor(updates.maxArmor);
  }

  if (updates.currentStructure !== undefined) {
    if (
      typeof updates.currentStructure !== "number" ||
      updates.currentStructure < 0
    ) {
      throw new Error("Invalid current structure");
    }
    updatedForce.currentStructure = Math.floor(updates.currentStructure);
  }

  if (updates.maxStructure !== undefined) {
    if (
      typeof updates.maxStructure !== "number" ||
      updates.maxStructure < 0 ||
      updates.maxStructure < updatedForce.currentStructure
    ) {
      throw new Error("Invalid max structure");
    }
    updatedForce.maxStructure = Math.floor(updates.maxStructure);
  }

  if (updates.pilotSkill !== undefined) {
    if (
      typeof updates.pilotSkill !== "number" ||
      updates.pilotSkill < 0 ||
      updates.pilotSkill > 6
    ) {
      throw new Error("Invalid pilot skill");
    }
    updatedForce.pilotSkill = Math.floor(updates.pilotSkill);
  }

  if (updates.repairCost !== undefined) {
    if (typeof updates.repairCost !== "number" || updates.repairCost < 0) {
      throw new Error("Invalid repair cost");
    }
    updatedForce.repairCost = Math.floor(updates.repairCost);
  }

  if (updates.status !== undefined) {
    if (
      !["operational", "damaged", "destroyed", "repairing"].includes(
        updates.status
      )
    ) {
      throw new Error("Invalid force status");
    }
    updatedForce.status = updates.status;
  }

  if (updates.tonnage !== undefined) {
    if (typeof updates.tonnage !== "number" || updates.tonnage < 0) {
      throw new Error("Invalid tonnage");
    }
    updatedForce.tonnage = Math.floor(updates.tonnage);
  }

  return updatedForce;
};
