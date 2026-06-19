import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Prescription() {
  const [diagnosis, setDiagnosis] =
    useState("");

  const [medicines, setMedicines] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [followUp, setFollowUp] =
    useState("");

  const [medicationTime,
    setMedicationTime] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const savePrescription = () => {
    const appointmentId =
      localStorage.getItem(
        "selectedAppointment"
      );

    const prescriptions =
      JSON.parse(
        localStorage.getItem(
          "prescriptions"
        )
      ) || [];

    prescriptions.push({
      appointmentId,

      doctor:
        localStorage.getItem(
          "currentDoctor"
        ),

      patient:
        localStorage.getItem(
          "selectedPatient"
        ),

      diagnosis,

      medicines,

      medicationTime,

      duration,

      instructions,

      followUp,

      createdAt:
        new Date().toLocaleString(),
    });

    localStorage.setItem(
      "prescriptions",
      JSON.stringify(
        prescriptions
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
          "selectedPatient"
        ),

      type:
        "Prescription",

      title:
        "New Prescription Issued",

      message:
        `Medication prescribed: ${medicines}. Please follow your doctor's instructions.`,

      createdAt:
        new Date().toLocaleString(),
    });

    if (followUp) {
      notifications.push({
        patientName:
          localStorage.getItem(
            "selectedPatient"
          ),

        type:
          "FollowUp",

        title:
          "Follow-Up Consultation Due",

        message:
          `A follow-up consultation has been recommended on ${followUp}. Please schedule your appointment to continue care.`,

        createdAt:
          new Date().toLocaleString(),
      });
    }

    localStorage.setItem(
      "notifications",
      JSON.stringify(
        notifications
      )
    );

    alert(
      "Prescription Saved Successfully"
    );

    setDiagnosis("");
    setMedicines("");
    setInstructions("");
    setFollowUp("");
    setMedicationTime("");
    setDuration("");
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
          Create Prescription
        </h1>

        <textarea
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) =>
            setDiagnosis(
              e.target.value
            )
          }
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <textarea
          placeholder="Medicines"
          value={medicines}
          onChange={(e) =>
            setMedicines(
              e.target.value
            )
          }
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) =>
            setInstructions(
              e.target.value
            )
          }
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
          }}
        />

        <br />
        <br />

        <label>
          Follow-Up Date
        </label>

        <br />
        <br />

        <input
          type="date"
          value={followUp}
          onChange={(e) =>
            setFollowUp(
              e.target.value
            )
          }
          style={{
            padding: "10px",
          }}
        />

        <br />
        <br />

        <label>
          Medication Time
        </label>

        <br />
        <br />

        <input
          type="time"
          value={medicationTime}
          onChange={(e) =>
            setMedicationTime(
              e.target.value
            )
          }
          style={{
            padding: "10px",
          }}
        />

        <br />
        <br />

        <label>
          Duration (Days)
        </label>

        <br />
        <br />

        <input
          type="number"
          value={duration}
          onChange={(e) =>
            setDuration(
              e.target.value
            )
          }
          style={{
            padding: "10px",
          }}
        />

        <br />
        <br />

        <button
          onClick={savePrescription}
          style={{
            background:
              "#2563eb",
            color: "white",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "8px",
            cursor: "pointer",
          }}
        >
          Save Prescription
        </button>
      </div>
    </div>
  );
}

export default Prescription;