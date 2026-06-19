import { useState } from "react";
import Sidebar from "../components/Sidebar";
import doctors from "../data/doctors";
import {getMedicalAdvice} from "../services/geminiService";
function SymptomChecker() {

  const [symptoms, setSymptoms] =
    useState("");

  const [result, setResult] =
    useState(null);
const [aiResponse,setAiResponse] =
  useState("");
  const [aiSpecialization,
  setAiSpecialization] =
  useState("");
  

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
    overflowX: "hidden",
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
    marginBottom: "15px",
    lineHeight: "1.2",
  }}
>
  🤖 AI Symptom Checker
</h1>

<p
  style={{
    color: "#94a3b8",
    fontSize: "16px",
    marginTop: "0",
  }}
></p>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Describe your symptoms and receive AI-powered health insights.
  </p>
</div>

        <textarea
          rows="6"
          placeholder="Describe your symptoms..."
          value={symptoms}
          onChange={(e) =>
            setSymptoms(
              e.target.value
            )
          }
          style={{
    background: "#0f172a",

    borderRadius: "24px",

    padding: "25px",

    width: "100%",

    boxSizing: "border-box",

    border:
      "1px solid rgba(255,255,255,0.05)",

    overflow: "hidden",
    maxWidth: "1200px",
  }}
></textarea>
        <br />
        <br />

        <button
  onClick={async () => {

  const aiResult =
    await getMedicalAdvice(
      symptoms
    );
console.log(
  "AI RESULT:",
  aiResult
);

if (
  !aiResult ||
  !aiResult.specialization
) {
  alert(
    "AI analysis unavailable. Please try again."
  );
  return;
}
  setAiResponse(
    aiResult.advice
  );

  setAiSpecialization(
    aiResult.specialization
  );

  const approvedDoctors =
    JSON.parse(
      localStorage.getItem(
        "approvedDoctors"
      )
    ) || [];

  const allDoctors = [
    ...doctors,
    ...approvedDoctors,
  ];
console.log(aiResult);
  const matchingDoctors =
  allDoctors.filter(
    (doctor) =>
      doctor.specialization &&
      aiResult.specialization &&
      doctor.specialization
        .toLowerCase()
        .includes(
          aiResult.specialization
            .toLowerCase()
        )
  );

  setResult({
    specialization:
      aiResult.specialization,
    risk:
      aiResult.risk,
    emergency:
      aiResult.emergency,
    recommendation:
      aiResult.advice,
    doctors:
      matchingDoctors,
  });
  if (
  aiResult.emergency
) {

  const alerts =
    JSON.parse(
      localStorage.getItem(
        "emergencyAlerts"
      )
    ) || [];

  alerts.push({

    patientName:
      localStorage.getItem(
        "patientName"
      ),

    createdAt:
      new Date().toLocaleString(),

    status:
      "Active",

  });

  localStorage.setItem(
    "emergencyAlerts",
    JSON.stringify(
      alerts
    )
  );

}
  if (
  aiResult.risk === "High" ||
  aiResult.emergency
) {

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
      "Risk",

    title:
      "Clinical Attention Required",

    message:
      "Your recent symptom assessment indicates elevated clinical risk. Please seek medical consultation as soon as possible.",

    createdAt:
      new Date().toLocaleString(),

  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(
      notifications
    )
  );

}
localStorage.setItem(
  "patientRisk",
  aiResult.risk
);

localStorage.setItem(
  "riskRecommendation",
  aiResult.advice
);

localStorage.setItem(
  "riskDate",
  new Date().toLocaleString()
);

}}
style={{
  padding: "16px 30px",

  background:
    "linear-gradient(90deg,#2563eb,#7c3aed)",

  color: "white",

  border: "none",

  borderRadius: "14px",

  fontWeight: "700",

  fontSize: "15px",

  cursor: "pointer",
}}
>
  🧠 Analyze Symptoms
</button>

{result && (

  <div
    style={{
  marginTop: "30px",

  background: "#0f172a",

  borderRadius: "24px",

  padding: "30px",

  border:
    "1px solid rgba(255,255,255,0.05)",
    boxSizing: "border-box",
width: "100%",
}}
  >

    <h2
  style={{
    color: "white",
    marginBottom: "20px",
  }}
>
  🩺 Assessment Result
</h2>

    {result.emergency && (

      <div
        style={{
          background: "#fee2e2",
          color: "#b91c1c",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        🚨 Emergency Symptoms Detected.
        Seek immediate medical attention.
      </div>

    )}

    <p>
      Recommended Specialization:
      {" "}
      {result.specialization}
    </p>

    <div
  style={{
    display: "inline-block",

    padding: "8px 16px",

    borderRadius: "999px",

    marginBottom: "15px",

    background:
      result.risk === "High"
        ? "rgba(239,68,68,0.2)"
        : result.risk === "Medium"
        ? "rgba(245,158,11,0.2)"
        : "rgba(34,197,94,0.2)",

    color:
      result.risk === "High"
        ? "#ef4444"
        : result.risk === "Medium"
        ? "#f59e0b"
        : "#22c55e",
  }}
>
  Risk Level: {result.risk}
</div>

    <p>
      Recommendation:
      {" "}
      {result.recommendation}
    </p>

    <h3>
      Recommended Doctors
    </h3>

    {result.doctors.length === 0 ? (

      <div
  style={{
    padding: "15px",
    border:
      "1px solid #f59e0b",
    borderRadius: "10px",
    background:
      "#fffbeb",
    color: "#92400e",
  }}
>
  We currently do not have any
  specialists in
  {" "}
  <strong>
    {result.specialization}
  </strong>
  {" "}
  available on our platform.

  Please consider consulting a
  qualified healthcare provider
  or nearby medical facility
  for further assistance.
</div>

    ) : (

      result.doctors.map(
        (doctor, index) => (

          <div
            key={index}
            style={{
  background: "#111827",

  padding: "20px",

  borderRadius: "18px",

  marginBottom: "15px",

  border:
    "1px solid rgba(255,255,255,0.05)",
}}
          >
            <p>
              {doctor.name}
            </p>

            <p>
              {doctor.specialization}
            </p>

            <p>
              ID: {doctor.doctorId}
            </p>
<button
  onClick={() => {

    window.location.href =
      `/doctor-profile/${doctor.doctorId}`;

  }}

  style={{
    marginTop: "10px",

    padding: "10px 18px",

    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",

    color: "white",

    border: "none",

    borderRadius: "12px",

    cursor: "pointer",

    fontWeight: "600",
  }}
>
  View Profile
</button>
          </div>

        )
      )

    )}

  </div>

)}

      </div>
    </div>
  );
}

export default SymptomChecker;