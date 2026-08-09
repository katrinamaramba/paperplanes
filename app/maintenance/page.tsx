export default function MaintenancePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        background: "#f7f3eb",
        color: "#3d352d",
      }}
    >
      <div style={{ maxWidth: "520px" }}>
        <div
          style={{
            fontSize: "56px",
            marginBottom: "24px",
          }}
        >
          ✈️
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "42px",
            marginBottom: "16px",
          }}
        >
          PaperPlanes is taking a little break.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-letter)",
            fontSize: "18px",
            lineHeight: 1.7,
            opacity: 0.75,
          }}
        >
          We&apos;re making a few changes behind the scenes.
          <br />
          We&apos;ll be back soon.
        </p>
      </div>
    </main>
  );
}