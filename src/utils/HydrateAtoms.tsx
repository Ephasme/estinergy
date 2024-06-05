/* eslint-disable @typescript-eslint/no-explicit-any */

import { useHydrateAtoms } from "jotai/utils";
import React from "react";

export const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};
