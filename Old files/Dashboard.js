import { useState, useEffect } from "react";

function Dashboard({ setPage }) {
  const role = localStorage.getItem("role");
  const patientName = localStorage.getItem("patientName") || "User";
  const doctorName = localStorage.getItem("currentDoctor") || "Doctor";
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const patientRisk = localStorage.getItem("patientRisk") || "Low Risk";

  const [emergencyQueue] = useState([]);

  return (
    <div style={{ width: "100%", fontFamily: "Arial" }}>

      {/* ==================== DOCTOR DASHBOARD ==================== */}
      {role === "Doctor" && (
        <>
          <h1 style={{ color: "#0f172a", marginBottom: "10px" }}>Welcome Dr. {doctorName}</h1>
          <p style={{ color: "#64748b", marginBottom: "30px" }}>AI-Powered Telemedicine</p>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "40px" }}>
            <div style={{ background: "white", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ color: "#64748b" }}>Today's Appointments</p>
              <h2>{appointments.length}</h2>
            </div>
            <div style={{ background: "white", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ color: "#64748b" }}>Emergency Cases</p>
              <h2 style={{ color: "#dc2626" }}>{emergencyQueue.length}</h2>
            </div>
            <div style={{ background: "white", padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ color: "#64748b" }}>AI Reports</p>
              <h2>8</h2>
            </div>
          </div>

          {/* Today's Appointments */}
          <div style={{ background: "white", padding: "25px", borderRadius: "20px", marginBottom: "30px" }}>
            <h3>📅 Today's Appointments</h3>
            {appointments.length === 0 ? (
              <p>No appointments today.</p>
            ) : (
              appointments.map((app, i) => (
                <div key={i} style={{ padding: "15px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <strong>{app.patientName}</strong><br />
                    {app.time} • {app.date}
                  </div>
                  <button onClick={() => setPage("consultation")} style={{ padding: "8px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px" }}>
                    Join Consultation
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ==================== PATIENT DASHBOARD ==================== */}
      {role === "Patient" && (
        <>
          <div style={{
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "white",
            padding: "35px",
            borderRadius: "20px",
            marginBottom: "40px"
          }}>
            <h2>Welcome back, {patientName} 👋</h2>
            <p style={{ fontSize: "18px", marginTop: "10px" }}>
              Your health is our priority
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            <div onClick={() => setPage("appointment")} style={cardStyle}>
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>📅</div>
              <h3>Book Appointment</h3>
              <p>Find available doctors</p>
            </div>

            <div onClick={() => setPage("preconsultation")} style={cardStyle}>
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>🤖</div>
              <h3>Symptom Checker</h3>
              <p>AI Health Assessment</p>
            </div>

            <div onClick={() => setPage("prescription")} style={cardStyle}>
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>💊</div>
              <h3>My Prescriptions</h3>
              <p>View your medicines</p>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  transition: "all 0.3s"
};

export default Dashboard;