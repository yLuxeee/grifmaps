export default function SchedulePage() {
  return (
    <main
      style={{
        background: "#d9d9d9",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          textTransform: "uppercase"
        }}
      >
        Schedule
      </h1>

      <div style={{ marginTop: "30px" }}>
        <h2>Major III</h2>

        <div
          style={{
            background: "#ececec",
            padding: "20px",
            marginTop: "20px",
            border: "1px solid #ccc"
          }}
        >
          <p>Fri, May 1 - 3:00 PM</p>

          <h3>
            Operation: Doomsday VS Cloud9 Ascension
          </h3>
        </div>

        <div
          style={{
            background: "#ececec",
            padding: "20px",
            marginTop: "20px",
            border: "1px solid #ccc"
          }}
        >
          <p>Fri, May 1 - 4:30 PM</p>

          <h3>
            Junkyard Dogs VS The Black List
          </h3>
        </div>
      </div>
    </main>
  );
}