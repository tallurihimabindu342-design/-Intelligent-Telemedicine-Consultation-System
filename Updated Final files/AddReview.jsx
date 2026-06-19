import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
function AddReview() {

  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");
const navigate =
  useNavigate();
  const saveReview = () => {

    const reviews =
      JSON.parse(
        localStorage.getItem(
          "doctorReviews"
        )
      ) || [];
const alreadyReviewed =
  reviews.find(
    (item) =>
      item.doctorId ===
        localStorage.getItem(
          "reviewDoctorId"
        ) &&
      item.patient ===
        localStorage.getItem(
          "patientName"
        )
  );

if (alreadyReviewed) {

  alert(
    "You have already reviewed this doctor."
  );

  return;

}
    reviews.push({

      doctorId:
        localStorage.getItem(
          "reviewDoctorId"
        ),

      patient:
        localStorage.getItem(
          "patientName"
        ),

      rating,

      review,

      createdAt:
        new Date().toLocaleString(),

    });

    localStorage.setItem(
      "doctorReviews",
      JSON.stringify(
        reviews
      )
    );

    alert(
      "Review Submitted"
    );
navigate(
  "/patient"
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
          Doctor Review
        </h1>

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(
                e.target.value
              )
            )
          }
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐
          </option>

          <option value={4}>
            ⭐⭐⭐⭐
          </option>

          <option value={3}>
            ⭐⭐⭐
          </option>

          <option value={2}>
            ⭐⭐
          </option>

          <option value={1}>
            ⭐
          </option>
        </select>

        <br />
        <br />

        <textarea
          rows="5"
          cols="50"
          value={review}
          onChange={(e) =>
            setReview(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <button
          onClick={
            saveReview
          }
        >
          Submit Review
        </button>

      </div>

    </div>

  );
}

export default AddReview;