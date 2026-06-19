import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorRegister() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const requests =
      JSON.parse(
        localStorage.getItem("doctorRequests")
      ) || [];

    requests.push({
      fullName,
      email,
      phone,
      doctorId,
      specialization,
      password,
      status: "Pending",
    });

    localStorage.setItem(
      "doctorRequests",
      JSON.stringify(requests)
    );

    alert(
      "Registration Request Sent To Administrator"
    );

    navigate("/");
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      background:
        "linear-gradient(135deg,#020617,#071938,#10214f)",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
  style={{
    width: "100%",
    maxWidth: "700px",
    background:
      "linear-gradient(180deg,#0f172a,#111827)",
    padding: "40px",
    borderRadius: "24px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    color: "white",
  }}
>
      <h1
  style={{
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "10px",
  }}
>
  👨‍⚕ Doctor Registration
</h1>

<p
  style={{
    color: "#94a3b8",
    marginBottom: "30px",
  }}
>
  Submit your registration request for administrator approval.
</p>

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) =>
          setFullName(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="Doctor Registration ID"
        value={doctorId}
        onChange={(e) =>
          setDoctorId(e.target.value)
        }
      />
      <br /><br />

      <input
        placeholder="Specialization"
        value={specialization}
        onChange={(e) =>
          setSpecialization(e.target.value)
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
      <br /><br />

      <button
  onClick={handleSubmit}
  style={{
    width: "100%",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "16px",
  }}
>
        Submit Request
      </button>
    </div>
    </div>
  );
}

export default DoctorRegister;