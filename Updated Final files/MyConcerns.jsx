import Sidebar from "../components/Sidebar";

function MyConcerns() {

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const concerns =
    JSON.parse(
      localStorage.getItem(
        "patientConcerns"
      )
    ) || [];

  const myConcerns =
    concerns.filter(
      (concern) =>
        concern.patientName ===
        patientName
    );

  return (

    <div
      style={{
        display: "flex",
      }}
    >

      <Sidebar role="Patient" />

      <div
  style={{
    flex: 1,
    padding: "32px",
    background:
      "linear-gradient(135deg,#020617,#071938,#10214f)",
    minHeight: "100vh",
  }}
>

        <div
  style={{
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      color: "white",
      fontSize: "42px",
      fontWeight: "800",
      marginBottom: "10px",
    }}
  >
    📝 My Concerns
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Track all submitted health concerns and doctor responses.
  </p>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(2,1fr)",
    gap: "15px",
    maxWidth: "500px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "18px",
      color: "white",
      border:
        "1px solid rgba(255,255,255,0.05)",
    }}
  >
    📋 Total Concerns

    <h2>
      {myConcerns.length}
    </h2>
  </div>

  <div
    style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "18px",
      color: "white",
      border:
        "1px solid rgba(255,255,255,0.05)",
    }}
  >
    🔴 High Priority

    <h2>
      {
        myConcerns.filter(
          c =>
            c.severity === "High"
        ).length
      }
    </h2>
  </div>
</div>

        {
          myConcerns.length === 0 ? (

            <div
  style={{
    background: "#0f172a",
    padding: "30px",
    borderRadius: "20px",
    color: "#94a3b8",
    textAlign: "center",
  }}
>
  No concerns submitted yet.
</div>

          ) : (

            myConcerns.map(
              (
                concern,
                index
              ) => (

                <div
                  key={index}
                  style={{
  background:
    "linear-gradient(180deg,#0f172a,#111827)",
  borderRadius: "22px",
  padding: "25px",
  marginBottom: "20px",
  border:
    "1px solid rgba(255,255,255,0.05)",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.25)",
}}
                >

                  <p>
                    <span
  style={{
    color: "#60a5fa",
    fontWeight: "700",
  }}
>
  Type:
</span>
                    {" "}
                    {
                      concern.concernType
                    }
                  </p>

                  <p>
                    <span
  style={{
    color: "#60a5fa",
    fontWeight: "700",
  }}
>
  Type:
</span>
                    {" "}
                    {
                      concern.severity
                    }
                  </p>

                  <p>
                    <strong>
                      Concern:
                    </strong>
                    {" "}
                    {
                      concern.description
                    }
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>
                    {" "}
                    {
                      concern.status
                    }
                  </p>

                  {
                    concern.doctorResponse && (

                      <div
                        style={{
                          background:
                            "#eff6ff",
                          padding:
                            "12px",
                          borderRadius:
                            "8px",
                          marginTop:
                            "10px",
                        }}
                      >

                        <strong>
                          Doctor Response:
                        </strong>

                        <p>
                          {
                            concern.doctorResponse
                          }
                        </p>

                        <small>
                          {
                            concern.respondedAt
                          }
                        </small>

                      </div>

                    )
                  }

                </div>

              )
            )

          )
        }

      </div>

    </div>

  );
}

export default MyConcerns;