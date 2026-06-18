import Sidebar from "../components/Sidebar";

function PatientHistory() {

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const appointments =
    JSON.parse(
      localStorage.getItem(
        "appointments"
      )
    ) || [];

  const reports =
    JSON.parse(
      localStorage.getItem(
        "medicalReports"
      )
    ) || [];

    const consultations =
  JSON.parse(
    localStorage.getItem(
      "consultationHistory"
    )
  ) || [];

  const myAppointments =
    appointments.filter(
      (appointment) =>
        appointment.patientName ===
        patientName
    );

  const myReports =
    reports.filter(
      (report) =>
        report.patientName ===
        patientName
    );
const myConsultations =
  consultations.filter(
    (consultation) =>
      consultation.patient ===
      patientName
  );
  const prescriptions =
  JSON.parse(
    localStorage.getItem(
      "prescriptions"
    )
  ) || [];

const referrals =
  JSON.parse(
    localStorage.getItem(
      "referrals"
    )
  ) || [];

const vitals =
  JSON.parse(
    localStorage.getItem(
      "healthVitals"
    )
  ) || [];

const myPrescriptions =
  prescriptions.filter(
    (prescription) =>
      prescription.patient ===
      patientName
  );

const myReferrals =
  referrals.filter(
    (referral) =>
      referral.patientName ===
      patientName
  );

const myVitals =
  vitals.filter(
    (vital) =>
      vital.patientName ===
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
          Health History
        </h1>

        <h2>
          Appointments
        </h2>

        {
          myAppointments.map(
            (
              appointment,
              index
            ) => (
              <div
                key={index}
                style={{
                  border:
                    "1px solid #ccc",
                  padding:
                    "10px",
                  marginBottom:
                    "10px",
                }}
              >
                <p>
                  Doctor:
                  {
                    appointment.doctorName
                  }
                </p>

                <p>
                  Date:
                  {
                    appointment.date
                  }
                </p>

                <p>
                  Status:
                  {
                    appointment.status
                  }
                </p>
              </div>
            )
          )
        }

        <h2>
          Reports
        </h2>

        {
          myReports.map(
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
                    "10px",
                  marginBottom:
                    "10px",
                }}
              >
                <p>
                  {
                    report.reportName
                  }
                </p>

                <p>
                  {
                    report.uploadedAt
                  }
                </p>
              </div>
            )
          )
        }
        <h2>
  Consultation Timeline
</h2>

{
  myConsultations.length === 0 ? (

    <p>
      No consultations found.
    </p>

  ) : (

    myConsultations.map(
      (
        consultation,
        index
      ) => (

        <div
          key={index}
          style={{
            border:
              "2px solid #2563eb",
            padding:
              "15px",
            marginBottom:
              "15px",
            borderRadius:
              "10px",
          }}
        >

          <p>
            Date:
            {" "}
            {consultation.date}
          </p>

          <p>
            Doctor:
            {" "}
            {consultation.doctor}
          </p>

          <p>
            Duration:
            {" "}
            {consultation.duration}
            {" "}
            sec
          </p>

          <p>
            Notes:
            {" "}
            {consultation.notes}
          </p>

        </div>

      )
    )

  )
}

<h2>
  Prescription History
</h2>

{
  myPrescriptions.length === 0 ? (

    <p>
      No prescriptions found.
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
              "1px solid #16a34a",
            padding:
              "15px",
            marginBottom:
              "15px",
            borderRadius:
              "10px",
          }}
        >

          <p>
            Doctor:
            {" "}
            {
              prescription.doctor
            }
          </p>

          <p>
            Medicines:
            {" "}
            {
              prescription.medicines
            }
          </p>

          <p>
            Follow Up:
            {" "}
            {
              prescription.followUp
            }
          </p>

          <p>
            Created:
            {" "}
            {
              prescription.createdAt
            }
          </p>

        </div>

      )
    )

  )
}

<h2>
  Referral History
</h2>

{
  myReferrals.length === 0 ? (

    <p>
      No referrals found.
    </p>

  ) : (

    myReferrals.map(
      (
        referral,
        index
      ) => (

        <div
          key={index}
          style={{
            border:
              "1px solid #9333ea",
            padding:
              "15px",
            marginBottom:
              "15px",
            borderRadius:
              "10px",
          }}
        >

          <p>
            Specialist:
            {" "}
            {
              referral.specialist
            }
          </p>

          <p>
            Reason:
            {" "}
            {
              referral.reason
            }
          </p>

          <p>
            Date:
            {" "}
            {
              referral.createdAt
            }
          </p>

        </div>

      )
    )

  )
}

<h2>
  Vitals History
</h2>

{
  myVitals.length === 0 ? (

    <p>
      No vitals recorded.
    </p>

  ) : (

    myVitals.map(
      (
        vital,
        index
      ) => (

        <div
          key={index}
          style={{
            border:
              "1px solid #2563eb",
            padding:
              "15px",
            marginBottom:
              "15px",
            borderRadius:
              "10px",
          }}
        >

          <p>
            BP:
            {" "}
            {vital.bp}
          </p>

          <p>
            Pulse:
            {" "}
            {vital.pulse}
          </p>

          <p>
            SpO2:
            {" "}
            {vital.spo2}
          </p>

          <p>
            Temperature:
            {" "}
            {
              vital.temperature
            }
          </p>

          <p>
            Sugar:
            {" "}
            {vital.sugar}
          </p>

          <p>
            Weight:
            {" "}
            {vital.weight}
          </p>

          <p>
            Recorded:
            {" "}
            {
              vital.recordedAt
            }
          </p>

        </div>

      )
    )

  )
}

      </div>
    </div>
  );
}


export default PatientHistory;