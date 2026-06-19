
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DoctorDashboard() {

  const navigate = useNavigate();

  const doctorName =
    localStorage.getItem(
      "currentDoctor"
    );

  const doctorId =
    localStorage.getItem(
      "doctorId"
    );

  const appointments =
    JSON.parse(
      localStorage.getItem(
        "appointments"
      )
    ) || [];

  const consultationHistory =
    JSON.parse(
      localStorage.getItem(
        "consultationHistory"
      )
    ) || [];

  const prescriptions =
    JSON.parse(
      localStorage.getItem(
        "prescriptions"
      )
    ) || [];
const emergencyAlerts =
  JSON.parse(
    localStorage.getItem(
      "emergencyAlerts"
    )
  ) || [];
  const reviews =
  JSON.parse(
    localStorage.getItem(
      "doctorReviews"
    )
  ) || [];

const myReviews =
  reviews.filter(
    (review) =>
      review.doctorId ===
      doctorId
  );

const averageRating =

  myReviews.length === 0

    ? 0

    : (

        myReviews.reduce(
          (
            total,
            review
          ) =>
            total +
            review.rating,
          0
        ) /

        myReviews.length

      ).toFixed(1);

const emergencyCasesHandled =
  emergencyAlerts.filter(
    (alert) =>
      alert.status ===
      "Resolved"
  ).length;
  const myAppointments =
    appointments.filter(
      (appointment) =>
        appointment.doctorId ===
        doctorId
    );

  myAppointments.sort(
    (a, b) =>
      (b.urgencyScore || 0) -
      (a.urgencyScore || 0)
  );

  const myConsultations =
    consultationHistory.filter(
      (consultation) =>
        consultation.doctor ===
        doctorName
    );

  const myPrescriptions =
    prescriptions.filter(
      (prescription) =>
        prescription.doctor ===
        doctorName
    );

  const averageDuration =
    myConsultations.length === 0
      ? 0
      : Math.round(
          myConsultations.reduce(
            (
              total,
              consultation
            ) =>
              total +
              consultation.duration,
            0
          ) /
            myConsultations.length
        );

  const uniquePatients =
    new Set(
      myAppointments.map(
        (appointment) =>
          appointment.patientName
      )
    ).size;

  const updateStatus = (
    appointment,
    newStatus
  ) => {

    const allAppointments =
      JSON.parse(
        localStorage.getItem(
          "appointments"
        )
      ) || [];

    const updatedAppointments =
      allAppointments.map(
        (item) => {

          if (
  item.appointmentId ===
  appointment.appointmentId
) {

  if (
    newStatus ===
    "Cancelled"
  ) {

    localStorage.setItem(
      "cancelledAppointment",
      JSON.stringify(
        appointment
      )
    );

  }

  return {

    ...item,

    status:
      newStatus,

  };

}

          return item;
        }
      );

    localStorage.setItem(
      "appointments",
      JSON.stringify(
        updatedAppointments
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
        appointment.patientName,

      type:
        "Appointment",

      title:
        newStatus ===
        "Confirmed"
          ? "Appointment Confirmed"
          : "Appointment Cancelled",

      message:
        newStatus ===
        "Confirmed"

          ? `Your appointment with Dr. ${doctorName} has been confirmed for ${appointment.date} at ${appointment.time}.`

: `Your appointment with Dr. ${doctorName} has been cancelled. New slots are available for rescheduling.`,
      createdAt:
        new Date().toLocaleString(),

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
  👨‍⚕️ Welcome Dr. {doctorName}
</h1>

        <button
  onClick={() =>
    navigate("/doctor-availability")
  }
  style={{
    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    marginBottom: "20px",
  }}
>
  📅 Manage Availability
</button>

        <div
  style={{
    marginTop: "20px",
    marginBottom: "25px",
    padding: "25px",
    background:
      "linear-gradient(180deg,#0f172a,#111827)",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.35)",
    color: "white",
  }}
>

          <h2>
            Doctor Analytics
          </h2>

          <p>
            Total Appointments:
            {" "}
            {
              myAppointments.length
            }
          </p>

          <p>
            Completed Consultations:
            {" "}
            {
              myConsultations.length
            }
          </p>

          <p>
            Prescriptions Issued:
            {" "}
            {
              myPrescriptions.length
            }
          </p>

          <p>
            Patients Treated:
            {" "}
            {uniquePatients}
          </p>

          <p>
            Average Consultation
            Duration:
            {" "}
            {averageDuration}
            sec
          </p>

          <p>
            Confirmed
            Appointments:
            {" "}
            {
              myAppointments.filter(
                (
                  appointment
                ) =>
                  appointment.status ===
                  "Confirmed"
              ).length
            }
          </p>

          <p>
            Pending
            Appointments:
            {" "}
            {
              myAppointments.filter(
                (
                  appointment
                ) =>
                  appointment.status ===
                  "Pending"
              ).length
            }
          </p>

          <p>
            Cancelled
            Appointments:
            {" "}
            {
              myAppointments.filter(
                (
                  appointment
                ) =>
                  appointment.status ===
                  "Cancelled"
              ).length
            }
          </p>
<p>
  Average Rating:
  ⭐ {averageRating}
</p>

<p>
  Total Reviews:
  {myReviews.length}
</p>

<p>
  Emergency Cases Handled:
  {emergencyCasesHandled}
</p>
        </div>

<h2
  style={{
    color: "white",
    marginTop: "25px",
  }}
>
  🚨 Emergency Alerts
</h2>

{
  emergencyAlerts.filter(
    (alert) =>
      alert.status !==
      "Resolved"
  ).length === 0 ? (

    <p>
      No active emergencies.
    </p>

  ) : (

    emergencyAlerts
      .filter(
        (alert) =>
          alert.status !==
          "Resolved"
      )
      .map(
      (
        alert,
        index
      ) => (

        <div
          key={index}
          style={{
            background:
              "#fee2e2",
            border:
              "2px solid red",
            padding:
              "15px",
            borderRadius:
              "10px",
            marginBottom:
              "10px",
          }}
        >
          <h3>
            🚨 Emergency Alert
          </h3>

          <p>
            Patient:
            {" "}
            {alert.patientName}
          </p>

          <p>
            Reported:
            {" "}
            {alert.createdAt}
          </p>
          <button
  onClick={() => {

    const updatedAlerts =
      emergencyAlerts.map(
        (item, i) => {

          if (
            i === index
          ) {

            return {

              ...item,

              status:
                "Resolved",

            };

          }

          return item;

        }
      );

    localStorage.setItem(
      "emergencyAlerts",
      JSON.stringify(
        updatedAlerts
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
        alert.patientName,

      type:
        "Emergency",

      title:
        "Emergency Case Reviewed",

      message:
        "A healthcare professional has reviewed your emergency alert.",

      createdAt:
        new Date().toLocaleString(),

    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(
        notifications
      )
    );

    window.location.reload();

  }}
  style={{
    background:
      "#16a34a",
    color:
      "white",
    border:
      "none",
    padding:
      "8px 14px",
    borderRadius:
      "6px",
    cursor:
      "pointer",
    marginTop:
      "10px",
  }}
>
  Resolve Alert
</button>
        </div>

      )
    )

  )
}

<h2
  style={{
    color: "white",
    marginTop: "25px",
  }}
>
  📅 Appointment Requests
</h2>

        {
          myAppointments.length ===
          0 ? (

            <p>
              No appointments
              available.
            </p>

          ) : (

            myAppointments.map(
              (
                appointment,
                index
              ) => (

                <div
                  key={index}
                  style={{
                    border:
                      "1px solid gray",
                    padding:
                      "10px",
                    marginBottom:
                      "10px",
                  }}
                >

                  <p>
                    Appointment ID:
                    {" "}
                    {
                      appointment.appointmentId
                    }
                  </p>

                  <p>
                    Patient:
                    {" "}
                    {
                      appointment.patientName
                    }
                  </p>

                  <p>
                    Urgency:
                    {" "}
                    <span
                      style={{
                        color:
                          appointment.urgencyScore >=
                          70
                            ? "red"
                            : appointment.urgencyScore >=
                              40
                            ? "orange"
                            : "green",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        appointment.urgencyScore
                      }
                    </span>
                  </p>

                  <p>
                    Date:
                    {" "}
                    {
                      appointment.date
                    }
                  </p>

                  <p>
                    Time:
                    {" "}
                    {
                      appointment.time
                    }
                  </p>

                  <p>
                    Status:
                    {" "}
                    <span
                      style={{
                        color:
                          appointment.status ===
                          "Confirmed"
                            ? "green"
                            : appointment.status ===
                              "Cancelled"
                            ? "red"
                            : "orange",
                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        appointment.status
                      }
                    </span>
                  </p>

                  <p>
                    Booked At:
                    {" "}
                    {
                      appointment.bookedAt
                    }
                  </p>

                  {
                    appointment.status ===
                      "Confirmed" && (

                      <div
                        style={{
                          marginTop:
                            "10px",
                        }}
                      >

                        <button
                          onClick={() => {

                            localStorage.setItem(
                              "selectedAppointment",
                              appointment.appointmentId
                            );
localStorage.setItem(
  "selectedPatient",
  appointment.patientName
);
                            navigate(
                              "/prescription"
                            );

                          }}
                          style={{
                            background:
                              "#2563eb",
                            color:
                              "white",
                            border:
                              "none",
                            padding:
                              "8px 12px",
                            borderRadius:
                              "6px",
                            cursor:
                              "pointer",
                            marginRight:
                              "10px",
                          }}
                        >
                          Write Prescription
                        </button>
<button
  onClick={() =>
    navigate(
      "/referral"
    )
  }
  style={{
    marginLeft:
      "10px",
  }}
>
  Create Referral
</button>
                        <button
                          onClick={() => {

                            const statuses =
  JSON.parse(
    localStorage.getItem(
      "doctorStatuses"
    )
  ) || {};

statuses[
  localStorage.getItem(
    "doctorId"
  )
] =
  "In Consultation";

localStorage.setItem(
  "doctorStatuses",
  JSON.stringify(
    statuses
  )
);

                            navigate(
                              "/consultation-room"
                            );

                          }}
                        >
                          Start Consultation
                        </button>

                      </div>

                    )
                  }

                  {
                    appointment.status ===
                      "Pending" && (

                      <div
                        style={{
                          marginTop:
                            "10px",
                        }}
                      >

                        <button
                          onClick={() =>
                            updateStatus(
                              appointment,
                              "Confirmed"
                            )
                          }
                          style={{
                            marginRight:
                              "10px",
                          }}
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              appointment,
                              "Cancelled"
                            )
                          }
                        >
                          Cancel
                        </button>

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

export default DoctorDashboard;

