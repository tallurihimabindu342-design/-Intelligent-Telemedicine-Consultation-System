import Sidebar from "../components/Sidebar";

function AppointmentRescheduler() {

  const cancelledAppointment =
    JSON.parse(
      localStorage.getItem(
        "cancelledAppointment"
      )
    );

  const availability =
    JSON.parse(
      localStorage.getItem(
        "doctorAvailability"
      )
    ) || [];

  if (!cancelledAppointment) {

    return (
      <div
        style={{
          padding: "30px",
        }}
      >
        No cancelled appointment found.
      </div>
    );

  }

  const availableSlots =
    availability.filter(
      (slot) =>
        slot.doctorId ===
        cancelledAppointment.doctorId
    );

  const rebookAppointment = (
    slot
  ) => {

    const appointments =
      JSON.parse(
        localStorage.getItem(
          "appointments"
        )
      ) || [];

    const updatedAppointments =
      appointments.map(
        (appointment) => {

          if (
            appointment.appointmentId ===
            cancelledAppointment.appointmentId
          ) {

            return {

              ...appointment,

              date:
                slot.date,

              time:
                slot.time,

              status:
                "Pending",

            };

          }

          return appointment;

        }
      );

    localStorage.setItem(
      "appointments",
      JSON.stringify(
        updatedAppointments
      )
    );

    localStorage.removeItem(
      "cancelledAppointment"
    );

    alert(
      "Appointment Rescheduled Successfully"
    );

    window.location.href =
      "/my-appointments";

  };

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
          Appointment Rescheduler
        </h1>

        <p>
          Doctor cancelled your appointment.
          Please select a new slot.
        </p>

        {
          availableSlots.map(
            (slot, index) => (

              <div
                key={index}
                style={{
                  border:
                    "1px solid #ccc",
                  padding:
                    "15px",
                  marginBottom:
                    "10px",
                  borderRadius:
                    "10px",
                }}
              >

                <p>
                  Date:
                  {" "}
                  {slot.date}
                </p>

                <p>
                  Time:
                  {" "}
                  {slot.time}
                </p>

                <button
                  onClick={() =>
                    rebookAppointment(
                      slot
                    )
                  }
                >
                  Rebook
                </button>

              </div>

            )
          )
        }

      </div>
    </div>
  );
}

export default AppointmentRescheduler;