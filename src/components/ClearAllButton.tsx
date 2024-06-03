import { appliancesAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { X } from "lucide-react";

export const ClearAllButton = () => {
  const [appliances, setAppliances] = useAtom(appliancesAtom);

  return (
    <div className="flex items-center gap-1 text-sm">
      {appliances.length > 0 && (
        <button
          onClick={() => {
            setAppliances([]);
          }}
        >
          <X size={14} />
        </button>
      )}
      <span className="text-[#23DCCA]">{appliances.length}</span>
      selected
    </div>
  );
};
