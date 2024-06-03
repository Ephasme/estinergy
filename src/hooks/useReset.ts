import { appliancesWithConsumptionAtom } from "@/store/atoms";
import { useSetAtom } from "jotai";

export const useReset = () => {
  const setList = useSetAtom(appliancesWithConsumptionAtom);
  return () => {
    setList(null);
  };
};
