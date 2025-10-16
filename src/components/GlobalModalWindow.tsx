import type { CSSProperties } from "react";

interface Props {
  children: React.ReactNode;
  parentBgColor?: string;
  parentBgBackdropFiler?: string;
}

function GlobalModalWindow({
  children,
  parentBgBackdropFiler = "blur(.3rem)",
  parentBgColor = "rgba(0, 0, 0, 0.6)",
}: Props) {
  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "0",
    left: "0",
    backgroundColor: parentBgColor,
    // zIndex: "999999",
    width: "100%",
    height: "100vh",
    backdropFilter: parentBgBackdropFiler,
  };

  return <div style={style}>{children}</div>;
}

export default GlobalModalWindow;
