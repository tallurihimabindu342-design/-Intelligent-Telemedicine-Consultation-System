import Sidebar from "../components/Sidebar";

function HealthDashboard() {

  const patientName =
    localStorage.getItem(
      "patientName"
    );

  const appointments =
    JSON.parse(
      localStorage.getItem(
        "appointments"
      )
    ) || [];

  const reports =
    JSON.parse(
      localStorage.getItem(
        "medicalReports"
      )
    ) || [];

  const prescriptions =
    JSON.parse(
      localStorage.getItem(
        "prescriptions"
      )
    ) || [];

  const consultations =
    JSON.parse(
      localStorage.getItem(
        "consultationHistory"
      )
    ) || [];

  const referrals =
    JSON.parse(
      localStorage.getItem(
        "referrals"
      )
    ) || [];
    const vitals =
  JSON.parse(
    localStorage.getItem(
      "healthVitals"
    )
  ) || [];
  const myVitals =
  vitals.filter(
    (vital) =>
      vital.patientName ===
      patientName
  );

const latestVitals =
  myVitals[
    myVitals.length - 1
  ];

  const myAppointments =
    appointments.filter(
      (appointment) =>
        appointment.patientName ===
        patientName
    );

  const myReports =
    reports.filter(
      (report) =>
        report.patientName ===
        patientName
    );

  const myPrescriptions =
    prescriptions.filter(
      (prescription) =>
        prescription.patient ===
        patientName
    );

  const myConsultations =
    consultations.filter(
      (consultation) =>
        consultation.patient ===
        patientName
    );

  const myReferrals =
    referrals.filter(
      (referral) =>
        referral.patientName ===
        patientName
    );
const medicationLogs =
  JSON.parse(
    localStorage.getItem(
      "medicationLogs"
    )
  ) || [];

const patientLogs =
  medicationLogs.filter(
    (log) =>
      log.patient ===
      patientName
  );

const adherenceScore =

  myPrescriptions.length === 0

    ? 0

    : Math.round(
        (
          patientLogs.length /
          myPrescriptions.length
        ) * 100
      );

const completedAppointments =
  myAppointments.filter(
    (appointment) =>
      appointment.status ===
      "Completed"
  ).length;

const recoveryScore =

  Math.min(
    100,

    Math.round(
      (
        adherenceScore * 0.6
      ) +

      (
        completedAppointments *
        10
      )
    )
  );

const patientRisk =
  localStorage.getItem(
    "patientRisk"
  ) || "Unknown";
  const latestSugar =
  Number(
    latestVitals?.sugar || 0
  );

const latestWeight =
  Number(
    latestVitals?.weight || 0
  );

const latestSpo2 =
  Number(
    latestVitals?.spo2 || 100
  );
const sleepHours =
  Number(
    latestVitals?.sleepHours || 0
  );

const exerciseMinutes =
  Number(
    latestVitals?.exerciseMinutes || 0
  );

const waterIntake =
  Number(
    latestVitals?.waterIntake || 0
  );
let diabetesRisk = 10;

let hypertensionRisk = 10;

let lifestyleRisk = 10;

let fallRisk = 5;

if (latestSugar > 140)
  diabetesRisk += 40;

if (latestWeight > 80)
  lifestyleRisk += 25;

if (latestSpo2 < 95)
  lifestyleRisk += 20;
if (
  sleepHours < 6
)
  lifestyleRisk += 15;

if (
  exerciseMinutes < 20
)
  lifestyleRisk += 15;

if (
  waterIntake < 2
)
  lifestyleRisk += 10;


const systolicBP =
  Number(
    latestVitals?.bp
      ?.split("/")
      [0] || 0
  );

if (
  systolicBP >= 140
)
  hypertensionRisk += 40;

diabetesRisk =
  Math.min(
    diabetesRisk,
    100
  );

hypertensionRisk =
  Math.min(
    hypertensionRisk,
    100
  );
if (
  latestWeight > 90
)
  fallRisk += 20;

if (
  exerciseMinutes < 10
)
  fallRisk += 20;

if (
  latestSpo2 < 92
)
  fallRisk += 15;

fallRisk =
  Math.min(
    fallRisk,
    100
  );
lifestyleRisk =
  Math.min(
    lifestyleRisk,
    100
  );
  const healthScore =

  Math.round(

    100 -

    (
      diabetesRisk +
      hypertensionRisk +
      lifestyleRisk +
      fallRisk
    ) / 4

  );
  const recommendations = [];
if (
  currentSteps < 3000
) {

  recommendations.push(
    "Increase daily walking activity"
  );

}

if (
  sleepHours >= 8
) {

  recommendations.push(
    "Excellent sleep consistency"
  );

}

if (
  waterIntake >= 2.5
) {

  recommendations.push(
    "Hydration goals achieved"
  );

}
if (latestSugar > 140) {

  recommendations.push(
    "Reduce sugar intake today"
  );

  recommendations.push(
    "Walk at least 30 minutes"
  );

}

if (latestWeight > 80) {

  recommendations.push(
    "Maintain calorie deficit"
  );

}
  if (
  sleepHours < 6
) {

  recommendations.push(
    "Increase sleep duration"
  );

}

if (
  exerciseMinutes < 20
) {

  recommendations.push(
    "Increase daily exercise"
  );

}

if (
  waterIntake < 2
) {

  recommendations.push(
    "Drink more water"
  );

}
if (latestSpo2 < 95) {

  recommendations.push(
    "Monitor oxygen levels"
  );

}

if (
  adherenceScore < 70
) {

  recommendations.push(
    "Medication adherence needs improvement"
  );

}

if (
  myConsultations.length > 3
) {

  recommendations.push(
    "Continue follow-up care plan"
  );

}

if (
  myPrescriptions.length > 0
) {

  recommendations.push(
    "Review current prescriptions regularly"
  );

}
let dailyGuidance =
  "Maintain healthy lifestyle.";

if (
  latestSugar > 140
) {

  dailyGuidance =
    "Focus on reducing sugar intake and increasing physical activity today.";

}
else if (
  latestWeight > 80
) {

  dailyGuidance =
    "Focus on weight management and balanced meals today.";

}
else if (
  adherenceScore < 70
) {

  dailyGuidance =
    "Prioritize medication adherence today.";

}

const dailyStepsGoal = 5000;

const currentSteps =
  Number(
    latestVitals?.steps || 0
  );

const stepsRemaining =
  Math.max(
    0,
    dailyStepsGoal -
      currentSteps
  );
const goalCompletion =
  Math.round(
    (
      currentSteps /
      dailyStepsGoal
    ) * 100
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
          Personal Health Dashboard
        </h1>
        <div
  style={{
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
  }}
>

  <h2>
    Health Assistant
  </h2>
<p>
  Today's Guidance:
</p>

<p
  style={{
    color: "#2563eb",
    fontWeight: "bold",
  }}
>
  {dailyGuidance}
</p>
  <p>
    Diabetes Risk:
    {" "}
    <strong>
      {diabetesRisk}%
    </strong>
  </p>

  <p>
    Hypertension Risk:
    {" "}
    <strong>
      {hypertensionRisk}%
    </strong>
  </p>

  <p>
    Lifestyle Risk:
    {" "}
    <strong>
      {lifestyleRisk}%
    </strong>
  </p>
<p>
  Fall Risk:
  {" "}
  <strong>
    {fallRisk}%
  </strong>
</p>
<p>
  Health Score:
  {" "}
  <strong>
    {healthScore}%
  </strong>
</p>
{
  healthScore >= 80 ? (

    <p>
      🟢 Excellent Health
    </p>

  ) : healthScore >= 60 ? (

    <p>
      🟡 Moderate Health
    </p>

  ) : (

    <p>
      🔴 Needs Attention
    </p>

  )
}
</div>
        
<div
  style={{
    background:
      "#eff6ff",
    padding:
      "20px",
    borderRadius:
      "12px",
    marginBottom:
      "25px",
  }}
>

  <h2>
    Recovery Overview
  </h2>
  <div
  style={{
    background: "#fef9c3",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
  }}
>

  <h3>
    Today's Guidance
  </h3>

  <p>
    {dailyGuidance}
  </p>

</div>

  <p>
  Recovery Score:
  {" "}
  <strong>
    {recoveryScore}%
  </strong>
</p>

{
  recoveryScore >= 80 ? (

    <p>
      🟢 Excellent Progress
    </p>

  ) : recoveryScore >= 50 ? (

    <p>
      🟡 Moderate Progress
    </p>

  ) : (

    <p>
      🔴 Needs Attention
    </p>

  )
}
  <p>
    Medication Adherence:
    {" "}
    <strong>
      {adherenceScore}%
    </strong>
  </p>

  <p>
    Risk Level:
    {" "}
    <strong>
      {patientRisk}
    </strong>
  </p>
<hr />

<h3>
  Recommendations
</h3>

{
  recommendations.length === 0 ? (

    <p>
      No recommendations.
    </p>

  ) : (

    recommendations.map(
      (
        recommendation,
        index
      ) => (

        <p
          key={index}
        >
          ✓
          {" "}
          {recommendation}
        </p>

      )
    )

  )
}
</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "15px",
          }}
        >

          <div>
            <h3>
              Appointments
            </h3>
            <p>
              {
                myAppointments.length
              }
            </p>
          </div>

          <div>
            <h3>
              Consultations
            </h3>
            <p>
              {
                myConsultations.length
              }
            </p>
          </div>

          <div>
            <h3>
              Reports
            </h3>
            <p>
              {
                myReports.length
              }
            </p>
          </div>

          <div>
            <h3>
              Prescriptions
            </h3>
            <p>
              {
                myPrescriptions.length
              }
            </p>
          </div>

          <div>
            <h3>
              Referrals
            </h3>
            <p>
              {
                myReferrals.length
              }
            </p>
          </div>

          <div>
            <h3>
              Upcoming
            </h3>
            <p>
              {
                myAppointments.filter(
                  (appointment) =>
                    appointment.status !==
                    "Completed"
                ).length
              }
            </p>
            
          </div>

        </div>
        <div
  style={{
    background: "#ecfdf5",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "25px",
    marginBottom: "25px",
  }}
