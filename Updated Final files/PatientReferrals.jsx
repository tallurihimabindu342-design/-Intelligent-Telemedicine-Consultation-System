import Sidebar from "../components/Sidebar";
import doctors from "../data/doctors";

function PatientReferrals() {

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const referrals =
    JSON.parse(
      localStorage.getItem(
        "referrals"
      )
    ) || [];

  const myReferrals =
    referrals.filter(
      (referral) =>
        referral.patientName ===
        patientName
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
        }}
      >

        <h1>
          Specialist Referrals
        </h1>

        {
          myReferrals.length ===
          0 ? (

            <p>
              No referrals available.
            </p>

          ) : (

            myReferrals.map(
              (
                referral,
                index
              ) => {

                const matchingDoctors =
                  doctors.filter(
                    (doctor) =>
                      doctor.specialization
                        ?.toLowerCase()
                        .includes(
                          referral.specialization
                            .toLowerCase()
                        )
                  );

                return (

                  <div
                    key={index}
                    style={{
                      border:
                        "1px solid #ddd",
                      padding:
                        "20px",
                      marginBottom:
                        "20px",
                      borderRadius:
                        "12px",
                    }}
                  >

                    <h3>
                      Specialist Referral
                    </h3>

                    <p>
                      Doctor:
                      {" "}
                      {
                        referral.doctor
                      }
                    </p>

                    <p>
                      Specialization:
                      {" "}
                      {
                        referral.specialization
                      }
                    </p>

                    <p>
                      Reason:
                      {" "}
                      {
                        referral.reason
                      }
                    </p>

                    <p>
                      Urgency:
                      {" "}

                      <span
                        style={{
                          color:
                            referral.urgency ===
                            "High"
                              ? "red"
                              : referral.urgency ===
                                "Medium"
                              ? "orange"
                              : "green",

                          fontWeight:
                            "bold",
                        }}
                      >
                        {
                          referral.urgency
                        }
                      </span>

                    </p>

                    <p>
                      Created:
                      {" "}
                      {
                        referral.createdAt
                      }
                    </p>

                    <hr />

                    <h4>
                      Available Specialists
                    </h4>

                    {
                      matchingDoctors.length ===
                      0 ? (

                        <div
                          style={{
                            background:
                              "#fffbeb",
                            border:
                              "1px solid #f59e0b",
                            padding:
                              "15px",
                            borderRadius:
                              "10px",
                          }}
                        >

                          We currently do not
                          have specialists in
                          this field available
                          on our platform.

                        </div>

                      ) : (

                        matchingDoctors.map(
                          (
                            doctor,
                            doctorIndex
                          ) => (

                            <div
                              key={
                                doctorIndex
                              }
                              style={{
                                border:
                                  "1px solid #eee",
                                padding:
                                  "10px",
                                marginTop:
                                  "10px",
                                borderRadius:
                                  "8px",
                              }}
                            >

                              <p>
                                {
                                  doctor.name
                                }
                              </p>

                              <p>
                                {
                                  doctor.specialization
                                }
                              </p>

                              <p>
                                ID:
                                {" "}
                                {
                                  doctor.doctorId
                                }
                              </p>
<button
  onClick={() => {

    localStorage.setItem(
      "referredDoctorId",
      doctor.doctorId
    );

    localStorage.setItem(
      "referredDoctorName",
      doctor.name
    );

    window.location.href =
      "/book-appointment";

  }}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  Book Appointment
</button>


<button
  onClick={() =>
    window.location.href =
      `/doctor-profile/${doctor.doctorId}`
  }
  style={{
    marginLeft: "10px",
  }}
>
  View Profile
</button>
                            </div>

                          )
                        )

                      )
                    }

                  </div>

                );

              }
            )

          )
        }

      </div>

    </div>

  );
}

export default PatientReferrals;