import Sidebar from "../components/Sidebar";

function PatientReports() {

  const reports =
    JSON.parse(
      localStorage.getItem(
        "medicalReports"
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
    flex: 1,
    padding: "32px",
    background:
      "linear-gradient(135deg,#020617,#071938,#10214f)",
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    📄 Patient Reports
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Review uploaded reports and patient medical records.
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
        {reports.length === 0 ? (

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
    📄 No Reports Available
  </h2>

  <p
    style={{
      color: "#94a3b8",
    }}
  >
    No patient reports have been uploaded yet.
  </p>
</div>

        ) : (

          reports.map(
            (
              report,
              index
            ) => (

              <div
                key={index}
                style={{
                  border:
                    "1px solid #ccc",
                  padding:
                    "15px",
                  marginBottom:
                    "15px",
                  borderRadius:
                    "10px",
                }}
              >
                <p>
                  Patient:
                  {
                    report.patientName
                  }
                </p>

                <p>
                  Report:
                  {
                    report.reportName
                  }
                </p>

                <p>
                  Uploaded:
                  {
                    report.uploadedAt
                  }
                </p>

              </div>

            )
          )

        )}
      </div>
    </div>
  );
}

export default PatientReports;