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
    <div style={{ padding: "30px" }}>
      <h1>Doctor Registration Request</h1>

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

      <button onClick={handleSubmit}>
        Submit Request
      </button>
    </div>
  );
}

export default DoctorRegister;