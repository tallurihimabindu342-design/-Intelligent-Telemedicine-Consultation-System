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
          padding: "30px",
          flex: 1,
        }}
      >
        <h1>
          Patient Reports
        </h1>

        {reports.length === 0 ? (

          <p>
            No reports uploaded.
          </p>

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