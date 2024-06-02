import { Category } from "@/types/Category";
import { Appliance } from "@/types/Appliance";
import _ from "lodash";

export const CATEGORIES: {
  [key in Category]: { possibleRuntimeHours: number[] };
} = {
  F: {
    possibleRuntimeHours: [6, 7, 8],
  },
  A: {
    possibleRuntimeHours: [1, 2, 3, 4],
  },
  L: {
    // 1 to 24 hours of runtime possible for this category.
    possibleRuntimeHours: Array.from({ length: 21 }, (_, i) => i + 4),
  },
};

export const APPLIANCES: Appliance[] = [
  {
    name: "Fridge",
    slug: "fridge",
    power: 2000,
    category: "F",
  },
  {
    name: "Freezer",
    slug: "freezer",
    power: 2500,
    category: "F",
  },
  {
    name: "Washing Machine",
    slug: "washing-machine",
    power: 1500,
    category: "A",
  },
  {
    name: "Dishwasher",
    slug: "dishwasher",
    power: 2500,
    category: "A",
  },
  {
    name: "Induction Stove",
    slug: "induction-stove",
    power: 3000,
    category: "A",
  },
  {
    name: "TV",
    slug: "tv",
    power: 500,
    category: "L",
  },
  {
    name: "Small Light",
    slug: "small-light",
    power: 100,
    category: "L",
  },
  {
    name: "Big Light",
    slug: "big-light",
    power: 800,
    category: "L",
  },
];

export const MINIMAL_RUNTIME_BY_CATEGORY = _.mapValues(
  CATEGORIES,
  (category) => _.min(category.possibleRuntimeHours) ?? 0
);
