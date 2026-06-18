import { useState } from "react";
import Sidebar from "../components/Sidebar";

function EmergencyAssessment() {

  const [chestPain, setChestPain] =
    useState(false);

  const [
    breathingDifficulty,
    setBreathingDifficulty,
  ] = useState(false);

  const [
    unconsciousness,
    setUnconsciousness,
  ] = useState(false);

  const [
    severeBleeding,
    setSevereBleeding,
  ] = useState(false);

  const [
    strokeSymptoms,
    setStrokeSymptoms,
  ] = useState(false);

  const analyzeEmergency = () => {

    let urgencyScore = 0;

    if (chestPain)
      urgencyScore += 30;

    if (breathingDifficulty)
      urgencyScore += 30;

    if (unconsciousness)
      urgencyScore += 40;

    if (severeBleeding)
      urgencyScore += 40;

    if (strokeSymptoms)
      urgencyScore += 50;

    localStorage.setItem(
      "urgencyScore",
      urgencyScore
    );

    if (urgencyScore >= 50) {

      alert(
        "Possible Medical Emergency. Please contact emergency services immediately."
      );

      return;
    }

    alert(
      "Urgent consultation recommended."
    );
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>
        Emergency Assessment
      </h1>

      <label>
        <input
          type="checkbox"
          checked={chestPain}
          onChange={() =>
            setChestPain(
              !chestPain
            )
          }
        />
        Chest Pain
      </label>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={
            breathingDifficulty
          }
          onChange={() =>
            setBreathingDifficulty(
              !breathingDifficulty
            )
          }
        />
        Breathing Difficulty
      </label>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={
            unconsciousness
          }
          onChange={() =>
            setUnconsciousness(
              !unconsciousness
            )
          }
        />
        Unconsciousness
      </label>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={
            severeBleeding
          }
          onChange={() =>
            setSevereBleeding(
              !severeBleeding
            )
          }
        />
        Severe Bleeding
      </label>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={
            strokeSymptoms
          }
          onChange={() =>
            setStrokeSymptoms(
              !strokeSymptoms
            )
          }
        />
        Stroke Symptoms
      </label>

      <br />
      <br />

      <button
        onClick={
          analyzeEmergency
        }
      >
        Assess Risk
      </button>
    </div>
  );
}

export default EmergencyAssessment;