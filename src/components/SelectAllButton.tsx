import { appliancesAtom } from "@/store/atoms";
import { APPLIANCES } from "@/constants";
import { produce } from "immer";
import { useAtom } from "jotai";
import cn from "clsx";
import { useMemo } from "react";

export const SelectAllButton = () => {
  const [appliances, setAppliances] = useAtom(appliancesAtom);

  const allSelected = useMemo(() => {
    for (const appliance of APPLIANCES) {
      if (!appliances.find((a) => a.slug === appliance.slug)) {
        return false;
      }
    }
    return true;
  }, [appliances]);

  return (
    <button
      className={cn("border border-white px-3 py-1 rounded-md text-xs", {
        "opacity-30": allSelected,
      })}
      disabled={allSelected}
      onClick={() => {
        for (const appliance of APPLIANCES) {
          if (!appliances.find((a) => a.slug === appliance.slug)) {
            setAppliances(
              produce((draft) => {
                draft.push({ ...appliance, id: self.crypto.randomUUID() });
              })
            );
          }
        }
      }}
    >
      select all
    </button>
  );
};
