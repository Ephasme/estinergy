import { compute } from "@/lib/compute";
import { ApplianceWithId } from "@/types/Appliance";
import { expect, test } from "vitest";

test("compute should fail when no total consumption is set", () => {
  // Arrange
  const totalConsumption = null;
  const appliances: ApplianceWithId[] = [
    {
      category: "A",
      id: "1",
      name: "Appliance 1",
      power: 100,
      slug: "appliance-1",
    },
  ];

  // Act
  expect(() =>
    compute({
      totalConsumption,
      appliances,
      nbOfAppliancesByCategory: {
        A: 1,
        F: 0,
        L: 0,
      },
    })()
  ).toThrowError();
});

test("compute should fail when no appliances are set", () => {
  // Arrange
  const totalConsumption = 34;
  const appliances: ApplianceWithId[] = [];

  // Act
  expect(() =>
    compute({
      totalConsumption,
      appliances,
      nbOfAppliancesByCategory: {
        A: 0,
        F: 0,
        L: 0,
      },
    })()
  ).toThrowError();
});

test("compute should fail if total consumption is too low", () => {
  // Arrange
  const totalConsumption = 9999;
  const appliances: ApplianceWithId[] = [
    {
      category: "A", // Min runtime: 1h => min consumption: 10000
      id: "1",
      name: "Appliance 1",
      power: 10000,
      slug: "appliance-1",
    },
  ];

  // Act
  expect(() =>
    compute({
      totalConsumption,
      appliances,
      nbOfAppliancesByCategory: {
        A: 1,
        F: 0,
        L: 0,
      },
    })()
  ).toThrowError();
});

test("compute should find the optimal solution", () => {
  // Arrange
  const totalConsumption = 45000;
  const appliances: ApplianceWithId[] = [
    {
      category: "F",
      id: "1",
      name: "Fridge",
      power: 2000,
      slug: "fridge",
    },
    {
      category: "A",
      id: "2",
      name: "Induction Stove",
      power: 3000,
      slug: "induction-stove",
    },
    {
      category: "A",
      id: "3",
      name: "Washing Machine",
      power: 1500,
      slug: "washing-machine",
    },
    {
      category: "L",
      id: "4",
      name: "TV",
      power: 500,
      slug: "tv",
    },
  ];
  const results = compute({
    totalConsumption,
    appliances,
    nbOfAppliancesByCategory: {
      A: 2,
      F: 1,
      L: 1,
    },
  })();

  expect(results[1].runtimeHours).toBe(8);
  expect(results[2].runtimeHours).toBe(2);
  expect(results[3].runtimeHours).toBe(2);
  expect(results[4].runtimeHours).toBe(24);

  expect(results[1].consumption).toBe(16000);
  expect(results[2].consumption).toBe(6000);
  expect(results[3].consumption).toBe(3000);
  expect(results[4].consumption).toBe(12000);
});
