import { appliancesAtom } from "@/atoms";
import { APPLIANCES } from "@/constants";
import { produce } from "immer";
import { useAtom } from "jotai";
import { Minus, Plus, Trash2 } from "lucide-react";
import { AddCircle } from "@mui/icons-material";
import { useMemo } from "react";
import cn from "clsx";

export const ApplianceCard = ({ src, slug }: { src: string; slug: string }) => {
  const [appliances, setAppliances] = useAtom(appliancesAtom);

  const qty = useMemo(() => {
    return appliances.filter((appliance) => appliance.slug === slug).length;
  }, [appliances, slug]);

  const applianceClass = useMemo(() => {
    return APPLIANCES.find((appliance) => appliance.slug === slug);
  }, [slug]);

  if (!applianceClass) {
    throw new Error(`Appliance with slug ${slug} not found`);
  }

  const addAppliance = () => {
    setAppliances(
      produce((draft) => {
        draft.push({ ...applianceClass, id: self.crypto.randomUUID() });
      })
    );
  };

  const removeAppliance = () => {
    setAppliances(
      produce((draft) => {
        const index = draft.findIndex(
          (appliance) => appliance.slug === applianceClass.slug
        );
        draft.splice(index, 1);
      })
    );
  };

  return (
    <div
      className={cn(
        "p-5 rounded-2xl flex flex-col items-center justify-center gap-3 ",
        {
          "bg-[#0B3179]": qty === 0,
          "bg-[#23DCCA]": qty > 0,
        }
      )}
    >
      <img className="h-20 w-20" src={src} />
      <div
        className={cn("text-sm -mb-2", {
          "text-white": qty === 0,
          "text-black": qty > 0,
        })}
      >
        {applianceClass.name} ({applianceClass.category})
      </div>
      <div
        className={cn("text-xs", {
          "text-[#23DCCA]": qty === 0,
          "text-black": qty > 0,
        })}
      >
        {applianceClass.power / 1000} kWh
      </div>
      {qty === 0 && (
        <button
          className="flex items-center gap-1 mt-3 rounded-full text-sm border px-4 py-1 border-[#23DCCA]"
          onClick={addAppliance}
        >
          <span className="font-bold text-[#23DCCA]">Add</span>
          <AddCircle sx={{ fill: "#23DCCA", fontSize: 18 }} />
        </button>
      )}
      {qty > 0 && (
        <div className="mt-3 flex items-center gap-2 bg-white px-4 py-1 rounded-full">
          {qty === 1 && (
            <button>
              <Trash2 color="#FA4B60" size={16} onClick={removeAppliance} />
            </button>
          )}
          {qty > 1 && (
            <button>
              <Minus color="black" size={16} onClick={removeAppliance} />
            </button>
          )}
          <div className="text-sm text-black font-bold">{qty}</div>
          <button>
            <Plus color="black" size={16} onClick={addAppliance} />
          </button>
        </div>
      )}
    </div>
  );
};
