import React, { useMemo } from "react";
import { ContextComposer } from "../../shared/utils/react/ContextComposer";
import ReactQueryProvider from "./ReactQueryProvider";

type Props = {
  children?: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  const context = useMemo(() => {
    return [ReactQueryProvider];
  }, []);

  return <ContextComposer contexts={context}>{children}</ContextComposer>;
};
