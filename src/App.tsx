import fridgeSrc from "@/assets/fridge.png";
import freezerSrc from "@/assets/freezer.png";
import { Logo } from "@/components/Logo";
import { ApplianceCard } from "./components/ApplianceCard";

function App() {
  return (
    <div className="h-screen w-screen grid grid-rows-[60px_1fr] bg-[#002160]">
      <div className="h-full flex items-center bg-[#0A2C6F] border-b border-[#3D5B8C]">
        <div className="ml-12 mr-10">
          <Logo />
        </div>
        <div className="flex gap-10">
          <div className="text-sm">accueil</div>
          <div className="text-sm">nos cas d'usage</div>
          <div className="text-sm">blog</div>
          <div className="text-sm">à propos</div>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_2fr]">
        <div className="p-12">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm mb-3">
                Your email address<span className="text-[#E93535]">*</span>
              </div>
              <input
                className="w-full bg-[#001846] px-4 py-3 outline-none text-sm rounded-lg placeholder-[#3D5B8C]"
                placeholder="loup.peluso@gmail.com"
              />
            </div>
            <div>
              <div className="text-sm mb-3">
                Your total consumption<span className="text-[#E93535]">*</span>
              </div>
              <div className="relative">
                <input
                  className="w-full bg-[#001846] px-4 py-3 outline-none text-sm rounded-lg placeholder-[#3D5B8C]"
                  placeholder="00"
                />
                <div className="text-sm absolute right-3 top-0 translate-y-1/2">
                  kWh
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-[1fr_auto_80px] gap-4 items-baseline mt-10 mb-7">
            <div className="text-2xl">Select your appliances</div>
            <div className="text-sm">
              <span className="text-[#23DCCA]">x1</span> selected
            </div>
            <button className="border border-white px-3 py-1 rounded-md text-xs">
              select all
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <ApplianceCard slug="fridge" src={fridgeSrc} />
            <ApplianceCard slug="freezer" src={freezerSrc} />
          </div>
        </div>
        <div className="p-12">right</div>
      </div>
    </div>
  );
}

export default App;
