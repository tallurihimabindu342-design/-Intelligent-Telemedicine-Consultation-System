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
        padding: "30px",
        flex: 1,
      }}
    >

      <h1>
        Administrator Dashboard
      </h1>

      <h2>
        System Overview
      </h2>

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

      <button
        onClick={() =>
          navigate("/doctor-requests")
        }
        style={{
          padding: "12px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Doctor Registration Requests
        <br />
<br />

<button
  onClick={() =>
    navigate("/admin-doctors")
  }
>
  View Doctors
</button>

<button
  onClick={() =>
    navigate("/admin-patients")
  }
  style={{
    marginLeft: "10px",
  }}
>
  View Patients
</button>

<button
  onClick={() =>
    navigate("/admin-appointments")
  }
  style={{
    marginLeft: "10px",
  }}
>
  View Appointments
</button>
      </button>

    </div>
    </div>
  );
}

export default AdminDashboard;