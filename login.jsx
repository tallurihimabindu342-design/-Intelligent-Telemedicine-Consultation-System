import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import admin from "../data/admin";
import doctors from "../data/doctors";
function Login() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  // Basic Validation
  if (!role || !username || !password) {
    setError("Please fill all required fields.");
    return;
  }

  // =========================
  // DOCTOR LOGIN
  // =========================
  if (role === "Doctor") {

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
  const doctorFound =
  allDoctors.find(
      (doctor) =>
        doctor.doctorId === username
    );

  if (!doctorFound) {
    setError(
      "No doctor account found with the provided Doctor ID."
    );
    return;
  }

  if (doctorFound.password !== password) {
    setError(
      "Incorrect Password. Please try again."
    );
    return;
  }

  localStorage.setItem(
    "currentDoctor",
    doctorFound.name
  );

  localStorage.setItem(
    "doctorId",
    doctorFound.doctorId
  );
}
  // =========================
  // ADMIN LOGIN
  // =========================
  if (role === "Administrator") {

  if (admin.adminId !== username) {
    setError(
      "No administrator account found with the provided ID."
    );
    return;
  }

  if (admin.password !== password) {
    setError(
      "Incorrect Password. Please try again."
    );
    return;
  }

  localStorage.setItem(
    "adminName",
    admin.name
  );

  localStorage.setItem(
    "adminId",
    admin.adminId
  );
}
  // =========================
  // PATIENT LOGIN
  // =========================
  if (role === "Patient") {

  const patients =
    JSON.parse(localStorage.getItem("patients")) || [];

  const patientFound = patients.find(
  (patient) =>
    typeof patient === "object" &&
    patient?.email &&
    patient.email.toLowerCase() ===
      username.toLowerCase()
);

  if (!patientFound) {
    setError(
      "No account found. Please register first."
    );
    return;
  }

  if (patientFound.password !== password) {
    setError(
      "Incorrect Password. Please try again."
    );
    return;
  }
  localStorage.setItem(
  "patientName",
  patientFound.fullName
);
}

  // =========================
  // COMMON LOGIN SUCCESS
  // =========================
  localStorage.setItem("role", role);
  localStorage.setItem("page", "dashboard");

  setSuccess("Login Successful!");

  setTimeout(() => {
    switch (role) {
      case "Patient":
        navigate("/patient");
        break;

      case "Doctor":
        navigate("/doctor");
        break;

      case "Administrator":
        navigate("/admin");
        break;

      default:
        navigate("/");
    }
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
          background: "rgba(0,0,0,0.35)",
        }}
      />

      <div
        style={{
          width: "90%",
          maxWidth: "500px",
          padding: "40px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
        
  
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "white",
            margin: "0 auto 20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            boxShadow: "0 10px 30px rgba(37,99,235,0.25)",
          }}
        >
          🩺
        </div>

        <h1
          style={{
            color: "#2563eb",
            fontSize: "42px",
            fontWeight: "700",
            letterSpacing: "-1px",
            marginBottom: "10px",
          }}
        >
          Digital Healthcare
        </h1>

        <h2
  style={{
    color: "#334155",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
  }}
>
  Secure Telemedicine Platform
</h2>

        <p
  style={{
    color: "#475569",
    fontSize: "15px",
    letterSpacing: "0.5px",
    marginBottom: "30px",
  }}
>
  Consult • Diagnose • Prescribe • Monitor
</p>


        <form onSubmit={handleSubmit}>
  <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  style={{
  width: "100%",
  padding: "16px",
  marginBottom: "18px",

  borderRadius: "14px",

  border: "1px solid rgba(255,255,255,0.2)",

  background: "rgba(255,255,255,0.15)",

  color: "#0f172a",

  fontSize: "16px",

  fontWeight: "500",

  outline: "none",

  boxSizing: "border-box",

  cursor: "pointer",

  backdropFilter: "blur(10px)",
}}
>
    <option value="">Select Role</option>
    <option value="Doctor">Doctor</option>
    <option value="Patient">Patient</option>
    <option value="Administrator">Administrator</option>
  </select>

  <div
    style={{
      marginBottom: "20px",
      display: "none",
      justifyContent: "center",
      gap: "10px",
    }}
  >
    <button
      type="button"
      style={{
        padding: "8px 20px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
      }}
    >
      Login
    </button>

    {role === "Patient" && (
      <button
        type="button"
        onClick={() => navigate("/register")}
        style={{
          padding: "8px 20px",
          background: "transparent",
          color: "#334155",
          border: "1px solid #334155",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    )}

    {role === "Doctor" && (
      <button
        type="button"
        onClick={() => navigate("/doctor-register")}
        style={{
          padding: "8px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        Apply For Access
      </button>
    )}
  </div>

          <input
            placeholder={
  role === "Patient"
    ? "Email Address"
    : role === "Doctor"
    ? "Doctor ID"
    : role === "Administrator"
    ? "Administrator ID"
    : "Username"
}
  value={username}

  onChange={(e) => setUsername(e.target.value)}

            style={{
        width: "100%",
  boxSizing: "border-box",
  padding: "16px",
  marginBottom: "18px",
  borderRadius: "14px",

  border: "1px solid rgba(255,255,255,0.25)",

  background: "rgba(255,255,255,0.18)",

  color: "#1e293b",

  fontSize: "16px",

  outline: "none",
  color: "#0f172a",
  fontWeight: "500",
}}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "16px",
            marginBottom: "18px",
            borderRadius: "14px",

            border: "1px solid rgba(255,255,255,0.25)",

            background: "rgba(255,255,255,0.18)",

            color: "#1e293b",

            fontSize: "16px",

            outline: "none",
            color: "#0f172a",
            fontWeight: "500",
          }}
          />

          {error && (
  <>
    <p
      style={{
        color: "#e81e1e",
        marginBottom: "8px",
        fontWeight: "bold",
      }}
    >
      {error}
    </p>

    {error.includes("Incorrect Password") && (
      <p
        style={{
          marginBottom: "15px",
        }}
      >
        <Link
  to="/forgot-password"
  style={{
    color: "#1168e2f9",
    textDecoration: "none",
    fontWeight: "600",
  }}
>
  Forgot Password?
</Link>
      </p>
    )}

    {error.includes("register") && (
      <button
        type="button"
        onClick={() => navigate("/register")}
        style={{
          padding: "10px 20px",
          marginBottom: "15px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        REGISTER
      </button>
    )}
  </>
)}

          {success && (
            <p style={{ color: "#22c55e", marginBottom: "15px" }}>
              {success}
            </p>
          )}

        <button
  type="submit"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",

    background:
      "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",

    color: "white",

    fontSize: "18px",
    fontWeight: "700",

    cursor: "pointer",

    letterSpacing: "0.5px",

    boxShadow: isHovered
      ? "0 12px 35px rgba(99,102,241,0.55)"
      : "0 8px 25px rgba(99,102,241,0.35)",

    transform: isHovered
      ? "translateY(-2px)"
      : "translateY(0)",

    transition: "all 0.3s ease",
  }}
>
  Proceed
</button>
        </form>
      </div>
    </div>
  );
}

export default Login;