import Sidebar from "../components/Sidebar";

function DoctorConcernCenter() {

  const concerns =
    JSON.parse(
      localStorage.getItem(
        "patientConcerns"
      )
    ) || [];

  const markReviewed = (
  index
) => {

  concerns[index].status =
    "Reviewed";

  concerns[index]
    .respondedAt =
    new Date()
      .toLocaleString();

  localStorage.setItem(
    "patientConcerns",
    JSON.stringify(
      concerns
    )
  );

  const notifications =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  notifications.push({

    patientName:
      concerns[index]
        .patientName,

    type:
      "ConcernResponse",

    title:
      "Doctor Response",

    message:
      "Your doctor has responded to a reported concern.",

    createdAt:
      new Date()
        .toLocaleString(),

  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(
      notifications
    )
  );

  window.location.reload();

};

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
  }}
>

      <div
  style={{
    marginBottom: "30px",
    width: "100%",
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
    💬 Patient Concerns
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Review patient concerns and provide medical guidance.
  </p>

  <div
    style={{
      height: "1px",
      background:
        "rgba(255,255,255,0.08)",
      marginTop: "20px",
      width: "100%",
    }}
  />
</div>

        {
          concerns.length === 0 ? (
<div
  style={{
    background:
      "linear-gradient(180deg,#0f172a,#111827)",
    borderRadius: "24px",
    padding: "40px",
    width: "96%",
margin: "0 auto",
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
    💬 No Concerns Reported
  </h2>

  <p
    style={{
      color: "#94a3b8",
    }}
  >
    No patient concerns have been submitted yet.
  </p>
</div>
          ) : (

            concerns.map(
              (
                concern,
                index
              ) => (

                <div
                  key={index}
                  style={{
  background:
    "linear-gradient(180deg,#0f172a,#111827)",
  border:
    "1px solid rgba(255,255,255,0.05)",
  borderRadius: "18px",
  padding: "24px",
  marginBottom: "20px",
  maxWidth: "100%",
  color: "white",
}}
                >

                  <p>
                    Patient:
                    {" "}
                    {
                      concern.patientName
                    }
                  </p>

                  <p>
                    Type:
                    {" "}
                    {
                      concern.concernType
                    }
                  </p>

                  <p>
  Severity:
  {" "}
  <span
    style={{
      color:
        concern.severity === "High"
          ? "red"
          : concern.severity === "Medium"
          ? "orange"
          : "green",
      fontWeight: "bold",
    }}
  >
    {concern.severity}
  </span>
</p>

                  <p>
                    {
                      concern.description
                    }
                  </p>

                  <p>
  Status:
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
          "10px",
        borderRadius:
          "8px",
        marginTop:
          "10px",
      }}
    >

      <strong>
        Previous Response:
      </strong>

      <p>
        {
          concern.doctorResponse
        }
      </p>

    </div>

  )
}
<textarea
  placeholder="Doctor Response"
  value={
    concern.doctorResponse || ""
  }
  onChange={(e) => {

    concerns[index]
      .doctorResponse =
      e.target.value;

    localStorage.setItem(
      "patientConcerns",
      JSON.stringify(
        concerns
      )
    );

  }}
  style={{
  width: "100%",
  height: "90px",
  marginTop: "10px",
  background: "#111827",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "12px",
}}
/>

<br />
<br />

<button
  onClick={() =>
    markReviewed(
      index
    )
  }
  style={{
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Send Response
</button>
                </div>

              )
            )

          )
        }

      </div>

    </div>

  );
}

export default DoctorConcernCenter;