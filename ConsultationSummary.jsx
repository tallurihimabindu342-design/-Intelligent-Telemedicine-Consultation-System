import Sidebar from "../components/Sidebar";

function ConsultationSummary() {

  const summary =
    JSON.parse(
      localStorage.getItem(
        "consultationSummary"
      )
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
          padding: "30px",
        }}
      >
        <h1>
          Consultation Summary
        </h1>

        {!summary ? (

          <p>
            No consultation summary
            available.
          </p>

        ) : (

          <>
            <p>
              Doctor:
              {
                summary.doctor
              }
            </p>

            <p>
              Notes:
              {
                summary.notes
              }
            </p>

            <p>
              Duration:
              {
                summary.duration
              }
              sec
            </p>

            <p>
              Follow-Up:
              {
                summary.followUp
              }
            </p>
          </>

        )}
      </div>
    </div>
  );
}

export default ConsultationSummary;