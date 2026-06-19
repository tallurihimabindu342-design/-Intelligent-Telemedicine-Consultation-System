import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
function WaitingRoom() {

    const navigate =
  useNavigate();

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const appointments =
    JSON.parse(
      localStorage.getItem(
        "appointments"
      )
    ) || [];
const doctorStatus =
  localStorage.getItem(
    "doctorStatus"
  ) || "Online";

  const myAppointment =
    appointments.find(
      (appointment) =>
        appointment.patientName ===
          patientName &&
        appointment.status ===
          "Confirmed"
    );

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar role="Patient" />

      <div
        style={{
          flex: 1,
          padding: "30px",
          textAlign: "center",
        }}
      >

        <h1>
          Virtual Waiting Room
        </h1>

        {!myAppointment ? (

          <p>
            No confirmed
            appointment.
          </p>

        ) : (

          <>
  <div
    style={{
      background: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow:
        "0 4px 20px rgba(0,0,0,0.08)",
      maxWidth: "600px",
      margin: "auto",
    }}
  >

    <h2>
      ⏳ Virtual Waiting Room
    </h2>

    <hr />

    <h3>
      Queue Number:
      {" "}
      {
        myAppointment.queueNumber
      }
    </h3>

    <h3>
      Patients Ahead:
      {" "}
      {
        Math.max(
          0,
          myAppointment.queueNumber - 1
        )
      }
    </h3>

    <h3>
      Estimated Wait Time:
      {" "}
      {
        myAppointment.estimatedWait
      }
      {" "}
      mins
    </h3>

    <h3>
      Doctor Status:
      <span
        style={{
          color: "green",
          marginLeft: "8px",
        }}
      >
        {
  doctorStatus ===
  "In Consultation"

    ? "🟡 Busy"

    : "🟢 Online"
}
      </span>
    </h3>

    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        background: "#eff6ff",
        borderRadius: "10px",
      }}
    >
      Your consultation will begin
      shortly. Please keep your
      internet connection active and
      remain available.
    </div>
<button
  style={{
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Join Consultation
</button>
  </div>
</>
        )}

      </div>
    </div>
  );
}

export default WaitingRoom;