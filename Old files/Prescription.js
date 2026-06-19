import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Prescription() {
  const [patientName, setPatientName] = useState(localStorage.getItem("patientName") || "");
  const [diagnosis, setDiagnosis] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [tests, setTests] = useState("");
  const [showPrescription, setShowPrescription] = useState(false);

  // Clear old data when component loads
  useEffect(() => {
    localStorage.removeItem("diagnosis");
    localStorage.removeItem("medicine");
    localStorage.removeItem("tests");
  }, []);

  const generatePrescription = () => {
    if (!patientName || !diagnosis || !medicine) {
      alert("Please fill Patient Name, Diagnosis and Medicine");
      return;
    }

    const prescriptionData = {
      patientName,
      diagnosis,
      medicine,
      dosage,
      duration,
      tests,
      date: new Date().toLocaleString()
    };

    // Save to timeline
    const timeline = JSON.parse(localStorage.getItem("timelineHistory")) || [];
    timeline.push({
      type: "Prescription",
      patientName,
      diagnosis,
      medicine,
      tests,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("timelineHistory", JSON.stringify(timeline));

    setShowPrescription(true);
  };

  const downloadPDF = async () => {
    const input = document.getElementById("print-prescription");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${patientName}_Prescription.pdf`);
  };

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "30px" }}>Prescription Generator</h1>

      <div style={{ background: "white", padding: "35px", borderRadius: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", maxWidth: "700px" }}>
        <input type="text" placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Medicine Name" value={medicine} onChange={(e) => setMedicine(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Dosage Details (e.g., 1 tablet twice daily)" value={dosage} onChange={(e) => setDosage(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Duration (e.g., 7 days)" value={duration} onChange={(e) => setDuration(e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Recommended Tests (optional)" value={tests} onChange={(e) => setTests(e.target.value)} style={inputStyle} />

        <button onClick={generatePrescription} style={{
          width: "100%", padding: "16px", marginTop: "20px", background: "linear-gradient(to right, #2563eb, #7c3aed)",
          color: "white", border: "none", borderRadius: "14px", fontSize: "17px", fontWeight: "bold", cursor: "pointer"
        }}>
          Generate Prescription
        </button>
      </div>

      {showPrescription && (
        <>
          <button onClick={downloadPDF} style={{
            marginTop: "20px", padding: "14px 30px", background: "#16a34a", color: "white", border: "none", borderRadius: "12px", fontWeight: "bold"
          }}>
            Download PDF
          </button>

          <div id="print-prescription" style={{ marginTop: "30px", background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <h1 style={{ textAlign: "center", color: "#2563eb" }}>SMART DIGITAL HEALTHCARE SYSTEM</h1>
            <p style={{ textAlign: "center" }}>Hyderabad, India | Ph: +91 9876543210</p>
            <hr />

            <h2>℞ Prescription</h2>
            <p><strong>Patient:</strong> {patientName}</p>
            <p><strong>Diagnosis:</strong> {diagnosis}</p>
            <p><strong>Medicine:</strong> {medicine}</p>
            <p><strong>Dosage:</strong> {dosage}</p>
            <p><strong>Duration:</strong> {duration}</p>
            {tests && <p><strong>Recommended Tests:</strong> {tests}</p>}

            <div style={{ marginTop: "80px", textAlign: "right" }}>
              <p>Dr. AI Assistant</p>
              <p>MBBS, MD</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px"
};

export default Prescription;