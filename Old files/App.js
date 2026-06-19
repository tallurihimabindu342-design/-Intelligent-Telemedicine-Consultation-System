import React, { useState, useEffect } from "react";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Appointment from "./Appointment";
import PreConsultation from "./PreConsultation";
import Consultation from "./Consultation";
import AppointmentConfirmed from "./AppointmentConfirmed";
import Prescription from "./Prescription";
import PatientRecords from "./PatientRecords";

function App() {
  const [page, setPage] = useState("login");
  const role = localStorage.getItem("role");

  // Auto redirect if logged in
  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage && role) setPage(savedPage);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  let content;
  if (page === "dashboard") content = <Dashboard setPage={setPage} />;
  if (page === "appointment") content = <Appointment setPage={setPage} />;
  if (page === "preconsultation") return <PreConsultation setPage={setPage} />;
  if (page === "consultation") content = <Consultation setPage={setPage} />;
  if (page === "prescription") content = <Prescription setPage={setPage} />;
  if (page === "records") content = <PatientRecords setPage={setPage} />;
  if (page === "appointmentconfirmed") content = <AppointmentConfirmed setPage={setPage} />;
  if (page === "login") return <Login setPage={setPage} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* SIDEBAR */}
      <div style={{
        width: "260px",
        background: "#0f172a",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "4px 0 12px rgba(0,0,0,0.1)",
        height: "100vh",
        position: "sticky",
        top: 0
      }}>
        <h2 style={{ marginBottom: "30px" }}>🏥 HealthCare AI</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
            {role === "Doctor" ? "👨‍⚕️" : "🧑"}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>{localStorage.getItem("patientName") || "User"}</p>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "14px" }}>● Online</p>
          </div>
        </div>

        {role === "Doctor" && (
          <>
            <button onClick={() => setPage("dashboard")} style={navStyle(page === "dashboard")}>🏠 Dashboard</button>
            <button onClick={() => setPage("consultation")} style={navStyle(page === "consultation")}>🩺 Live Consultation</button>
            <button onClick={() => setPage("prescription")} style={navStyle(page === "prescription")}>📄 Prescriptions</button>
            <button onClick={() => setPage("records")} style={navStyle(page === "records")}>📋 Patient Records</button>
          </>
        )}

        {role === "Patient" && (
          <>
            <button onClick={() => setPage("dashboard")} style={navStyle(page === "dashboard")}>🏠 Dashboard</button>
            <button onClick={() => setPage("appointment")} style={navStyle(page === "appointment")}>📅 Book Appointment</button>
            <button onClick={() => setPage("preconsultation")} style={navStyle(page === "preconsultation")}>🤖 Symptom Checker</button>
            <button onClick={() => setPage("prescription")} style={navStyle(page === "prescription")}>💊 My Prescriptions</button>
            <button onClick={() => setPage("records")} style={navStyle(page === "records")}>📋 Health Timeline</button>
          </>
        )}

        <button onClick={() => { localStorage.clear(); setPage("login"); }} style={{ marginTop: "auto", padding: "14px", background: "#ef4444", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold" }}>
          Logout
        </button>
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "30px", minHeight: "calc(100vh - 60px)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          {content}
        </div>
      </div>
    </div>
  );
}

const navStyle = (active) => ({
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: active ? "#2563eb" : "#1e293b",
  color: "white",
  fontSize: "15px",
  fontWeight: "bold",
  cursor: "pointer",
  textAlign: "left"
});

export default App;