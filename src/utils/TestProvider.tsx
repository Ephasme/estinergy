/* eslint-disable @typescript-eslint/no-explicit-any */

import { Provider } from "jotai";
import React from "react";
import { HydrateAtoms } from "./HydrateAtoms";

export const TestProvider = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);
