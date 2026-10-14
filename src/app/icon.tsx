import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "8px",
          padding: "4px",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Open Book Base */}
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="#FDE68A" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="#FDE68A" />
          {/* Central Growth Sprout Accent */}
          <path d="M12 7v5" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M10 8.5c1-1 2-1 2-1s1 0 2 1" stroke="#F59E0B" strokeWidth="2.2" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
