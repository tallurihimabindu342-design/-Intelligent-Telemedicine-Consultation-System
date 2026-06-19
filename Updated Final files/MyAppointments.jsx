import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
function MyAppointments() {

  const patientName =
    localStorage.getItem("patientName");
const navigate =
  useNavigate();
  const appointments =
    JSON.parse(
      localStorage.getItem("appointments")
    ) || [];

  const myAppointments =
    appointments.filter(
      (appointment) =>
        appointment.patientName ===
        patientName
    );

  return (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#020617,#071938,#10214f)",
    }}
  >
    <Sidebar role="Patient" />

    <div
      style={{
        flex: 1,
        padding: "30px",
      }}
    >
      <div
  style={{
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      color: "white",
      fontSize: "42px",
      fontWeight: "800",
      marginBottom: "8px",
    }}
  >
    📅 My Appointments
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    View and manage your upcoming consultations.
  </p>
</div>

      {myAppointments.length === 0 ? (
        <p>
        <div
  style={{
    background: "#0f172a",
    padding: "25px",
    borderRadius: "20px",
    color: "#94a3b8",
    textAlign: "center",
  }}
>
  📅 No appointments found.
</div>

        </p>
      ) : (
        myAppointments.map(
          (appointment, index) => (
            <div
              key={index}
              style={{
  background: "#0f172a",

  borderRadius: "24px",

  padding: "25px",

  marginBottom: "20px",

  border:
    "1px solid rgba(255,255,255,0.05)",

  boxShadow:
    "0 10px 25px rgba(0,0,0,0.25)",

  color: "white",
}}
            >
<p style={{ marginBottom: "8px" }}>
  <strong>Appointment ID:</strong>{" "}
  <span style={{ color: "#60a5fa" }}>
    {appointment.appointmentId}
  </span>
</p>

<p style={{ marginBottom: "8px" }}>
  <strong>Doctor:</strong>{" "}
  {appointment.doctorName}
</p>

<p style={{ marginBottom: "8px" }}>
  <strong>Doctor ID:</strong>{" "}
  {appointment.doctorId}
</p>

<p style={{ marginBottom: "8px" }}>
  <strong>Specialization:</strong>{" "}
  <span style={{ color: "#22c55e" }}>
    {appointment.specialization}
  </span>
</p>

<p style={{ marginBottom: "8px" }}>
  <strong>📅 Date:</strong>{" "}
  {appointment.date}
</p>

<p style={{ marginBottom: "8px" }}>
  <strong>🕒 Time:</strong>{" "}
  {appointment.time}
</p>

  <div
  style={{
    marginTop: "12px",
    marginBottom: "12px",
  }}
>
  <span
    style={{
      padding: "8px 16px",

      borderRadius: "999px",

      background:
        appointment.status === "Confirmed"
          ? "rgba(34,197,94,0.15)"
          : appointment.status === "Cancelled"
          ? "rgba(239,68,68,0.15)"
          : "rgba(245,158,11,0.15)",

      color:
        appointment.status === "Confirmed"
          ? "#22c55e"
          : appointment.status === "Cancelled"
          ? "#ef4444"
          : "#f59e0b",

      fontWeight: "600",
    }}
  >
    {appointment.status === "Confirmed"
      ? "🟢 Confirmed"
      : appointment.status === "Cancelled"
      ? "🔴 Cancelled"
      : "🟡 Pending"}
  </span>
</div>
  <p>
  Booked At:
  {appointment.bookedAt}
</p>
<br />

{appointment.status === "Pending" && (
  <button
    onClick={() => {

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
              return {
                ...item,
                status:
                  "Cancelled",
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

      window.location.reload();
    }}

    style={{
      padding: "12px 20px",

      background:
        "linear-gradient(90deg,#ef4444,#dc2626)",

      color: "white",

      border: "none",

      borderRadius: "12px",

      cursor: "pointer",

      fontWeight: "600",
    }}
  >
    ❌ Cancel Appointment
  </button>
  
)}
{appointment.status === "Completed" && (

  <button
    onClick={() => {

      localStorage.setItem(
        "reviewDoctorId",
        appointment.doctorId
      );

      navigate(
        "/add-review"
      );

    }}
    style={{
      marginLeft: "10px",
    }}
  >
    Leave Review
  </button>

)}
{appointment.status ===
  "Cancelled" && (

  <button
    onClick={() =>
      navigate(
        "/reschedule"
      )
    }
    style={{
      marginLeft:
        "10px",
    }}
  >
    Reschedule
  </button>

)}
</div>
            
          )
        )
      )}
    </div>
    </div>
  );
}

export default MyAppointments;