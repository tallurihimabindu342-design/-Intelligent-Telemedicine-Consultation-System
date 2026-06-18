function AdminDoctorRequests() {

  const requests =
    JSON.parse(
      localStorage.getItem(
        "doctorRequests"
      )
    ) || [];
const updateRequestStatus = (
  requestIndex,
  newStatus
) => {

  const requests =
    JSON.parse(
      localStorage.getItem(
        "doctorRequests"
      )
    ) || [];

  requests[requestIndex].status =
    newStatus;

  // If approved, add to approved doctors
  if (newStatus === "Approved") {

    const approvedDoctors =
      JSON.parse(
        localStorage.getItem(
          "approvedDoctors"
        )
      ) || [];

    approvedDoctors.push({
  name:
    requests[requestIndex].fullName,

  doctorId:
    requests[requestIndex].doctorId,

  specialization:
    requests[requestIndex].specialization,

  password:
    requests[requestIndex].password,

  email:
    requests[requestIndex].email,

  phone:
    requests[requestIndex].phone,
});

    localStorage.setItem(
      "approvedDoctors",
      JSON.stringify(
        approvedDoctors
      )
    );
  }

  localStorage.setItem(
    "doctorRequests",
    JSON.stringify(requests)
  );

  window.location.reload();
};
  return (
    <div style={{ padding: "30px" }}>
      <h1>
        Doctor Registration Requests
      </h1>

      {requests.map(
        (request, index) => (
          <div
            key={index}
            style={{
              border:
                "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <p>
              Name:
              {request.fullName}
            </p>

            <p>
              Specialization:
              {request.specialization}
            </p>

            <p>
              Status:
              {request.status}
            </p>
            {request.status === "Pending" && (
  <div
    style={{
      marginTop: "10px",
    }}
  >
    <button
      onClick={() =>
        updateRequestStatus(
          index,
          "Approved"
        )
      }
      style={{
        marginRight: "10px",
      }}
    >
      Approve
    </button>

    <button
      onClick={() =>
        updateRequestStatus(
          index,
          "Rejected"
        )
      }
    >
      Reject
    </button>
  </div>
)}
          </div>
        )
      )}
    </div>
  );
}

export default AdminDoctorRequests;