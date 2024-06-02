import {
  totalConsumptionAtom,
  appliancesAtom,
  nbOfAppliancesByCategoryAtom,
} from "@/atoms";
import { compute } from "@/lib/compute";
import { useAtomValue } from "jotai";

export const useCompute = () => {
  const totalConsumption = useAtomValue(totalConsumptionAtom);
  const appliances = useAtomValue(appliancesAtom);
  const nbOfAppliancesByCategory = useAtomValue(nbOfAppliancesByCategoryAtom);

  return compute({
    appliances,
    totalConsumption,
    nbOfAppliancesByCategory,
  });
};
