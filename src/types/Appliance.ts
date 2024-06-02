import { Category } from "@/types/Category";

export type Appliance = {
  name: string;
  slug: string;
  power: number;
  category: Category;
};

export type ApplianceWithConsumption = ApplianceWithId & {
  consumption: number;
  runtimeHours: number;
};

export type ApplianceWithId = Appliance & {
  id: string;
};
