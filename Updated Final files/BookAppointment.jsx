import { useState } from "react";
import doctors from "../data/doctors";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function BookAppointment() {

  const referredDoctorId =
    localStorage.getItem(
      "referredDoctorId"
    );
    const location = useLocation();

const selectedDoctor =
  location.state?.doctor;

  const [doctorId, setDoctorId] =
  useState(
    selectedDoctor?.doctorId ||
    referredDoctorId ||
    ""
  );

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const availability =
    JSON.parse(
      localStorage.getItem(
        "doctorAvailability"
      )
    ) || [];
    console.log("Selected Doctor:", doctorId);
console.log("Availability:", availability);

  const handleBooking = () => {

    const patientName =
      localStorage.getItem(
        "patientName"
      );

    const selectedDoctor =
      doctors.find(
        (doctor) =>
          doctor.doctorId ===
          doctorId
      );

    if (!selectedDoctor) {
      alert(
        "Select a doctor."
      );
      return;
    }

    if (!date || !time) {
      alert(
        "Please select an available slot."
      );
      return;
    }

    const appointments =
      JSON.parse(
        localStorage.getItem(
          "appointments"
        )
      ) || [];

    appointments.push({

      appointmentId:
        `APT${Date.now()}`,

      patientName,

      doctorName:
        selectedDoctor.name,

      doctorId:
        selectedDoctor.doctorId,

      specialization:
        selectedDoctor.specialization,

      date,

      time,

      status:
        "Pending",

      bookedAt:
        new Date().toLocaleString(),

      queueNumber:
        appointments.length + 1,

      estimatedWait:
        (
          appointments.length + 1
        ) * 10,

    });

    localStorage.setItem(
      "appointments",
      JSON.stringify(
        appointments
      )
    );

    const updatedAvailability =
      availability.filter(
        (slot) =>
          !(
            slot.doctorId ===
              doctorId &&
            slot.date ===
              date &&
            slot.time ===
              time
          )
      );

    localStorage.setItem(
      "doctorAvailability",
      JSON.stringify(
        updatedAvailability
      )
    );

    alert(
      "Appointment booked successfully."
    );

    setDate("");
    setTime("");
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
        padding: "30px",
      }}
    >

      <div
  style={{
    marginBottom: "45px",
  }}
>
  <h1
  style={{
    color: "white",
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "14px",
    lineHeight: "1.2",
  }}
>
    📅 Book Appointment
  </h1>

  <p
  style={{
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "35px",
  }}
>
    Schedule consultations with healthcare specialists.
  </p>
</div>

      {
        referredDoctorId && (

          <div
            style={{
              background:
                "#eff6ff",
              border:
                "1px solid #60a5fa",
              padding:
                "15px",
              borderRadius:
                "10px",
              marginBottom:
                "20px",
            }}
          >

            <strong>
              Specialist Referral
            </strong>

            <p>
              Recommended Specialist:
              {" "}
              {
                localStorage.getItem(
                  "referredDoctorName"
                )
              }
            </p>

          </div>

        )
      }

     <select
  value={doctorId}
  onChange={(e) => {
    setDoctorId(e.target.value);
    setDate("");
    setTime("");
  }}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "16px",
    borderRadius: "14px",
    background: "#0f172a",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    marginBottom: "30px",
  }}
>
        <option value="">
          Select Doctor
        </option>

        {
          doctors.map(
            (doctor) => (

              <option
                key={
                  doctor.doctorId
                }
                value={
                  doctor.doctorId
                }
              >
                {doctor.name}
                {" "}
                (
                {
                  doctor.specialization
                }
                )
              </option>

            )
          )
        }
      </select>

        {
  doctorId &&
  (() => {
    const doctor =
      doctors.find(
        (doctor) =>
          doctor.doctorId === doctorId
      );

    return (
      <div
        style={{
          background: "#0f172a",

          borderRadius: "20px",

          padding: "25px",

          marginBottom: "25px",

          border:
            "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div>
            <h2
              style={{
                color: "white",
                marginBottom: "8px",
              }}
            >
              {doctor.name}
            </h2>

            <p
              style={{
                color: "#60a5fa",
              }}
            >
              {doctor.specialization}
            </p>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              🏥 {doctor.hospital}
            </p>
          </div>
        </div>
      </div>
    );
  })()
}

      <br />
      <br />

      <div
  style={{
    background: "#0f172a",

    borderRadius: "24px",

    padding: "25px",

    marginBottom: "25px",

    border:
      "1px solid rgba(255,255,255,0.05)",
  }}
>
  <h3
    style={{
      color: "white",
      marginBottom: "20px",
    }}
  >
    🕒 Available Slots
  </h3>
  </div>

      {
        doctorId === "" ? (

          <p
  style={{
    color: "#94a3b8",
  }}
>
  👨‍⚕ Select a doctor to view available slots.
</p>

        ) : (

          availability.filter(
            (slot) =>
              slot.doctorId ===
              doctorId
          ).length === 0 ? (

            <p>
              No available slots.
            </p>

          ) : (

            availability
              .filter(
                (slot) =>
                  slot.doctorId ===
                  doctorId
              )
              .map(
                (
                  slot,
                  index
                ) => (

                  <button
                    key={index}
                    style={{
  margin: "8px",

  padding: "12px 18px",

  background:
    date === slot.date &&
    time === slot.time
      ? "linear-gradient(90deg,#2563eb,#7c3aed)"
      : "#111827",

  color: "white",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "12px",

  cursor: "pointer",
}}
                    onClick={() => {

                      setDate(
                        slot.date
                      );

                      setTime(
                        slot.time
                      );

                    }}
                  >
                    {slot.date}
                    {" "}
                    |
                    {" "}
                    {slot.time}
                  </button>

                )
              )

          )

        )
      }

      {
        date &&
        time && (

          <div
            style={{
              marginTop:
                "20px",
              padding:
                "15px",
              background: "#0f172a",

              border:
              "1px solid rgba(255,255,255,0.05)",

              color: "white",
              borderRadius:
                "10px",
            }}
          >

            <strong>
              Selected Slot
            </strong>

            <p>
              {date}
              {" "}
              |
              {" "}
              {time}
            </p>

          </div>

        )
      }

      <br />

<button
  disabled={!date || !time}
  onClick={handleBooking}
  style={{
    marginTop: "20px",

    padding: "16px 30px",

    background:
      "linear-gradient(90deg,#2563eb,#7c3aed)",

    color: "white",

    border: "none",

    borderRadius: "14px",

    fontSize: "16px",

    fontWeight: "700",

    cursor: "pointer",
    opacity:
  !date || !time
    ? 0.5
    : 1,
  }}
>
  📅 Confirm Appointment
</button>

    </div>
    </div>
  );
}

export default BookAppointment;