import backgroundResultSrc from "@/assets/backgroundResult.png";
import {
  appliancesWithConsumptionAtom,
  estimatedTotalConsumptionAtom,
  totalConsumptionAtom,
} from "@/store/atoms";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { SearchX } from "lucide-react";

export const ResultPanel = () => {
  const totalConsumption = useAtomValue(totalConsumptionAtom);
  const appliancesWithConsumption = useAtomValue(appliancesWithConsumptionAtom);
  const estimatedTotalConsumption = useAtomValue(estimatedTotalConsumptionAtom);
  const hasResults =
    !!appliancesWithConsumption && _.size(appliancesWithConsumption) > 0;

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
            <div className="text-2xl mb-4">No results to show for now...</div>
            <div className="text-center text-sm">
              Please enter your basic informations, select appliances and click
              compute to show your estimated consumption.
            </div>
          </div>
        </div>
      )}
      {hasResults &&
        appliancesWithConsumption &&
        estimatedTotalConsumption &&
        totalConsumption && (
          <div className="h-full flex items-center justify-center">
            <div className="grid gap-4">
              <div className="whitespace-nowrap text-2xl mb-5">
                You can
                <span className="text-2xl mx-3 px-3 text-[#23DCCA] py-1 border border-[#23DCCA] rounded-full">
                  use your appliance(s)
                </span>
                for...
              </div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="flex flex-col gap-2 items-center justify-center h-[15vw] rounded-lg backdrop-blur-lg backdrop-brightness-125">
                  <div className="text-center text-4xl">
                    {_.round((estimatedTotalConsumption ?? 0) / 1000, 2)}
                  </div>
                  <div className="text-xs">kWh</div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center h-[15vw] rounded-lg backdrop-blur-lg backdrop-brightness-125">
                  <div className="inline-flex gap-2 items-baseline text-center">
                    <div className="text-4xl">
                      {_.round(
                        (estimatedTotalConsumption * 100) / totalConsumption,
                        2
                      )}
                    </div>
                    <div>%</div>
                  </div>
                  <div className="text-xs">
                    of your total
                    <br /> consumption
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-4 gap-y-1 p-6 bg-[#002160] rounded-lg items-center max-h-[30vh] overflow-y-auto">
                {_(appliancesWithConsumption)
                  .orderBy((x) => x.consumption, "desc")
                  .map((appliance) => {
                    return (
                      <div key={appliance.id} className="contents">
                        <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {appliance.name}
                        </div>
                        <div className="text-sm place-self-end">
                          {_.round(appliance.consumption / 1000, 2)} kWh
                        </div>
                        <div className="text-sm place-self-end">
                          {_.round(
                            (appliance.consumption * 100) / totalConsumption,
                            2
                          )}{" "}
                          %
                        </div>
                      </div>
                    );
                  })
                  .value()}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
