import React, { useEffect } from "react";

function AppointmentConfirmed({ setPage }) {
  const doctorName = localStorage.getItem("doctor") || "Doctor";
  const appointmentDate = localStorage.getItem("appointmentDate") || "Not selected";
  const appointmentTime = localStorage.getItem("time") || "Not selected";
  const patientName = localStorage.getItem("patientName") || "Patient";

  // Save appointment to history
  useEffect(() => {
    const newAppointment = {
      patientName,
      doctorName,
      date: appointmentDate,
      time: appointmentTime,
      status: "Confirmed",
      timestamp: new Date().toLocaleString()
    };

    const existingAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    existingAppointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));
  }, []);

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8fafc",
      padding: "40px"
    }}>
      <div style={{
        background: "white",
        maxWidth: "520px",
        padding: "50px 40px",
        borderRadius: "28px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <div style={{
          width: "90px",
          height: "90px",
          background: "#22c55e",
          borderRadius: "50%",
          margin: "0 auto 25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "45px",
          color: "white"
        }}>
          ✅
        </div>

        <h1 style={{ color: "#16a34a", marginBottom: "12px" }}>Appointment Confirmed!</h1>
        <p style={{ color: "#64748b", fontSize: "18px", marginBottom: "35px" }}>
          Your consultation has been successfully booked.
        </p>

        <div style={{ background: "#f8fafc", padding: "25px", borderRadius: "16px", textAlign: "left", marginBottom: "35px" }}>
          <p><strong>Patient:</strong> {patientName}</p>
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Date:</strong> {appointmentDate}</p>
          <p><strong>Time:</strong> {appointmentTime}</p>
          <p><strong>Status:</strong> <span style={{ color: "#22c55e", fontWeight: "bold" }}>Confirmed</span></p>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button 
            onClick={() => setPage("consultation")}
            style={{
              flex: 1,
              padding: "16px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Join Consultation Now
          </button>

          <button 
            onClick={() => setPage("dashboard")}
            style={{
              flex: 1,
              padding: "16px",
              background: "#64748b",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentConfirmed;