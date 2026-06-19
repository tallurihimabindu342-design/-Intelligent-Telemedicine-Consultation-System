import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {

  const navigate = useNavigate();
const patients =
  JSON.parse(
    localStorage.getItem("patients")
  ) || [];

const approvedDoctors =
  JSON.parse(
    localStorage.getItem(
      "approvedDoctors"
    )
  ) || [];

const doctorRequests =
  JSON.parse(
    localStorage.getItem(
      "doctorRequests"
    )
  ) || [];

const appointments =
  JSON.parse(
    localStorage.getItem(
      "appointments"
    )
  ) || [];
  return (
  <div style={{ display: "flex" }}>

    <Sidebar role="Administrator" />

    <div
  style={{
    flex: 1,
    padding: "32px",
    background:
      "linear-gradient(135deg,#020617,#071938,#10214f)",
    minHeight: "100vh",
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
      marginBottom: "12px",
    }}
  >
    🛡️ Administrator Dashboard
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Monitor healthcare operations and manage platform activity.
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

      <ul>
  <li>
    Total Patients: {
      (
        JSON.parse(
          localStorage.getItem(
            "patients"
          )
        ) || []
      ).length
    }
  </li>

  <li>
  Total Approved Doctors: {
    (
      JSON.parse(
        localStorage.getItem(
          "approvedDoctors"
        )
      ) || []
    ).length
  }
</li>
  <li>
    Pending Doctor Requests: {
      (
        JSON.parse(
          localStorage.getItem(
            "doctorRequests"
          )
        ) || []
      ).filter(
        (request) =>
          request.status ===
          "Pending"
      ).length
    }
  </li>

  <li>
    Total Appointments: {
      (
        JSON.parse(
          localStorage.getItem(
            "appointments"
          )
        ) || []
      ).length
    }
  </li>

  <li>
    Confirmed Appointments: {
      (
        JSON.parse(
          localStorage.getItem(
            "appointments"
          )
        ) || []
      ).filter(
        (appointment) =>
          appointment.status ===
          "Confirmed"
      ).length
    }
  </li>

  <li>
    Cancelled Appointments: {
      (
        JSON.parse(
          localStorage.getItem(
            "appointments"
          )
        ) || []
      ).filter(
        (appointment) =>
          appointment.status ===
          "Cancelled"
      ).length
    }
  </li>
</ul>
      <br />

      <div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>

  <button
    onClick={() =>
      navigate("/doctor-requests")
    }
    style={{
      background:
        "linear-gradient(90deg,#2563eb,#1d4ed8)",
      border: "none",
      color: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      cursor: "pointer",
    }}
  >
    👨‍⚕ Doctor Requests
  </button>

  <button
    onClick={() =>
      navigate("/admin-doctors")
    }
    style={{
      background:
        "linear-gradient(90deg,#2563eb,#1d4ed8)",
      border: "none",
      color: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      cursor: "pointer",
    }}
  >
    👨‍⚕ Doctors
  </button>

  <button
    onClick={() =>
      navigate("/admin-patients")
    }
    style={{
      background:
        "linear-gradient(90deg,#2563eb,#1d4ed8)",
      border: "none",
      color: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      cursor: "pointer",
    }}
  >
    👥 Patients
  </button>

  <button
    onClick={() =>
      navigate("/admin-appointments")
    }
    style={{
      background:
        "linear-gradient(90deg,#2563eb,#1d4ed8)",
      border: "none",
      color: "white",
      padding: "12px 20px",
      borderRadius: "12px",
      cursor: "pointer",
    }}
  >
    📅 Appointments
  </button>

</div>

    </div>
    </div>
  );
}

export default AdminDashboard;