import Sidebar from "../components/Sidebar";

function Notifications() {

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const notifications =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  const myNotifications =
    notifications.filter(
      (notification) =>
        notification.patientName ===
        patientName
    );
    const prescriptions =
  JSON.parse(
    localStorage.getItem(
      "prescriptions"
    )
  ) || [];

const myPrescriptions =
  prescriptions.filter(
    (prescription) =>
      prescription.patient ===
      patientName
  );
const refillAlerts =
  myPrescriptions.filter(
    (prescription) => {

      if (
        !prescription.duration
      )
        return false;

      const created =
        new Date(
          prescription.createdAt
        );

      const endDate =
        new Date(created);

      endDate.setDate(
        endDate.getDate() +
          Number(
            prescription.duration
          )
      );

      const daysRemaining =
        Math.ceil(
          (
            endDate -
            new Date()
          ) /
            (
              1000 *
              60 *
              60 *
              24
            )
        );

      return (
        daysRemaining <= 2 &&
        daysRemaining >= 0
      );

    }
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

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
     <div
  style={{
    marginBottom: "30px",
    textAlign: "center",
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
    🔔 Notifications
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Stay informed about appointments,
    prescriptions, consultations,
    reports and follow-up care.
  </p>

  <div
  style={{
    height: "1px",
    background:
      "rgba(255,255,255,0.08)",
    marginTop: "20px",
    width: "900px",
  }}
/>
</div>

        {
  myNotifications.length === 0 &&
  refillAlerts.length === 0 ? (

    <div
  style={{
    background:
      "linear-gradient(180deg,#0f172a,#111827)",
    borderRadius: "24px",
    padding: "40px",
    maxWidth: "900px",
    width: "100%",
    display: "flex",
flexDirection: "column",
justifyContent: "center",
alignItems: "center",
textAlign: "center",
minHeight: "140px",
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
    🔔 No Notifications
  </h2>

  <p
    style={{
      color: "#94a3b8",
    }}
  >
    You are all caught up.
  </p>
</div>

  ) : (

    <>

      {
        myNotifications.map(
          (
            notification,
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
width: "100%",
margin: "0 auto 18px auto",
  border:
    "1px solid rgba(255,255,255,0.05)",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.25)",
}}
            >
              <h3
  style={{
    marginTop: 0,
    color: "white",
  }}
>
                {
                  notification.type ===
                  "Appointment"

                    ? "📅 Appointment Update"

                  : notification.type ===
                    "Prescription"

                    ? "💊 New Prescription Issued"

                  : notification.type ===
                    "FollowUp"

                    ? "🔄 Follow-Up Consultation Due"

                  : notification.type ===
                    "Consultation"

                    ? "📋 Consultation Completed"

                  : notification.type ===
                    "Report"

                    ? "📄 Medical Report Reviewed"

                  : notification.type ===
                    "Refill"

                    ? "💊 Medication Refill Reminder"

                  : notification.type ===
                    "Risk"

                    ? "⚠️ Clinical Attention Required"

                  : notification.type ===
                    "ConcernResponse"

                    ? "💬 Doctor Responded"

                  : "🔔 Notification"
                }
              </h3>

              <p>
                {
                  notification.message
                }
              </p>

              <small
  style={{
    color: "#64748b",
  }}
>
  {notification.createdAt}
</small>

            </div>

          )
        )
      }

      {
        refillAlerts.map(
          (
            prescription,
            index
          ) => (

            <div
              key={
                "refill-" +
                index
              }
              style={{
  background:
    "rgba(245,158,11,0.08)",
  border:
    "1px solid rgba(245,158,11,0.2)",
  padding: "22px",
  marginBottom: "18px",
  borderRadius: "18px",
  maxWidth: "900px",
}}
            >

              <h3>
                💊 Medication Refill Reminder
              </h3>

              <p>
                Your medication course for{" "}
                <strong>
                  {
                    prescription.medicines
                  }
                </strong>{" "}
                is ending soon.
              </p>

              <p>
                Consider consulting your doctor for renewal.
              </p>

            </div>

          )
        )
      }

    </>

  )
}
      </div>
    </div>
  );
}

export default Notifications;