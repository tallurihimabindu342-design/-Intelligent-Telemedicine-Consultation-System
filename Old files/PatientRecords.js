import React, { useState, useEffect } from "react";

function PatientRecords({ setPage }) {
  const role = localStorage.getItem("role");
  const patientName = localStorage.getItem("patientName") || "Patient";
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const savedTimeline = JSON.parse(localStorage.getItem("timelineHistory")) || [];
    setTimeline(savedTimeline);
  }, []);

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1 style={{ color: "#2563eb" }}>Health Timeline</h1>
          <p style={{ color: "#64748b" }}>Complete medical history for {patientName}</p>
        </div>
        <button 
          onClick={() => setPage("dashboard")} 
          style={{ padding: "12px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "12px", cursor: "pointer" }}
        >
          Back to Dashboard
        </button>
      </div>

      {timeline.length === 0 ? (
        <div style={{
          background: "white",
          padding: "60px",
          borderRadius: "24px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
        }}>
          <h2>No Records Yet</h2>
          <p style={{ color: "#64748b" }}>Your prescriptions and consultations will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {timeline.map((record, index) => (
            <div key={index} style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
              borderLeft: record.type === "Prescription" ? "6px solid #22c55e" : "6px solid #3b82f6"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <h3>{record.type}</h3>
                <span style={{ color: "#64748b" }}>{record.date}</span>
              </div>

              <p><strong>Patient:</strong> {record.patientName}</p>
              {record.diagnosis && <p><strong>Diagnosis:</strong> {record.diagnosis}</p>}
              {record.medicine && <p><strong>Medicine:</strong> {record.medicine}</p>}
              {record.tests && <p><strong>Tests:</strong> {record.tests}</p>}

              {record.risk && (
                <p><strong>Risk Level:</strong> 
                  <span style={{ color: record.risk === "High Risk" ? "red" : "green" }}>
                    {record.risk}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientRecords;