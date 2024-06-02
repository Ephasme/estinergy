import {
  appliancesWithConsumptionAtom,
  totalConsumptionAtom,
  totalConsumptionMinAtom,
} from "@/atoms";
import { TextField } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { z } from "zod";

const totalConsumptionSchema = z.coerce
  .number({ message: "Total consumption should be a valid number" })
  .positive({ message: "Total consumption should be a positive value" })
  .max(75, { message: "Total consumption should be less than 75 kWh" });

export function TotalConsumptionInput() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const setTotalConsumption = useSetAtom(totalConsumptionAtom);
  const setAppliancesWithConsumption = useSetAtom(
    appliancesWithConsumptionAtom
  );
  const totalConsumptionMin = useAtomValue(totalConsumptionMinAtom);

  useEffect(() => {
    if (!touched) {
      return;
    }
    setErrors([]);
    const maybeTotalConsumption = totalConsumptionSchema
      .min(totalConsumptionMin / 1000, {
        message: `Total consumption should be greater than ${
          totalConsumptionMin / 1000
        } kWh`,
      })
      .safeParse(inputValue);
    if (maybeTotalConsumption.success) {
      setAppliancesWithConsumption(null);
      setTotalConsumption(maybeTotalConsumption.data * 1000);
    } else {
      setTotalConsumption(null);
      const errors = maybeTotalConsumption.error.errors.map((x) => x.message);
      setErrors(errors);
    }
  }, [
    inputValue,
    setAppliancesWithConsumption,
    setTotalConsumption,
    totalConsumptionMin,
    touched,
  ]);

  return (
    <div>
      <TextField
        size="small"
        value={inputValue}
        type="number"
        placeholder="Total consumption..."
        onChange={(ev) => {
          setTouched(true);
          setInputValue(ev.target.value);
        }}
      />
      {errors.length > 0 && errors.map((error) => <div>{error}</div>)}
    </div>
  );
}
