import React, { useState } from "react";

function PreConsultation({ setPage }) {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      alert("Please describe your symptoms");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call Infermedica API
      const response = await fetch("https://api.infermedica.com/v3/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "App-ID": process.env.REACT_APP_INFERMEDICA_APP_ID,
          "App-Key": process.env.REACT_APP_INFERMEDICA_APP_KEY
        },
        body: JSON.stringify({
          sex: "male", // Can be dynamic based on user input
          age: 30, // Can be dynamic based on user input
          evidence: [
            {
              id: "p_1", // symptom ID from Infermedica
              choice_id: "present"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to analyze symptoms");
      }

      const data = await response.json();

      // Parse API response
      const result = {
        risk: data.should_stop ? "High Risk" : "Medium Risk",
        specialist: data.conditions?.[0]?.name || "General Physician",
        observation: data.conditions?.[0]?.common_name || "Consultation recommended",
        confidence: data.conditions?.[0]?.probability || 0,
        date: new Date().toLocaleString(),
        rawData: data
      };

      setAnalysis(result);
      localStorage.setItem("patientRisk", result.risk);
      localStorage.setItem("lastAnalysis", JSON.stringify(result));

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "10px" }}>AI Symptom Analysis</h1>
      <p style={{ color: "#64748b", marginBottom: "40px" }}>Intelligent pre-consultation healthcare system</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* Input Section */}
        <div style={{ background: "white", padding: "35px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <h3>Enter Symptoms</h3>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: cold, nose bleed, dizziness, excessive dry cough..."
            style={{
              width: "100%",
              height: "220px",
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              resize: "vertical"
            }}
          />
          <button
            onClick={analyzeSymptoms}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              marginTop: "20px",
              background: "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Analyzing..." : "Analyze Symptoms"}
          </button>

          <button
            onClick={() => setPage("appointment")}
            style={{
              width: "100%",
              padding: "16px",
              marginTop: "12px",
              background: "#1e293b",
              color: "white",
              border: "none",
              borderRadius: "14px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Continue to Consultation
          </button>
        </div>

        {/* Analysis Result */}
        <div style={{ background: "white", padding: "35px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <h3>AI Analysis Result</h3>

          {error && (
            <div style={{
              padding: "18px",
              background: "#fee2e2",
              borderRadius: "16px",
              color: "#dc2626",
              marginBottom: "20px"
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {analysis ? (
            <div>
              <div style={{
                padding: "18px",
                background: analysis.risk === "High Risk" ? "#fee2e2" : analysis.risk === "Low Risk" ? "#ecfdf5" : "#fef3c7",
                borderRadius: "16px",
                marginBottom: "20px"
              }}>
                <strong>Risk Level:</strong> 
                <span style={{ 
                  padding: "6px 16px", 
                  borderRadius: "30px", 
                  background: analysis.risk === "High Risk" ? "#ef4444" : analysis.risk === "Low Risk" ? "#22c55e" : "#f59e0b",
                  color: "white",
                  marginLeft: "12px"
                }}>
                  {analysis.risk}
                </span>
              </div>

              <p><strong>Recommended Specialist:</strong> {analysis.specialist}</p>
              <p><strong>AI Observation:</strong> {analysis.observation}</p>
              <p><strong>Confidence:</strong> {(analysis.confidence * 100).toFixed(1)}%</p>
              <p style={{ color: "#64748b", fontSize: "14px" }}><strong>Analysis Date:</strong> {analysis.date}</p>
            </div>
          ) : (
            <p style={{ color: "#64748b", fontStyle: "italic" }}>
              Enter your symptoms and click Analyze
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PreConsultation;