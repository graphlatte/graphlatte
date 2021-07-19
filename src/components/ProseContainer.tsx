import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

export function ProseContainer({ children }: Props) {
  return (
    <div className="p-16 prose-sm prose sm:prose lg:prose-lg xl:prose-2xl">
      {children}
    </div>
  );
}
