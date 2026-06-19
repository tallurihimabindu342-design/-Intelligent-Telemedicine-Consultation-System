import { useState, useEffect, useRef } from "react";

function Consultation({ setPage }) {
  const role = localStorage.getItem("role");
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { sender: "Doctor", text: "Hello, please describe your symptoms." }
  ]);

  const [medicalData, setMedicalData] = useState({
    symptoms: [], diagnosis: "", medication: [], tests: [], specialist: ""
  });

  const videoRef = useRef(null);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Camera
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.log("Camera error:", err));
  }, []);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    setChat(prev => [...prev, { sender: "Patient", text: message }]);

    // Simple AI Response
    setTimeout(() => {
      setChat(prev => [...prev, { 
        sender: "Doctor", 
        text: "Thank you. I've noted your symptoms. Generating AI summary..." 
      }]);
    }, 800);

    setMessage("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "25px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <div>
          <h1>Smart Consultation Interface</h1>
          <p>AI Enabled Virtual Consultation</p>
        </div>
        <div style={{ background: "white", padding: "14px 22px", borderRadius: "14px", fontWeight: "bold" }}>
          Consultation Time: {formatTime()}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
        {/* Video Area */}
        <div>
          <div style={{ background: "white", padding: "20px", borderRadius: "24px" }}>
            <div style={{ position: "relative", height: "480px", background: "#0f172a", borderRadius: "22px", overflow: "hidden" }}>
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200" 
                alt="Doctor" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
              <div style={{ position: "absolute", top: "20px", left: "20px", background: "#22c55e", color: "white", padding: "6px 16px", borderRadius: "30px", fontWeight: "bold" }}>
                ● LIVE
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
              <button style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#e2e8f0" }}>🎤</button>
              <button style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#e2e8f0" }}>📹</button>
              <button style={{ padding: "0 30px", borderRadius: "16px", background: "#2563eb", color: "white", fontWeight: "bold" }}>
                Start Recording
              </button>
              <button onClick={() => setPage("dashboard")} style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#ef4444", color: "white" }}>📞</button>
            </div>
          </div>
        </div>

        {/* Chat & Summary */}
        <div style={{ background: "white", padding: "20px", borderRadius: "24px", display: "flex", flexDirection: "column", height: "700px" }}>
          <h2>Live Consultation Chat</h2>
          <div style={{ flex: 1, overflowY: "auto", marginBottom: "15px" }}>
            {chat.map((msg, i) => (
              <div key={i} style={{ marginBottom: "12px", textAlign: msg.sender === "Patient" ? "right" : "left" }}>
                <div style={{
                  display: "inline-block",
                  padding: "12px 16px",
                  borderRadius: "16px",
                  background: msg.sender === "Patient" ? "#2563eb" : "#e2e8f0",
                  color: msg.sender === "Patient" ? "white" : "#0f172a",
                  maxWidth: "75%"
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your symptoms..."
              style={{ flex: 1, padding: "14px", borderRadius: "14px", border: "1px solid #cbd5e1" }}
            />
            <button onClick={sendMessage} style={{ padding: "14px 24px", background: "#2563eb", color: "white", border: "none", borderRadius: "14px" }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consultation;