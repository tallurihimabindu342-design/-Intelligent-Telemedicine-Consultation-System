import Sidebar from "../components/Sidebar";

function ConsultationHistory() {

  const consultations =
    JSON.parse(
      localStorage.getItem(
        "consultationHistory"
      )
    ) || [];

  return (
    <div
      style={{
        display: "flex",
        
      }}
    >
      <Sidebar role="Doctor" />

      <div
  style={{
    display: "flex",
flexDirection: "column",
alignItems: "center",
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
      marginBottom: "12px",
    }}
  >
    📋 Consultation History
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Review completed consultations and patient interactions.
  </p>

  <div
    style={{
      height: "1px",
      background:
        "rgba(255,255,255,0.08)",
      marginTop: "20px",
      maxWidth: "900px",
    }}
  />
</div>

        {consultations.length === 0 ? (

  <div
    style={{
      background:
        "linear-gradient(180deg,#0f172a,#111827)",
      borderRadius: "24px",
      padding: "40px",
      maxWidth: "900px",
      minHeight: "140px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      border:
        "1px solid rgba(255,255,255,0.05)",
    }}
  >
    <h2
      style={{
        color: "white",
        marginBottom: "12px",
      }}
    >
      📋 No Consultation Records
    </h2>

    <p
      style={{
        color: "#94a3b8",
      }}
    >
      No consultation history available yet.
    </p>
  </div>

) : 

  consultations.map(
          (
            consultation,
            index
          ) => (
            <div
              key={index}
              style={{
  background:
    "linear-gradient(180deg,#0f172a,#111827)",
  padding: "22px",
  marginBottom: "18px",
  borderRadius: "18px",
  maxWidth: "900px",
  border:
    "1px solid rgba(255,255,255,0.05)",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.25)",
  color: "white",
}}
            >
              <p>
                Doctor:
                {
                  consultation.doctor
                }
              </p>

              <p>
                Notes:
                {
                  consultation.notes
                }
              </p>

              <p>
                Duration:
                {
                  consultation.duration
                }
                sec
              </p>

              <p>
                Date:
                {
                  consultation.date
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ConsultationHistory;