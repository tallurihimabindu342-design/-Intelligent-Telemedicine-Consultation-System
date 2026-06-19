import { useState } from "react";
import Sidebar from "../components/Sidebar";

function PatientConcernReporter() {

  const [concernType, setConcernType] =
    useState("Symptom");

  const [description, setDescription] =
    useState("");

  const [severity, setSeverity] =
    useState("Low");

  const submitConcern = () => {

    const concerns =
      JSON.parse(
        localStorage.getItem(
          "patientConcerns"
        )
      ) || [];

    concerns.push({

      patientName:
        localStorage.getItem(
          "patientName"
        ),

      concernType,

      description,

      severity,

      status:
        "Pending",

      createdAt:
        new Date().toLocaleString(),

    });

    localStorage.setItem(
      "patientConcerns",
      JSON.stringify(
        concerns
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
        localStorage.getItem(
          "patientName"
        ),

      type:
        "Concern",

      message:
        "Your concern has been submitted for review.",

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
      "Concern Submitted"
    );

    setDescription("");

  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >

      <Sidebar role="Patient" />

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
    📝 Report Health Concern
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Submit symptoms, medication issues, recovery concerns, or questions for review.
  </p>
</div>
<div
  style={{
    background:
      "linear-gradient(180deg,#0f172a,#111827)",
    borderRadius: "24px",
    padding: "32px",
    maxWidth: "900px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
      "0 20px 40px rgba(0,0,0,0.35)",
  }}
>
        <select
          value={concernType}
          onChange={(e) =>
            setConcernType(
              e.target.value
            )
          }
          style={{
    width: "100%",
    padding: "16px",
    background: "#111827",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    fontSize: "15px",
    marginBottom: "18px",
  }}
        >

          <option>
            Symptom
          </option>

          <option>
            Medication Issue
          </option>

          <option>
            Recovery Concern
          </option>

          <option>
            General Question
          </option>

        </select>

        

        <select
          value={severity}
          onChange={(e) =>
            setSeverity(
              e.target.value
            )
          }
          style={{
    width: "100%",
    padding: "16px",
    background: "#111827",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    fontSize: "15px",
    marginBottom: "18px",
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

        
        

        <textarea
  rows="8"
  value={description}
  style={{
    width: "100%",
    padding: "16px",
    background: "#111827",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    fontSize: "15px",
    resize: "none",
    boxSizing: "border-box",
  }}
          placeholder="Describe your concern..."
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          
        />

        

        <button
  onClick={submitConcern}
  style={{
    width: "100%",
    marginTop: "25px",
    padding: "18px",
    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
  }}
>
          Submit Concern
        </button>

      </div>

    </div>
    </div>
  );
}

export default PatientConcernReporter;