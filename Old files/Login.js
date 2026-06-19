import { useState } from "react";

function Login({ setPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role || !fullName || !password) {
      setError("Please fill all required fields.");
      return;
    }

    if (role === "Doctor" && !doctorId) {
      setError("Doctor ID is required.");
      return;
    }

    if (role === "Administrator" && !adminId) {
      setError("Administrator ID is required."); 
      return;
    }

    setError("");

    localStorage.setItem("role", role);
    localStorage.setItem("patientName", fullName);

    if (role === "Doctor") {
      localStorage.setItem("currentDoctor", fullName);
      localStorage.setItem("doctorId", doctorId);
    }

    if (role === "Administrator") {
      localStorage.setItem("adminName", fullName);
      localStorage.setItem("adminId", adminId);
    }

    if (role === "Patient") {
      const patients =
        JSON.parse(localStorage.getItem("patients")) || [];

      if (!patients.includes(fullName)) {
        patients.push(fullName);
      }

      localStorage.setItem(
        "patients",
        JSON.stringify(patients)
      );
    }

    if (role === "Doctor") {
      const doctors =
        JSON.parse(localStorage.getItem("doctors")) || [];

      if (!doctors.includes(fullName)) {
        doctors.push(fullName);
      }

      localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
      );
    }

    localStorage.setItem("page", "dashboard");

    setSuccess("Login Successful! Redirecting...");

    setTimeout(() => {
      setPage("dashboard");
    }, 1200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial",
        position: "relative",
        padding: "30px 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.15)",
        }}
      />

      <div
        style={{
          width: "430px",
          padding: "40px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "white",
            margin: "0 auto 20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}
        >
          🩺
        </div>

        <h1
          style={{
            color: "#2563eb",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          Smart Digital
        </h1>

        <h2
          style={{
            color: "#334155",
            marginBottom: "20px",
          }}
        >
          Healthcare System
        </h2>

        <p
          style={{
            color: "#475569",
            marginBottom: "25px",
          }}
        >
          AI Powered Telemedicine Ecosystem
        </p>

        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              marginRight: "10px",
              padding: "8px 20px",
              background: isLogin ? "#2563eb" : "transparent",
              color: isLogin ? "white" : "#334155",
              border: "none",
              borderRadius: "20px",
            }}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            style={{
              padding: "8px 20px",
              background: !isLogin ? "#2563eb" : "transparent",
              color: !isLogin ? "white" : "#334155",
              border: "none",
              borderRadius: "20px",
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "18px",
              borderRadius: "14px",
              border: "none",
            }}
          >
            <option value="">Select Role</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
            <option value="Administrator">Administrator</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "18px",
              borderRadius: "14px",
              border: "none",
            }}
          />

          {role === "Doctor" && (
            <input
              type="text"
              placeholder="Doctor ID / Registration Number"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                marginBottom: "18px",
                borderRadius: "14px",
                border: "none",
              }}
            />
          )}

          {role === "Administrator" && (
            <input
              type="text"
              placeholder="Administrator ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              style={{
                width: "100%",
                padding: "16px",
                marginBottom: "18px",
                borderRadius: "14px",
                border: "none",
              }}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "16px",
              marginBottom: "18px",
              borderRadius: "14px",
              border: "none",
            }}
          />

          {error && (
            <p style={{ color: "#ef4444", marginBottom: "15px" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#22c55e", marginBottom: "15px" }}>
              {success}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              border: "none",
              background:
                "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;