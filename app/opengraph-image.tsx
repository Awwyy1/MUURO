import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MUURO. Your Visual Capital.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          position: "relative",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontSize: 180,
            fontWeight: 600,
            color: "#ebe3d5",
            letterSpacing: "0.22em",
            paddingLeft: "0.22em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          MUURO
        </div>

        {/* Hairline */}
        <div
          style={{
            width: 56,
            height: 1,
            background: "rgba(168,160,154,0.28)",
            marginTop: 56,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: "#8a857c",
            letterSpacing: "0.42em",
            paddingLeft: "0.42em",
            textTransform: "uppercase",
            marginTop: 40,
            display: "flex",
          }}
        >
          Your Visual Capital
        </div>

        {/* Corner mark */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 64,
            fontSize: 16,
            fontWeight: 500,
            color: "rgba(168,160,154,0.6)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          muuro.co
        </div>
      </div>
    ),
    size
  );
}
