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
          padding: "30px",
        }}
      >
        <p
  style={{
    color: "#64748b",
    marginBottom: "25px",
  }}
>
  Stay informed about appointments,
  prescriptions, consultations,
  reports and follow-up care.
</p>
        <h1>
          Notifications
        </h1>

        {
  myNotifications.length === 0 &&
  refillAlerts.length === 0 ? (

    <p>
      No notifications.
    </p>

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
                border:
                  "1px solid #e5e7eb",
                background:
                  "#ffffff",
                padding:
                  "18px",
                marginBottom:
                  "15px",
                borderRadius:
                  "12px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
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

              <small>
                {
                  notification.createdAt
                }
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
                border:
                  "1px solid #e5e7eb",
                background:
                  "#fff7ed",
                padding:
                  "18px",
                marginBottom:
                  "15px",
                borderRadius:
                  "12px",
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