import React from "react";

function Admin({ setPage }) {
  const doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const patients = JSON.parse(localStorage.getItem("patients")) || [];
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard - System Management</h1>
      <p style={{ color: "#64748b" }}>Total Users: {doctors.length + patients.length}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "30px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "20px" }}>
          <h3>Registered Doctors ({doctors.length})</h3>
          <ul>{doctors.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>

        <div style={{ background: "white", padding: "25px", borderRadius: "20px" }}>
          <h3>Registered Patients ({patients.length})</h3>
          <ul>{patients.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      </div>

      <div style={{ marginTop: "30px", background: "white", padding: "25px", borderRadius: "20px" }}>
        <h3>All Appointments ({appointments.length})</h3>
        {appointments.map((app, i) => (
          <div key={i} style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
            {app.patientName} with {app.doctorName} on {app.date}
          </div>
        ))}
      </div>

      <button onClick={() => setPage("dashboard")} style={{ marginTop: "30px", padding: "14px 28px" }}>
        Back to My Dashboard
      </button>
    </div>
  );
}

export default Admin;