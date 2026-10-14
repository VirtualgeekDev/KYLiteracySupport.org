import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1B365D 0%, #0F2137 100%)",
          borderRadius: "36px",
          padding: "24px",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Open Book Base */}
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="#FDE68A" strokeWidth="2.2" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="#FDE68A" strokeWidth="2.2" />
          {/* Central Growth Sprout Accent */}
          <path d="M12 7v5" stroke="#F59E0B" strokeWidth="2.4" />
          <path d="M10 8.5c1-1 2-1 2-1s1 0 2 1" stroke="#F59E0B" strokeWidth="2.2" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
