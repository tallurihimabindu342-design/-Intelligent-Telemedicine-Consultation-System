import { useState } from "react";
import doctors from "../data/doctors";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
function DoctorsDirectory() {

  const [searchDoctor, setSearchDoctor] =
    useState("");
const navigate = useNavigate();
  const filteredDoctors =
    doctors.filter(
      (doctor) =>
        doctor.name
          .toLowerCase()
          .includes(
            searchDoctor.toLowerCase()
          ) ||
        doctor.specialization
          .toLowerCase()
          .includes(
            searchDoctor.toLowerCase()
          )
    );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <Sidebar role="Patient" />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            marginBottom: "20px",
          }}
        >
          Find Doctors
        </h1>

        <input
          type="text"
          placeholder="Search Doctor or Specialization"
          value={searchDoctor}
          onChange={(e) =>
            setSearchDoctor(
              e.target.value
            )
          }
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "14px",
            borderRadius: "10px",
            border:
              "1px solid #cbd5e1",
            marginBottom: "30px",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(320px,1fr))",
            gap: "20px",
          }}
        >
          {filteredDoctors.map(
            (doctor) => (
              <div
                key={doctor.doctorId}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                    marginBottom:
                      "15px",
                  }}
                />

                <h2>
                  {doctor.name}
                </h2>

                <p>
                  <strong>
                    Specialization:
                  </strong>{" "}
                  {
                    doctor.specialization
                  }
                </p>

                <p>
                  <strong>
                    Qualification:
                  </strong>{" "}
                  {
                    doctor.qualification
                  }
                </p>

                <p>
                  <strong>
                    Experience:
                  </strong>{" "}
                  {
                    doctor.experience
                  }{" "}
                  Years
                </p>

                <p>
                  <strong>
                    Rating:
                  </strong>{" "}
                  ⭐
                  {doctor.rating}
                  {" ("}
                  {
                    doctor.totalReviews
                  }
                  {" Reviews)"}
                </p>

                <p>
                  <strong>
                    Consultation:
                  </strong>{" "}
                  {
                    doctor.consultationMode
                  }
                </p>

                <p>
                  <strong>
                    Hospital:
                  </strong>{" "}
                  {
                    doctor.hospital
                  }
                </p>

                <p>
  {doctor.bio}
</p>

<button
  onClick={() =>
    navigate(
      `/doctor-profile/${doctor.doctorId}`
    )
  }
  style={{
    marginTop: "15px",
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  View Profile
</button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorsDirectory;