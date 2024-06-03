import {
  appliancesAtom,
  appliancesWithConsumptionAtom,
  emailAtom,
  totalConsumptionAtom,
} from "@/store/atoms";
import { useCompute } from "@/hooks/useCompute";
import cn from "clsx";
import { useAtomValue, useSetAtom } from "jotai";

export const ComputeButton = () => {
  const totalConsumption = useAtomValue(totalConsumptionAtom);
  const appliances = useAtomValue(appliancesAtom);
  const email = useAtomValue(emailAtom);
  const setAppliancesWithConsumption = useSetAtom(
    appliancesWithConsumptionAtom
  );
  const isDisabled = !totalConsumption || !appliances.length || !email;
  const compute = useCompute();
  return (
    <button
      disabled={isDisabled}
      className={cn(
        " text-black text-sm py-1 px-4 rounded-full bg-[#23DCCA] hover:bg-[#6ee8dc] transition-colors",
        {
          "opacity-30": isDisabled,
        }
      )}
      type="button"
      onClick={() => {
        setAppliancesWithConsumption(compute());
      }}
    >
      Compute
    </button>
  );
};
