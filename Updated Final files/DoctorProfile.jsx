import { useParams } from "react-router-dom";
import doctors from "../data/doctors";
import Sidebar from "../components/Sidebar";

function DoctorProfile() {

  const { doctorId } =
    useParams();

  const doctor =
    doctors.find(
      (doctor) =>
        doctor.doctorId ===
        doctorId
    );

  if (!doctor) {
    return (
      <h1>
        Doctor Not Found
      </h1>
    );
  }

  const reviews =
    JSON.parse(
      localStorage.getItem(
        "doctorReviews"
      )
    ) || [];

  const doctorReviews =
    reviews.filter(
      (review) =>
        review.doctorId ===
        doctor.doctorId
    );
const statuses =
  JSON.parse(
    localStorage.getItem(
      "doctorStatuses"
    )
  ) || {};

const doctorStatus =
  statuses[
    doctor.doctorId
  ] || "Online";
  const averageRating =

    doctorReviews.length === 0

      ? 0

      : (

          doctorReviews.reduce(
            (
              total,
              review
            ) =>
              total +
              review.rating,
            0
          ) /

          doctorReviews.length

        ).toFixed(1);

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
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      color: "white",
      fontSize: "40px",
      fontWeight: "800",
      marginBottom: "8px",
    }}
  >
    👨‍⚕ Doctor Profile
  </h1>

  <p
    style={{
      color: "#94a3b8",
      fontSize: "15px",
    }}
  >
    View doctor information, qualifications and patient reviews.
  </p>
</div>
      
      <div
  style={{
    background: "#0f172a",
    borderRadius: "24px",
    padding: "30px",

    border:
      "1px solid rgba(255,255,255,0.05)",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.25)",

    marginBottom: "25px",
  }}
>
        <div
  style={{
    display: "flex",
    gap: "30px",
    alignItems: "center",
  }}
>
  <img
    src={doctor.image}
    alt={doctor.name}
    style={{
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      border:
        "4px solid rgba(59,130,246,0.4)",
    }}
  />

  <div>
    <h1
      style={{
        color: "white",
        fontSize: "42px",
        marginBottom: "12px",
      }}
    >
      {doctor.name}
    </h1>

    <div
      style={{
        display: "inline-block",
        background:
          doctorStatus ===
          "In Consultation"
            ? "rgba(250,204,21,0.15)"
            : "rgba(34,197,94,0.15)",

        color:
          doctorStatus ===
          "In Consultation"
            ? "#facc15"
            : "#22c55e",

        padding: "8px 14px",
        borderRadius: "999px",
        fontWeight: "600",
      }}
    >
      {doctorStatus ===
      "In Consultation"
        ? "🟡 In Consultation"
        : "🟢 Online"}
  </div>
</div>
        </div>

        <div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      background: "#0f172a",
      padding: "15px 20px",
      borderRadius: "16px",
      border:
        "1px solid rgba(255,255,255,0.05)",
    }}
  >
    ⭐ {averageRating}
  </div>

  <div
    style={{
      background: "#0f172a",
      padding: "15px 20px",
      borderRadius: "16px",
      border:
        "1px solid rgba(255,255,255,0.05)",
    }}
  >
    📝 {doctorReviews.length} Reviews
  </div>

  <div
    style={{
      background: "#0f172a",
      padding: "15px 20px",
      borderRadius: "16px",
      border:
        "1px solid rgba(255,255,255,0.05)",
    }}
  >
    🏆 {doctor.experience} Years
  </div>
</div>

        <p>
          <strong>
             🩺Specialization:
          </strong>{" "}
          {doctor.specialization}
        </p>

        <p>
          <strong>
            🎓Qualification:
          </strong>{" "}
          {doctor.qualification}
        </p>

        <p>
          <strong>
            🏥Hospital:
          </strong>{" "}
          {doctor.hospital}
        </p>

        <p>
          <strong>
            📹Consultation:
          </strong>{" "}
          {doctor.consultationMode}
        </p>

        <p>
          <strong>
            About:
          </strong>
        </p>

        <p>
          {doctor.bio}
        </p>
        </div>

        <div
  style={{
    background: "#0f172a",

    borderRadius: "24px",

    padding: "25px",

    marginTop: "25px",

    border:
      "1px solid rgba(255,255,255,0.05)",
  }}
>
  <h2
    style={{
      color: "white",
      marginBottom: "20px",
    }}
  >
    ⭐ Patient Reviews
  </h2>
  </div>

        {
          doctorReviews.length === 0 ? (

            <p>
              No reviews yet.
            </p>

          ) : (

            doctorReviews.map(
              (
                review,
                index
              ) => (

                <div
                  key={index}
                  style={{
  background: "#111827",

  borderRadius: "16px",

  padding: "18px",

  marginBottom: "15px",

  border:
    "1px solid rgba(255,255,255,0.05)",
}}
                >

                  <p>
                    ⭐
                    {review.rating}
                    /5
                  </p>

                  <p>
                    {review.review}
                  </p>

                  <small>
                    Patient:
                    {" "}
                    {review.patient}
                  </small>

                  <br />

                  <small>
                    {review.createdAt}
                  </small>

                </div>

              )
            )

          )
        }

      </div>
    </div>
  );
}

export default DoctorProfile;