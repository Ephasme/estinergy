/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { APPLIANCES } from "@/constants";
import { useCompute } from "@/hooks/useCompute";
import { appliancesAtom, totalConsumptionAtom } from "@/store/atoms";
import { TestProvider } from "@/utils/TestProvider";
import { renderHook } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

test("compute should fail when no appliances are set", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <TestProvider
        initialValues={[
          [totalConsumptionAtom, 20],
          [appliancesAtom, []],
        ]}
      >
        {children}
      </TestProvider>
    );
  };

  const {
    result: { current: compute },
  } = renderHook(() => useCompute(), {
    wrapper,
  });

  expect(() => compute()).toThrowError("No appliances are set");
});

test("compute should fail when no totalConsumptionAtom is set", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <TestProvider
        initialValues={[[appliancesAtom, [{ id: "1", ...APPLIANCES[0] }]]]}
      >
        {children}
      </TestProvider>
    );
  };

  const {
    result: { current: compute },
  } = renderHook(() => useCompute(), {
    wrapper,
  });

  expect(() => compute()).toThrowError("Total consumption is not set");
});

test("compute should fail when totalConsumptionAtom is too low", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <TestProvider
        initialValues={[
          [totalConsumptionAtom, 20],
          [appliancesAtom, [{ id: "1", ...APPLIANCES[0] }]],
        ]}
      >
        {children}
      </TestProvider>
    );
  };

  const {
    result: { current: compute },
  } = renderHook(() => useCompute(), {
    wrapper,
  });

  expect(() => compute()).toThrowError("Total consumption is too low");
});

test("compute should find the optimal solution", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <TestProvider
        initialValues={[
          [totalConsumptionAtom, 20000],
          [
            appliancesAtom,
            [
              { id: "1", ...APPLIANCES[0] }, // Fridge (F)
              { id: "2", ...APPLIANCES[1] }, // Freezer (F)
              { id: "3", ...APPLIANCES[2] }, // Washing machine (A)
              { id: "4", ...APPLIANCES[3] }, // Dishwasher (A)
              { id: "5", ...APPLIANCES[4] }, // Induction Stove (A)
              { id: "6", ...APPLIANCES[5] }, // TV (L)
              { id: "7", ...APPLIANCES[6] }, // Small Light (L)
              { id: "8", ...APPLIANCES[7] }, // Big Light (L)
            ],
          ],
        ]}
      >
        {children}
      </TestProvider>
    );
  };

  const {
    result: { current: compute },
  } = renderHook(() => useCompute(), {
    wrapper,
  });

  const results = compute();

  expect(results["1"].consumption).toBeCloseTo(7000);
  expect(results["2"].consumption).toBeCloseTo(8750);
  expect(results["3"].consumption).toBeCloseTo(500);
  expect(results["4"].consumption).toBeCloseTo(833.33);
  expect(results["5"].consumption).toBeCloseTo(1000);
  expect(results["6"].consumption).toBeCloseTo(666.67);
  expect(results["7"].consumption).toBeCloseTo(133.33);
  expect(results["8"].consumption).toBeCloseTo(1066.67);
});
