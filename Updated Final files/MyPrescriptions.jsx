import Sidebar from "../components/Sidebar";
import { jsPDF } from "jspdf";
function MyPrescriptions() {

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const prescriptions =
    JSON.parse(
      localStorage.getItem(
        "prescriptions"
      )
    ) || [];

  const myPrescriptions =
    prescriptions.filter(
      (prescription) =>
        prescription.patient ===
        patientName
    );
const downloadPrescription = (
  prescription
) => {

  const pdf = new jsPDF();

  pdf.setFontSize(18);

  pdf.text(
    "Digital Healthcare Prescription",
    20,
    20
  );

  pdf.setFontSize(12);

  pdf.text(
    `Doctor: ${prescription.doctor}`,
    20,
    40
  );

  pdf.text(
    `Diagnosis: ${prescription.diagnosis}`,
    20,
    55
  );

  pdf.text(
  `Medicines: ${prescription.medicines}`,
  20,
  70
);

pdf.text(
  `Medication Time: ${
    prescription.medicationTime || "N/A"
  }`,
  20,
  85
);

pdf.text(
  `Duration: ${
    prescription.duration || "N/A"
  } days`,
  20,
  100
);

pdf.text(
  `Instructions: ${prescription.instructions}`,
  20,
  115
);

pdf.text(
  `Follow Up: ${prescription.followUp}`,
  20,
  130
);

pdf.text(
  `Created: ${prescription.createdAt}`,
  20,
  145
);
  pdf.save(
    "Prescription.pdf"
  );
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
          My Prescriptions
        </h1>

        {myPrescriptions.length === 0 ? (

          <p>
            No prescriptions found.
          </p>

        ) : (

          myPrescriptions.map(
            (
              prescription,
              index
            ) => (

              <div
                key={index}
                style={{
                  border:
                    "1px solid #ccc",
                  padding:
                    "15px",
                  marginBottom:
                    "15px",
                  borderRadius:
                    "10px",
                }}
              >
                <p>
                  Doctor:
                  {" "}
                  {
                    prescription.doctor
                  }
                </p>

                <p>
                  Diagnosis:
                  {" "}
                  {
                    prescription.diagnosis
                  }
                </p>

                <p>
                  Medicines:
                  {" "}
                  {
                    prescription.medicines
                  }
                </p>
<p>
  Medication Time:
  {" "}
  {
    prescription.medicationTime ||
    "Not Specified"
  }
</p>

<p>
  Duration:
  {" "}
  {
    prescription.duration ||
    "Not Specified"
  }
  {" "}
  days
</p>
                <p>
                  Instructions:
                  {" "}
                  {
                    prescription.instructions
                  }
                </p>

                <p>
                  Follow Up:
                  {" "}
                  {
                    prescription.followUp
                  }
                </p>

                <p>
                  Created:
                  {" "}
                  {
                    prescription.createdAt
                  }
                </p>
                <button
  onClick={() =>
    downloadPrescription(
      prescription
    )
  }
  style={{
    marginTop: "10px",
    padding: "8px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Download PDF
</button>
              </div>
            )
          )

        )}
      </div>
    </div>
  );
}

export default MyPrescriptions;