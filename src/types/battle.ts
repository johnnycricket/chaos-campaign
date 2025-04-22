export interface Battle {
  id: string;
  campaignId: string;
  name: string;
  type:
    | "assault"
    | "defend"
    | "flank"
    | "meeting engagement"
    | "objective raid"
    | "pursuit"
    | "pushback"
    | "reçon"
    | "retreat"
    | "strike";
  location: string;
  date: string;
  description: string;
  result: "victory" | "defeat" | "draw" | "pre-battle";
  warchestChange: number;
}
