import { appliancesAtom } from "@/atoms";
import { APPLIANCES } from "@/constants";
import { produce } from "immer";
import { useAtom } from "jotai";

export const SelectAllButton = () => {
  const [appliances, setAppliances] = useAtom(appliancesAtom);
  return (
    <button
      className="border border-white px-3 py-1 rounded-md text-xs"
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

        console.log("test");
      }}
    >
      select all
    </button>
  );
};
