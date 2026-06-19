
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleRegister = () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const patients =
      JSON.parse(localStorage.getItem("patients")) || [];

    const existingUser = patients.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("Account already exists");
      return;
    }

    const newPatient = {
      patientId: "PAT" + Date.now(),
      fullName,
      email,
      phone,
      password,
    };

    patients.push(newPatient);

    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );

    alert("Registration Successful");

    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
"linear-gradient(135deg,#0F4C81,#1E3A5F)"
      }}
    >
      <div
        style={{
          width: "450px",
          background: "rgba(255,255,255,0.95)",
backdropFilter: "blur(20px)",
border: "1px solid rgba(255,255,255,0.4)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <>
  <h1
    style={{
      textAlign: "center",
      color: "#0F4C81",
      fontSize: "34px",
      marginBottom: "5px",
    }}
  >
    Create Account
  </h1>

  <p
    style={{
      textAlign: "center",
      color: "#64748B",
      marginBottom: "25px",
    }}
  >
    Join Smart Digital Healthcare
  </p>
</>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          style={{
            width: "100%",
            padding:"14px",
borderRadius:"12px",
border:"1px solid #CBD5E1",
fontSize:"15px",
boxSizing:"border-box"
            
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding:"14px",
borderRadius:"12px",
border:"1px solid #CBD5E1",
fontSize:"15px",
boxSizing:"border-box"
          }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={{
            width: "100%",
            padding:"14px",
borderRadius:"12px",
border:"1px solid #CBD5E1",
fontSize:"15px",
boxSizing:"border-box"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding:"14px",
borderRadius:"12px",
border:"1px solid #CBD5E1",
fontSize:"15px",
boxSizing:"border-box"
          }}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding:"14px",
borderRadius:"12px",
border:"1px solid #CBD5E1",
fontSize:"15px",
boxSizing:"border-box"
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background:
"linear-gradient(90deg,#0F4C81,#2563EB)",
            fontWeight:"600"
            
          }}
        >
          Create Account
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Already have an account?
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#2563eb",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

