import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kentucky Literacy Foundation, Inc.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0F2137",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              backgroundColor: "#D97706",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            KY
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", color: "#FDE68A", fontWeight: "600" }}>
              Kentucky Literacy Foundation, Inc.
            </span>
            <span style={{ fontSize: "18px", color: "#94A3B8" }}>
              KYLiteracySupport.org &bull; Nonprofit Educational Initiative
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            Building Stronger Readers. Creating More Opportunities.
          </div>
          <div style={{ fontSize: "24px", color: "#CBD5E1", lineHeight: 1.4 }}>
            Free literacy programs, tutoring, homework assistance, and educational resources for
            children and families across Kentucky.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            borderTop: "1px solid #1E3A5F",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span style={{ fontSize: "16px", color: "#FBBF24", fontWeight: "bold" }}>
            &bull; Literacy Programs
          </span>
          <span style={{ fontSize: "16px", color: "#FBBF24", fontWeight: "bold" }}>
            &bull; Tutoring &amp; Homework Assistance
          </span>
          <span style={{ fontSize: "16px", color: "#FBBF24", fontWeight: "bold" }}>
            &bull; Book Distribution
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
