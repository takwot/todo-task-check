import {
  cloneElement,
  type ComponentType,
  type FC,
  type ReactNode,
} from "react";

type ContextComposerProps = {
  contexts: ComponentType[];
  children?: ReactNode;
};

export const ContextComposer: FC<ContextComposerProps> = ({
  contexts,
  children,
}) => {
  return (
    <>
      {contexts.reduceRight(
        (child, Parent, index) =>
          cloneElement(<Parent key={index} />, {}, child),
        children
      )}
    </>
  );
};
