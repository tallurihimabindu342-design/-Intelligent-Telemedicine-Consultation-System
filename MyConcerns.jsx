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
          padding: "30px",
        }}
      >

        <h1>
          My Concerns
        </h1>

        {
          myConcerns.length === 0 ? (

            <p>
              No concerns submitted.
            </p>

          ) : (

            myConcerns.map(
              (
                concern,
                index
              ) => (

                <div
                  key={index}
                  style={{
                    border:
                      "1px solid #ddd",
                    padding:
                      "15px",
                    marginBottom:
                      "15px",
                    borderRadius:
                      "10px",
                  }}
                >

                  <p>
                    <strong>
                      Type:
                    </strong>
                    {" "}
                    {
                      concern.concernType
                    }
                  </p>

                  <p>
                    <strong>
                      Severity:
                    </strong>
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