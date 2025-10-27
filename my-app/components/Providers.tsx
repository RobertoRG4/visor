"use client";

import { store } from "@adea/visor-ui";
import { Provider } from "react-redux";

export default function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
