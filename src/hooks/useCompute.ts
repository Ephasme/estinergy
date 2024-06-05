import { CATEGORIES } from "@/constants";
import {
  appliancesAtom,
  nbOfAppliancesByCategoryAtom,
  totalConsumptionAtom,
} from "@/store/atoms";
import { ApplianceWithConsumption } from "@/types/Appliance";
import { Category } from "@/types/Category";
import { useAtomValue } from "jotai";

export const useCompute = () => {
  const totalConsumption = useAtomValue(totalConsumptionAtom);
  const appliances = useAtomValue(appliancesAtom);
  const nbOfAppliancesByCategory = useAtomValue(nbOfAppliancesByCategoryAtom);

  return () => {
    if (!totalConsumption) {
      throw new Error("Total consumption is not set");
    }
    if (appliances.length === 0) {
      throw new Error("No appliances are set");
    }

    let minDiffT = Infinity;
    let maxPossibleHours = {
      A: Infinity,
      F: Infinity,
      L: Infinity,
    };
    let appliancesWithConsumption: Record<
      string,
      ApplianceWithConsumption
    > | null = null;

    for (const a of CATEGORIES.A.possibleRuntimeHours) {
      for (const f of CATEGORIES.F.possibleRuntimeHours) {
        for (const l of CATEGORIES.L.possibleRuntimeHours) {
          if (
            a >= maxPossibleHours.A &&
            f >= maxPossibleHours.F &&
            l >= maxPossibleHours.L
          ) {
            continue;
          }

          const runtimeHoursByCategory: Record<Category, number> = {
            A: a,
            F: f,
            L: l,
          };
          const currentConsumptionByCategory: Record<Category, number> = {
            A: 0,
            F: 0,
            L: 0,
          };
          const currentAppliancesWithConsumption: Record<
            string,
            ApplianceWithConsumption
          > = {};

          for (const appliance of appliances) {
            const runtimeHours =
              runtimeHoursByCategory[appliance.category] /
              nbOfAppliancesByCategory[appliance.category];
            const consumption = appliance.power * runtimeHours;
            currentConsumptionByCategory[appliance.category] += consumption;
            currentAppliancesWithConsumption[appliance.id] = {
              ...appliance,
              consumption,
              runtimeHours,
            };
          }

          const { A: E_a, F: E_f, L: E_l } = currentConsumptionByCategory;
          const diff = totalConsumption - (E_a + E_f + E_l);
          if (
            diff < 0 &&
            maxPossibleHours.A > a &&
            maxPossibleHours.F > f &&
            maxPossibleHours.L > l
          ) {
            maxPossibleHours = { A: a, F: f, L: l };
          }
          if (diff >= 0 && diff < minDiffT) {
            minDiffT = diff;
            appliancesWithConsumption = currentAppliancesWithConsumption;
          }
        }
      }
    }

    if (appliancesWithConsumption) {
      return appliancesWithConsumption;
    } else {
      throw new Error("Total consumption is too low");
    }
  };
};
