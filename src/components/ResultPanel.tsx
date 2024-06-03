import backgroundResultSrc from "@/assets/backgroundResult.png";
import { appliancesWithConsumptionAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { SearchX } from "lucide-react";
import { useMemo } from "react";

export const ResultPanel = () => {
  const appliancesWithConsumption = useAtomValue(appliancesWithConsumptionAtom);
  const hasResults =
    !!appliancesWithConsumption && _.size(appliancesWithConsumption) > 0;

    useMemo(() => {
      if (!appliancesWithConsumption) {
      _.sumBy(appliancesWithConsumption, (a) => a.consumption);
    }})

  return (
    <div
      className="p-12 h-full"
      style={{
        backgroundImage: `url(${backgroundResultSrc})`,
        backgroundSize: "cover",
      }}
    >
      {!hasResults && (
        <div className="h-full grid place-items-center">
          <div className="grid place-items-center">
            <SearchX size={38} className="mb-6" />
            <div className="text-2xl mb-5">No results to show for now...</div>
            <div className="text-center">
              Please enter your basic informations, select appliances and click
              compute to show your estimated consumption.
            </div>
          </div>
        </div>
      )}
      {hasResults && (
        <div>
          <div>You can use your appliances for...</div>
          <div>
        </div>
      )}
    </div>
  );
};
