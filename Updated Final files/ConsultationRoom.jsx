import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
function ConsultationRoom() {

  const [notes, setNotes] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [seconds, setSeconds] =
    useState(0);
    const [isMuted, setIsMuted] =
  useState(false);

const [cameraOn, setCameraOn] =
  useState(true);
const [
  selectedReport,
  setSelectedReport
] = useState(null);
    const navigate =
  useNavigate();
const reports =
  JSON.parse(
    localStorage.getItem(
      "medicalReports"
    )
  ) || [];
  const symptoms =
  JSON.parse(
    localStorage.getItem(
      "bodySymptoms"
    )
  ) || [];

const patientName =
  localStorage.getItem(
    "patientName"
  );

const patientSymptoms =
  symptoms.filter(
    (symptom) =>
      symptom.patientName ===
      patientName
  );

const latestSymptom =
  patientSymptoms[
    patientSymptoms.length - 1
  ];
  useEffect(() => {

    const timer =
      setInterval(() => {

        setSeconds(
          (prev) => prev + 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  const sendMessage = () => {

    if (!message) return;

    setChat([
      ...chat,
      {
        sender: "Doctor",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar role="Doctor" />

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>
          Consultation Room
        </h1>
<div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  }}
>
{
  latestSymptom && (

    <div
      style={{
        background:
          "#fef3c7",
        padding:
          "15px",
        borderRadius:
          "10px",
        marginBottom:
          "20px",
      }}
    >

      <h3>
        🩺 Patient Symptom Summary
      </h3>

      <p>
        Body Part:
        {" "}
        {
          latestSymptom.bodyPart
        }
      </p>

      <p>
        Symptom:
        {" "}
        {
          latestSymptom.symptomType
        }
      </p>

      <p>
        Severity:
        {" "}
        {
          latestSymptom.severity
        }
        /10
      </p>

      <p>
        Description:
        {" "}
        {
          latestSymptom.description
        }
      </p>

    </div>

  )
}
  {/* Video Area */}
  <div
    style={{
      flex: 2,
      height: "250px",
      background: "#111827",
      color: "white",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "22px",
    }}
  >
    📹 Doctor - Patient Consultation
  </div>

  {/* Report Preview */}
  <div
    style={{
      flex: 1,
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "10px",
      overflow: "auto",
    }}
  >

    <h4>
      Report Preview
    </h4>

    {!selectedReport && (
      <p>
        Select a report to preview.
      </p>
    )}

    {
      selectedReport?.fileType?.includes(
        "image"
      ) && (

        <img
          src={
            selectedReport.fileData
          }
          alt="report"
          style={{
            width: "100%",
            borderRadius: "8px",
          }}
        />

      )
    }

    {
      selectedReport?.fileType?.includes(
        "pdf"
      ) && (

        <a
          href={
            selectedReport.fileData
          }
          target="_blank"
        >
          Open PDF
        </a>

      )
    }

  </div>

</div>
        <h3>
          Duration:
          {seconds}
          sec
        </h3>
<div
  style={{
    marginBottom: "20px",
  }}
>
  <button
    onClick={() =>
      setIsMuted(
        !isMuted
      )
    }
  >
    {isMuted
      ? "🎤 Unmute"
      : "🎤 Mute"}
  </button>

  <button
    onClick={() =>
      setCameraOn(
        !cameraOn
      )
    }
    style={{
      marginLeft: "10px",
    }}
  >
    {cameraOn
      ? "📷 Camera Off"
      : "📷 Camera On"}
  </button>
</div>
        <hr />
<h2>
  Patient Reports
</h2>

{
  reports.length === 0 ? (

    <p>
      No reports uploaded.
    </p>

  ) : (

    reports.map(
      (
        report,
        index
      ) => (

        <div
          key={index}
          style={{
            border:
              "1px solid #ccc",
            padding:
              "10px",
            marginBottom:
              "10px",
          }}
        >
          <p>
            {
              report.reportName
            }
          </p>

          <p>
            {
              report.uploadedAt
            }
          </p>
          <button
  onClick={() =>
    setSelectedReport(
      report
    )
  }
>
  View Report
</button>
        </div>

      )
    )

  )
}

        <h2>
          Doctor Notes
        </h2>

        <textarea
          rows="6"
          cols="60"
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <h2>
          Chat
        </h2>

        {
          chat.map(
            (msg, index) => (

              <p
                key={index}
              >
                <strong>
                  {
                    msg.sender
                  }
                </strong>
                :
                {msg.text}
              </p>

            )
          )
        }

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          placeholder="Type Message"
        />

        <button
          onClick={
            sendMessage
          }
        >
          Send
        </button>

        <br />
        <br />

<button
  style={{
    background: "red",
    color: "white",
    padding: "10px",
  }}
  onClick={() => {

    const consultationHistory =
      JSON.parse(
        localStorage.getItem(
          "consultationHistory"
        )
      ) || [];

    consultationHistory.push({

      patient:
        localStorage.getItem(
          "patientName"
        ),

      doctor:
        localStorage.getItem(
          "currentDoctor"
        ),

      notes,

      duration:
        seconds,

      date:
        new Date().toLocaleString(),

      appointmentId:
        localStorage.getItem(
          "selectedAppointment"
        ),
symptomType:
  latestSymptom
    ?.symptomType,

bodyPart:
  latestSymptom
    ?.bodyPart,

severity:
  latestSymptom
    ?.severity,

symptomDescription:
  latestSymptom
    ?.description,
    });

    localStorage.setItem(
      "consultationHistory",
      JSON.stringify(
        consultationHistory
      )
    );

    localStorage.setItem(
      "consultationSummary",

      JSON.stringify({

        patient:
          localStorage.getItem(
            "patientName"
          ),

        doctor:
          localStorage.getItem(
            "currentDoctor"
          ),

        notes,

        duration:
          seconds,

        followUp:
          "Follow-up if symptoms persist",

        date:
          new Date().toLocaleString(),

      })
    );
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
        localStorage.getItem(
          "selectedAppointment"
        )
      ) {

        return {

          ...appointment,

          status:
            "Completed",

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
    const notifications =
      JSON.parse(
        localStorage.getItem(
          "notifications"
        )
      ) || [];

    notifications.push({

      patientName:
        localStorage.getItem(
          "patientName"
        ),

      type:
        "Consultation",

      title:
        "Consultation Completed",

      message:
        "Your consultation has been completed. Consultation summary is now available.",

      createdAt:
        new Date().toLocaleString(),

    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(
        notifications
      )
    );

  const statuses =
  JSON.parse(
    localStorage.getItem(
      "doctorStatuses"
    )
  ) || {};

statuses[
  localStorage.getItem(
    "doctorId"
  )
] =
  "Online";

localStorage.setItem(
  "doctorStatuses",
  JSON.stringify(
    statuses
  )
);

    navigate(
      "/consultation-summary"
    );

  }}
>
  End Consultation
</button>

      </div>
    </div>
  );
}

export default ConsultationRoom;