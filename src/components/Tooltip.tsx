import Tippy from "@tippyjs/react";
import { CSSProperties, PropsWithChildren } from "react";
import "tippy.js/dist/tippy.css";

type Props = PropsWithChildren<{
  content: string;
  style?: CSSProperties;
  placement?: "top" | "bottom" | "left" | "right";
}>;

export function Tooltip(props: Props) {
  const { style = {}, content, placement = "top", children, ...rest } = props;

  return (
    <Tippy
      placement={placement}
      touch={false}
      arrow={true}
      hideOnClick={false}
      content={
        <span className="text-sm font-medium" style={{ ...style }}>
          {content}
        </span>
      }
      {...rest}
    >
      <span>{children}</span>
    </Tippy>
  );
}
