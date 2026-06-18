function AdminAppointments() {

  const appointments =
    JSON.parse(
      localStorage.getItem(
        "appointments"
      )
    ) || [];

  return (
    <div style={{ padding: "30px" }}>
      <h1>
        All Appointments
      </h1>

      {appointments.map(
        (
          appointment,
          index
        ) => (
          <div
            key={index}
            style={{
              border:
                "1px solid #ccc",
              padding: "15px",
              marginBottom:
                "15px",
            }}
          >
            <p>
              {appointment.patientName}
            </p>

            <p>
              {
                appointment.doctorName
              }
            </p>

            <p>
              {appointment.date}
            </p>

            <p>
              {
                appointment.status
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default AdminAppointments;