>

  <h2>
    Wellness Goal Tracker
  </h2>

  <p>
    Daily Steps Goal:
    {" "}
    {dailyStepsGoal}
  </p>

  <p>
    Current Steps:
    {" "}
    {currentSteps}
  </p>

  <p>
    Remaining:
    {" "}
    {stepsRemaining}
  </p>

  <p>
    Goal Completion:
    {" "}
    {goalCompletion}%
  </p>

</div>
        <h2
  style={{
    marginTop: "30px",
  }}
>
  Latest Vitals
</h2>

{
  latestVitals ? (

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >

      <p>
        ❤️ BP:
        {" "}
        {latestVitals.bp}
      </p>

      <p>
        💓 Pulse:
        {" "}
        {latestVitals.pulse}
      </p>

      <p>
        🫁 SpO2:
        {" "}
        {latestVitals.spo2}
      </p>

      <p>
        🌡 Temperature:
        {" "}
        {latestVitals.temperature}
      </p>

      <p>
        🍬 Sugar:
        {" "}
        {latestVitals.sugar}
      </p>

      <p>
        ⚖️ Weight:
        {" "}
        {latestVitals.weight}
      </p>
<p>
  😴 Sleep:
  {" "}
  {
    latestVitals.sleepHours
  }
  hrs
</p>

<p>
  💧 Water:
  {" "}
  {
    latestVitals.waterIntake
  }
  L
</p>

<p>
  🏃 Exercise:
  {" "}
  {
    latestVitals.exerciseMinutes
  }
  min
</p>

<p>
  👣 Steps:
  {" "}
  {
    latestVitals.steps
  }
</p>
    </div>

  ) : (

    <p>
      No vitals recorded.
    </p>

  )
}
<h2
  style={{
    marginTop: "30px",
  }}
>
  Current Treatment Plan
</h2>

{
  myPrescriptions.length === 0 ? (

    <p>
      No active prescriptions.
    </p>

  ) : (

    myPrescriptions
      .slice(-1)
      .map(
        (
          prescription,
          index
        ) => (

          <div
            key={index}
            style={{
              background: "#f0fdf4",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          >

            <p>
              Medicines:
              {" "}
              {
                prescription.medicines
              }
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

          </div>

        )
      )

  )
}
      </div>
    </div>
  );
}

export default HealthDashboard;