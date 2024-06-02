import { appliancesAtom, emailAtom, totalConsumptionAtom } from "@/atoms";
import { Button } from "@mui/material";
import { useAtomValue } from "jotai";

export function ComputeButton({ onCompute }: { onCompute: () => void }) {
  const totalConsumption = useAtomValue(totalConsumptionAtom);
  const appliances = useAtomValue(appliancesAtom);
  const email = useAtomValue(emailAtom);

  return (
    <div>
      <Button
        disabled={!email || appliances.length === 0 || !totalConsumption}
        onClick={() => {
          onCompute();
        }}
        variant="contained"
        fullWidth
      >
        Compute
      </Button>
    </div>
  );
}
