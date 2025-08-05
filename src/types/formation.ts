export const FORMATION_TYPES = ["lance", "star", "level-ii"] as const;
export type FormationType = (typeof FORMATION_TYPES)[number];

export interface Formation {
  id: string;
  name: string;
  type: FormationType;
  unitIds: string[];
}

export interface FormationInput {
  name: string;
  type: FormationType;
  unitIds: string[];
}

export const createFormation = (input: FormationInput): Formation => {
  return {
    id: crypto.randomUUID(),
    name: input.name,
    type: input.type,
    unitIds: input.unitIds,
  };
};

export const validateFormationInput = (
  input: Partial<FormationInput>
): input is FormationInput => {
  if (
    !input.name ||
    typeof input.name !== "string" ||
    input.name.trim().length === 0
  ) {
    return false;
  }

  if (!FORMATION_TYPES.includes(input.type as FormationType)) {
    return false;
  }

  if (!Array.isArray(input.unitIds)) {
    return false;
  }

  return true;
};
