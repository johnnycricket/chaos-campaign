export interface Campaign {
  id: string;
  name: string;
  description: string;
  employer: string;
  unit: string;
  planet: string;
  contractType:
    | "Raid"
    | "Expedition"
    | "Pirate Hunt"
    | "Garrison"
    | "Invasion"
    | "Retainer";
  scale: 1 | 2 | 3;
  length: number;
  basePay: number;
  transportation: number;
  support: number;
  salvage: number;
  commandType: "independent" | "liason";
  warchest: number;
  battleIds: string[];
  createdAt: string;
  updatedAt: string;
}
