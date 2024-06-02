import { appliancesAtom } from "@/atoms";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useAtom } from "jotai";

export function SelectedAppliances() {
  const [appliances, setAppliances] = useAtom(appliancesAtom);
  return (
    <div>
      <div className="grid grid-cols-[1fr_0.3fr_20px]">
        <div>Name</div>
        <div>Power</div>
        <div></div>
        {appliances.map((appliance) => (
          <div className="contents" key={appliance.id}>
            <div>
              {appliance.name} ({appliance.category})
            </div>
            <div>{appliance.power} W</div>

            <div>
              <IconButton
                onClick={() => {
                  setAppliances(
                    appliances.filter((x) => x.id !== appliance.id)
                  );
                }}
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
