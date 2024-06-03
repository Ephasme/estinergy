import { atom } from "jotai";
import { ApplianceWithConsumption, ApplianceWithId } from "@/types/Appliance";
import { Category } from "@/types/Category";
import { MINIMAL_RUNTIME_BY_CATEGORY } from "@/constants";
import _ from "lodash";

export const emailAtom = atom<string | null>(null);

export const totalConsumptionAtom = atom<number | null>(null);

export const appliancesWithConsumptionAtom = atom<Record<
  string,
  ApplianceWithConsumption
> | null>(null);

export const totalEstimatedConsumptionAtom = atom((get) => {
  const appliancesWithConsumption = get(appliancesWithConsumptionAtom);

  if (!appliancesWithConsumption) {
    return null;
  }

  return _.sum(
    Object.values(appliancesWithConsumption).map((a) => a.consumption)
  );
});

export const appliancesAtom = atom<ApplianceWithId[]>([]);

export const appliancesByCategoryAtom = atom((get) => {
  const appliances = get(appliancesAtom);
  const appliancesByCategory: Record<Category, ApplianceWithId[]> = {
    F: [],
    A: [],
    L: [],
  };
  for (const appliance of appliances) {
    appliancesByCategory[appliance.category].push(appliance);
  }
  return appliancesByCategory;
});

export const nbOfAppliancesByCategoryAtom = atom((get) => {
  const appliancesByCategory = get(appliancesByCategoryAtom);
  return _.mapValues(appliancesByCategory, (appliances) => appliances.length);
});

export const totalConsumptionMinAtom = atom((get) => {
  const appliances = get(appliancesAtom);
  const appliancesByCategory = get(appliancesByCategoryAtom);
  const minimalHoursByApplianceId: Record<string, number> = {};

  for (const appliance of appliances) {
    minimalHoursByApplianceId[appliance.id] =
      MINIMAL_RUNTIME_BY_CATEGORY[appliance.category] /
      appliancesByCategory[appliance.category].length;
  }

  const minimalConsumptionTotal = _.sum(
    appliances.map(
      (appliance) => appliance.power * minimalHoursByApplianceId[appliance.id]
    )
  );

  return minimalConsumptionTotal;
});
