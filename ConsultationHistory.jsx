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
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>
          Consultation History
        </h1>

        {consultations.map(
          (
            consultation,
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