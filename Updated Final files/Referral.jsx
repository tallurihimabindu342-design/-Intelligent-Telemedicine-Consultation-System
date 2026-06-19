import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Referral() {

  const [patientName,
    setPatientName] =
    useState("");

  const [specialization,
    setSpecialization] =
    useState("");

  const [reason,
    setReason] =
    useState("");

  const [urgency,
    setUrgency] =
    useState("Medium");

  const createReferral =
    () => {

      const referrals =
        JSON.parse(
          localStorage.getItem(
            "referrals"
          )
        ) || [];

      referrals.push({

        patientName,

        doctor:
          localStorage.getItem(
            "currentDoctor"
          ),

        specialization,

        reason,

        urgency,

        createdAt:
          new Date().toLocaleString(),

      });

      localStorage.setItem(
        "referrals",
        JSON.stringify(
          referrals
        )
      );

      const notifications =
        JSON.parse(
          localStorage.getItem(
            "notifications"
          )
        ) || [];

      notifications.push({

        patientName,

        type:
          "Referral",

        title:
          "Specialist Referral",

        message:
          `A referral has been created for ${specialization}. Please schedule an appointment with a specialist.`,

        createdAt:
          new Date().toLocaleString(),

      });

      localStorage.setItem(
        "notifications",
        JSON.stringify(
          notifications
        )
      );

      alert(
        "Referral Created"
      );
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
    color: "white",
  }}
>

        <h1
  style={{
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "10px",
  }}
>
  📋 Create Referral
</h1>

<p
  style={{
    color: "#94a3b8",
    marginBottom: "20px",
  }}
>
  Create specialist referrals for patients.
</p>

<div
  style={{
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    marginBottom: "30px",
  }}
/>

        <input
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) =>
            setPatientName(
              e.target.value
            )
          }
          style={{
  width: "350px",
  padding: "12px",
  background: "#111827",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
}}
        />

        <br />
        <br />

        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) =>
            setSpecialization(
              e.target.value
            )
          }
          style={{
  width: "350px",
  padding: "12px",
  background: "#111827",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
}}
        />

        <br />
        <br />

        <textarea
  placeholder="Reason"
  value={reason}
  onChange={(e) =>
    setReason(e.target.value)
  }
  style={{
    width: "350px",
    height: "100px",
    padding: "12px",
    background: "#111827",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
  }}
/>

        <br />
        <br />

        <select
  value={urgency}
  onChange={(e) =>
    setUrgency(e.target.value)
  }
  style={{
    width: "350px",
    padding: "12px",
    background: "#111827",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
  }}
>
          <option>
            Low
          </option>

          <option>
            Medium
          </option>

          <option>
            High
          </option>
        </select>

        <br />
        <br />

        <button
  onClick={createReferral}
  style={{
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Create Referral
</button>

      </div>

    </div>

  );
}

export default Referral;