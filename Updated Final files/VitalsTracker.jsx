import { useState } from "react";
import Sidebar from "../components/Sidebar";

function VitalsTracker() {

  const [bp, setBp] =
    useState("");

  const [pulse, setPulse] =
    useState("");

  const [spo2, setSpo2] =
    useState("");

  const [temperature,
    setTemperature] =
    useState("");

  const [sugar,
    setSugar] =
    useState("");

  const [weight,
    setWeight] =
    useState("");
    const [sleepHours,
  setSleepHours] =
  useState("");

const [waterIntake,
  setWaterIntake] =
  useState("");

const [exerciseMinutes,
  setExerciseMinutes] =
  useState("");

const [steps,
  setSteps] =
  useState("");

  const vitals =
  JSON.parse(
    localStorage.getItem(
      "healthVitals"
    )
  ) || [];

const latestVital =
  vitals[vitals.length - 1];

  const inputStyle = {
  width: "100%",
  height: "54px",
  padding: "0 18px",
  background: "#111827",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const summaryCard = {
  background: "#0f172a",
  padding: "14px",
  borderRadius: "16px",
  border:
    "1px solid rgba(255,255,255,0.05)",
  color: "white",
};

  const saveVitals = () => {

    const allVitals =
  JSON.parse(
    localStorage.getItem(
      "healthVitals"
    )
  ) || [];

    allVitals.push({

  patientName:
    localStorage.getItem(
      "patientName"
    ),

  bp,

  pulse,

  spo2,

  temperature,

  sugar,

  weight,

  sleepHours,

  waterIntake,

  exerciseMinutes,

  steps,

  recordedAt:
    new Date()
      .toLocaleString(),

});

    localStorage.setItem(
      "healthVitals",
      JSON.stringify(allVitals)
    );

    alert(
      "Vitals Saved"
    );

    setBp("");
    setPulse("");
    setSpo2("");
    setTemperature("");
    setSugar("");
    setWeight("");
    setSleepHours("");

setWaterIntake("");

setExerciseMinutes("");

setSteps("");
  };

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
          padding: "32px",
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
      marginBottom: "16px",
      lineHeight: "1.2",
    }}
  >
    ❤️ Health Vitals
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "16px",
    }}
  >
    Track and monitor your daily health metrics.
  </p>
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "15px",
    maxWidth: "1400px",
    width: "100%",
    marginBottom: "25px",
  }}
>
  <div style={summaryCard}>
  ❤️ Heart Rate
  <h3>
    {latestVital?.pulse || "--"} bpm
  </h3>
</div>

<div style={summaryCard}>
  🩸 BP
  <h3>
    {latestVital?.bp || "--"}
  </h3>
</div>

<div style={summaryCard}>
  🫁 SpO₂
  <h3>
    {latestVital?.spo2 || "--"}%
  </h3>
</div>

<div style={summaryCard}>
  ⚖️ Weight
  <h3>
    {latestVital?.weight || "--"} kg
  </h3>
</div>

</div>
</div>
    <div
  style={{
    background:
  "linear-gradient(180deg,#0f172a,#111827)",
    borderRadius: "24px",
    padding: "32px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    boxShadow:
  "0 20px 40px rgba(0,0,0,0.35)",
    maxWidth: "1100px",
    width: "100%",
    marginTop: "20px",
  }}
>
  <h2
  style={{
    color: "white",
    marginBottom: "25px",
  }}
>
  📊 Enter Today's Health Metrics
</h2>

<div
  style={{
    height: "1px",
    background:
      "rgba(255,255,255,0.08)",
    marginBottom: "25px",
  }}
/>

  <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    columnGap: "18px",
    rowGap: "12px",
  }}
>
        <div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    🩸 Blood Pressure
  </label>

  <input
    style={inputStyle}
    placeholder="120/80"
    value={bp}
    onChange={(e) =>
      setBp(e.target.value)
    }
  />
</div>


        <div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    💓 Pulse
  </label>

  <input
    style={inputStyle}
    placeholder="72 bpm"
    value={pulse}
    onChange={(e) =>
      setPulse(e.target.value)
    }
  />
</div>

        

       <div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    🫁 SpO₂
  </label>

  <input
    style={inputStyle}
    placeholder="98%"
    value={spo2}
    onChange={(e) =>
      setSpo2(e.target.value)
    }
  />
</div>
        

      <div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    🌡️ Temperature
  </label>

  <input
    style={inputStyle}
    placeholder="36.5 °C"
    value={temperature}
    onChange={(e) =>
      setTemperature(
        e.target.value
      )
    }
  />
</div>
        

<div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    🍬 Blood Sugar
  </label>

  <input
    style={inputStyle}
    placeholder="90 mg/dL"
    value={sugar}
    onChange={(e) =>
      setSugar(e.target.value)
    }
  />
</div>

        

    <div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    ⚖️ Weight
  </label>

  <input
    style={inputStyle}
    placeholder="65 kg"
    value={weight}
    onChange={(e) =>
      setWeight(e.target.value)
    }
  />
</div>


<div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    😴 Sleep Hours
  </label>

  <input
    style={inputStyle}
    placeholder="8 hours"
    value={sleepHours}
    onChange={(e) =>
      setSleepHours(
        e.target.value
      )
    }
  />
</div>


<div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    💧 Water Intake
  </label>

  <input
    style={inputStyle}
    placeholder="2.5 litres"
    value={waterIntake}
    onChange={(e) =>
      setWaterIntake(
        e.target.value
      )
    }
  />
</div>



<div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    🏃 Exercise Minutes
  </label>

  <input
    style={inputStyle}
    placeholder="30 mins"
    value={exerciseMinutes}
    onChange={(e) =>
      setExerciseMinutes(
        e.target.value
      )
    }
  />
</div>



<div>
  <label
    style={{
      color: "#94a3b8",
      fontSize: "13px",
      display: "block",
      marginBottom: "6px",
    }}
  >
    👣 Daily Steps
  </label>

  <input
    style={inputStyle}
    placeholder="10000"
    value={steps}
    onChange={(e) =>
      setSteps(
        e.target.value
      )
    }
  />
</div>

        <button
  onClick={saveVitals}
  style={{
  marginTop: "20px",

  width: "100%",

  padding: "18px",

  background:
    "linear-gradient(90deg,#2563eb,#7c3aed)",

  color: "white",

  border: "none",

  borderRadius: "14px",

  fontSize: "16px",

  fontWeight: "700",

  cursor: "pointer",
}}
>
  💾 Save Vitals
</button>

<div
  style={{
    marginTop: "25px",
    background:
  "rgba(255,255,255,0.02)",
    borderRadius: "16px",
    padding: "20px",
    color: "white",
    border:
  "1px solid rgba(255,255,255,0.06)",
  }}
>
  <h3>📈 Latest Recorded Vitals</h3>

  <p>
    Your most recently saved health
    record will appear here.
  </p>
</div>

      </div>

    </div>
    </div>
    </div>

  );
}

export default VitalsTracker;