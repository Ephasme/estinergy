import bigLightSrc from "@/assets/bigLight.png";
import dishwasherSrc from "@/assets/dishwasher.png";
import freezerSrc from "@/assets/freezer.png";
import fridgeSrc from "@/assets/fridge.png";
import inductionStoveSrc from "@/assets/inductionStove.png";
import smallLightSrc from "@/assets/smallLight.png";
import tvSrc from "@/assets/tv.png";
import washingMachineSrc from "@/assets/washingMachine.png";
import { ApplianceCard } from "@/components/ApplianceCard";
import { ClearAllButton } from "@/components/ClearAllButton";
import { ComputeButton } from "@/components/ComputeButton";
import { EmailInput } from "@/components/EmailInput";
import { Logo } from "@/components/Logo";
import { ResultPanel } from "@/components/ResultPanel";
import { SelectAllButton } from "@/components/SelectAllButton";
import { TotalConsumptionInput } from "@/components/TotalConsumptionInput";
import { resetEffect } from "@/store/atoms";
import { useAtom } from "jotai";

function App() {
  useAtom(resetEffect);

  return (
    <div className="h-screen w-screen grid grid-rows-[60px_auto] bg-[#002160]">
      <div className="h-full flex items-center bg-[#0A2C6F] border-b border-[#3D5B8C]">
        <div className="ml-12 mr-10">
          <Logo />
        </div>
        <div className="flex gap-10">
          <div className="text-sm">home</div>
          <div className="text-sm">our study cases</div>
          <div className="text-sm">blog</div>
          <div className="text-sm">about</div>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_2fr] overflow-auto">
        <div className="p-12 pb-0">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm mb-3">
                Your email address<span className="text-[#E93535]">*</span>
              </div>
              <EmailInput />
            </div>
            <div>
              <div className="text-sm mb-3">
                Your total consumption<span className="text-[#E93535]">*</span>
              </div>
              <TotalConsumptionInput />
            </div>
          </div>
          <div className="w-full grid grid-cols-[1fr_auto_70px_auto] gap-4 items-baseline mt-10 mb-7">
            <div className="text-2xl">Select your appliances</div>
            <ClearAllButton />
            <SelectAllButton />
            <ComputeButton />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <ApplianceCard slug="fridge" src={fridgeSrc} />
            <ApplianceCard slug="freezer" src={freezerSrc} />
            <ApplianceCard slug="washing-machine" src={washingMachineSrc} />
            <ApplianceCard slug="dishwasher" src={dishwasherSrc} />
            <ApplianceCard slug="induction-stove" src={inductionStoveSrc} />
            <ApplianceCard slug="tv" src={tvSrc} />
            <ApplianceCard slug="small-light" src={smallLightSrc} />
            <ApplianceCard slug="big-light" src={bigLightSrc} />
          </div>
        </div>
        <ResultPanel />
      </div>
    </div>
  );
}

export default App;
