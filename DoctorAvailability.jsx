import { useState } from "react";

function DoctorAvailability() {

  const doctorId =
    localStorage.getItem("doctorId");

  const [date, setDate] =
    useState("");
    const [time, setTime] =
  useState("");
const availability =
  JSON.parse(
    localStorage.getItem(
      "doctorAvailability"
    )
  ) || [];

const myAvailability =
  availability.filter(
    (item) =>
      item.doctorId === doctorId
  );
  const saveAvailability = () => {

    if (!date || !time) {
  alert(
    "Select date and time."
  );
  return;
}
    const availability =
      JSON.parse(
        localStorage.getItem(
          "doctorAvailability"
        )
      ) || [];
const alreadyExists =
  availability.find(
    (item) =>
      item.doctorId ===
        doctorId &&
      item.date === date &&
      item.time === time
  );

if (alreadyExists) {
  alert(
    "Date already added."
  );
  return;
}
    availability.push({
      doctorId,
      date,
      time,
    });

    localStorage.setItem(
      "doctorAvailability",
      JSON.stringify(
        availability
      )
    );

    alert(
      "Availability Added Successfully"
    );

    setDate("");
    setTime("");
  };
const removeDate = (
  selectedDate,
  selectedTime

) => {

  const updated =
    availability.filter(
      (item) =>
        !(
          item.doctorId ===
            doctorId &&
          item.date ===
            selectedDate &&
item.time ===
  selectedTime
        )
    );

  localStorage.setItem(
    "doctorAvailability",
    JSON.stringify(updated)
  );

  window.location.reload();
};
  return (
    <div style={{ padding: "30px" }}>

      <h1>
        Manage Availability
      </h1>

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(
            e.target.value
          )
        }
      />

      <br />
      <br />
<input
  type="time"
  value={time}
  onChange={(e) =>
    setTime(
      e.target.value
    )
  }
/>
      <button
        onClick={saveAvailability}
      >
        Add Available Date
      </button>
<h2
  style={{
    marginTop: "30px",
  }}
>
  My Available Dates
</h2>

{
  myAvailability.length === 0 ? (
    <p>
      No available dates added.
    </p>
  ) : (
    myAvailability.map(
      (item, index) => (
        <div
          key={index}
          style={{
            marginBottom:
              "10px",
          }}
        >
          {item.date} | {item.time}

          <button
            style={{
              marginLeft:
                "10px",
            }}
            onClick={() =>
  removeDate(
    item.date,
    item.time
  )
}
          >
            Remove
          </button>
        </div>
      )
    )
  )
}
    </div>
  );
}

export default DoctorAvailability;