import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1c1c1c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ebe3d5",
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: "0.06em",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        M
      </div>
    ),
    size
  );
}
