import { appliancesAtom, appliancesWithConsumptionAtom } from "@/atoms";
import { APPLIANCES } from "@/constants";
import { Appliance } from "@/types/Appliance";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

export function ApplianceSelector() {
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance>();
  const setAppliancesWithConsumption = useSetAtom(
    appliancesWithConsumptionAtom
  );
  const [appliances, setAppliances] = useAtom(appliancesAtom);
  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <Autocomplete
          size="small"
          options={APPLIANCES}
          onChange={(_, value) => {
            if (value) {
              setSelectedAppliance(value);
            }
          }}
          getOptionKey={(option) => option.slug}
          getOptionLabel={(option) =>
            `${option.name} (${option.category}) - ${option.power} W`
          }
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            if (selectedAppliance) {
              setAppliancesWithConsumption(null);
              setAppliances([
                ...appliances,
                {
                  id: self.crypto.randomUUID(),
                  ...selectedAppliance,
                },
              ]);
            }
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
