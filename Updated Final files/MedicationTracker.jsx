import Sidebar from "../components/Sidebar";

function MedicationTracker() {

  const patientName =
    localStorage.getItem(
      "patientName"
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
const medicationLogs =
  JSON.parse(
    localStorage.getItem(
      "medicationLogs"
    )
  ) || [];

const today =
  new Date()
    .toISOString()
    .split("T")[0];

    const markTaken = (
  medicine
) => {

  const logs =
    JSON.parse(
      localStorage.getItem(
        "medicationLogs"
      )
    ) || [];

  const alreadyTaken =
    logs.find(
      (log) =>
        log.patient ===
          patientName &&
        log.medicine ===
          medicine &&
        log.date ===
          today
    );

  if (alreadyTaken) {

    alert(
      "Already marked today."
    );

    return;
  }

  logs.push({

    patient:
      patientName,

    medicine,

    date:
      today,

    taken:
      true,

  });

  localStorage.setItem(
    "medicationLogs",
    JSON.stringify(logs)
  );

  window.location.reload();
};

const totalMedicines =
  myPrescriptions.length;

const takenToday =
  myPrescriptions.filter(
    (prescription) =>

      medicationLogs.find(
        (log) =>
          log.patient ===
            patientName &&
          log.medicine ===
            prescription.medicines &&
          log.date ===
            today
      )
  ).length;
const patientLogs =
  medicationLogs.filter(
    (log) =>
      log.patient ===
      patientName
  );

const missedDoses =

  totalMedicines *
  7 -

  patientLogs.length > 0

    ? (
        totalMedicines * 7
      ) -
      patientLogs.length

    : 0;

const streak =
  patientLogs.length;
const adherenceScore =

  totalMedicines === 0

    ? 0

    : Math.round(
        (
          takenToday /
          totalMedicines
        ) * 100
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
          Medication Tracker
        </h1>
<div
  style={{
    background:
      "#eff6ff",
    padding:
      "15px",
    borderRadius:
      "10px",
    marginBottom:
      "20px",
  }}
>
  <h3>
    Medication Adherence
  </h3>

  <h2>
    {adherenceScore}%
  </h2>
  <p>
  🔥 Current Streak:
  {" "}
  {streak}
</p>

<p>
  ❌ Missed Doses:
  {" "}
  {missedDoses < 0
    ? 0
    : missedDoses}
</p>
</div>
        {myPrescriptions.length === 0 ? (

          <p>
            No active medications.
          </p>

        ) : (

          myPrescriptions.map(
            (
              prescription,
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
                <h3>
                  {
                    prescription.medicines
                  }
                </h3>

                <p>
                  Doctor:
                  {" "}
                  {
                    prescription.doctor
                  }
                </p>

                <p>
                  Time:
                  {" "}
                  {
                    prescription.medicationTime
                  }
                </p>

                <p>
                  Duration:
                  {" "}
                  {
                    prescription.duration
                  }
                  {" "}
                  Days
                </p>
                {
  medicationLogs.find(
    (log) =>
      log.patient ===
        patientName &&
      log.medicine ===
        prescription.medicines &&
      log.date ===
        today
  ) ? (

    <p
      style={{
        color: "green",
        fontWeight: "bold",
      }}
    >
      🟢 Taken Today
    </p>

  ) : (

    <p
      style={{
        color: "red",
        fontWeight: "bold",
      }}
    >
      🔴 Pending
    </p>

  )
}
<button
  onClick={() =>
    markTaken(
      prescription.medicines
    )
  }
  style={{
    background:
      "#16a34a",
    color: "white",
    border: "none",
    padding:
      "8px 12px",
    borderRadius:
      "6px",
    cursor:
      "pointer",
  }}
>
  ✓ Mark Taken
</button>
              </div>

            )
          )

        )}
      </div>
    </div>
  );
}

export default MedicationTracker;