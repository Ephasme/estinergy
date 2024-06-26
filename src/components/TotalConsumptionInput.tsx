import { totalConsumptionAtom, totalConsumptionMinAtom } from "@/store/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { z } from "zod";

const totalConsumptionSchema = z.coerce
  .number({ message: "Should be a valid number" })
  .positive({ message: "Should be a positive value" })
  .max(75, { message: "Should be less than 75 kWh" });

export function TotalConsumptionInput() {
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const setTotalConsumption = useSetAtom(totalConsumptionAtom);
  const totalConsumptionMin = useAtomValue(totalConsumptionMinAtom);
  const hasErrors = errors.length > 0;

  useEffect(() => {
    if (!touched) {
      return;
    }
    setErrors([]);
    const maybeTotalConsumption = totalConsumptionSchema
      .min(totalConsumptionMin / 1000, {
        message: `Should be at least ${Math.ceil(
          totalConsumptionMin / 1000
        )} kWh`,
      })
      .safeParse(inputValue);
    if (maybeTotalConsumption.success) {
      setTotalConsumption(maybeTotalConsumption.data * 1000);
    } else {
      setTotalConsumption(null);
      const errors = maybeTotalConsumption.error.errors.map((x) => x.message);
      setErrors(errors);
    }
  }, [inputValue, setTotalConsumption, totalConsumptionMin, touched]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          className="w-full bg-[#001846] px-4 py-3 outline-none text-sm rounded-lg placeholder-[#3D5B8C]"
          placeholder="00"
          value={inputValue}
          onChange={(ev) => {
            setTouched(true);
            setInputValue(ev.target.value);
          }}
        />
        <div className="text-sm absolute right-3 top-0 translate-y-1/2">
          kWh
        </div>
      </div>
      {hasErrors && (
        <div className="absolute -bottom-2 translate-y-[100%] bg-[#E93535] px-3 py-1 rounded-lg">
          {errors.map((message, idx) => (
            <div key={idx} className="text-white text-sm">
              {message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
