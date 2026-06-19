import React, { useState } from "react";

function Appointment({ setPage }) {

  // ==================== ALL HOOKS AT THE TOP ====================
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(localStorage.getItem("doctor") || "");
  const [selectedField, setSelectedField] = useState("All");
  const [flippedDoctor, setFlippedDoctor] = useState(null);
  const [searchDoctor, setSearchDoctor] = useState("");

  // Role check AFTER hooks
  const role = localStorage.getItem("role");
  const patientName = localStorage.getItem("patientName") || "";

  if (role !== "Patient") {
    setPage("dashboard");
    return null;
  }

  // ==================== DOCTORS DATA ====================
  const doctors = [
    { name: "Dr. James Wilson", field: "Cardiology", exp: "12 Years", location: "Hyderabad", rating: "4.8", fee: "₹1200", availability: "9 AM - 1 PM", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Dr. Ethan Walker", field: "Cardiology", exp: "13 Years", location: "Mumbai", rating: "4.9", fee: "₹1500", availability: "10 AM - 2 PM", image: "https://randomuser.me/api/portraits/men/45.jpg" },
    { name: "Dr. Michael Brown", field: "Neurology", exp: "10 Years", location: "Chennai", rating: "4.9", fee: "₹1800", availability: "11 AM - 4 PM", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Dr. Ryan Cooper", field: "Neurology", exp: "9 Years", location: "Delhi", rating: "4.7", fee: "₹1600", availability: "2 PM - 6 PM", image: "https://randomuser.me/api/portraits/men/67.jpg" },
    { name: "Dr. Sarah Lee", field: "Dermatology", exp: "8 Years", location: "Bangalore", rating: "4.8", fee: "₹900", availability: "10 AM - 3 PM", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dr. Mia Robinson", field: "Dermatology", exp: "9 Years", location: "Pune", rating: "4.7", fee: "₹1000", availability: "12 PM - 5 PM", image: "https://randomuser.me/api/portraits/women/68.jpg" },
    { name: "Dr. Emily Carter", field: "Orthopedics", exp: "9 Years", location: "Mumbai", rating: "4.8", fee: "₹1400", availability: "9 AM - 12 PM", image: "https://randomuser.me/api/portraits/women/55.jpg" },
    { name: "Dr. Daniel Young", field: "Orthopedics", exp: "11 Years", location: "Hyderabad", rating: "4.9", fee: "₹1700", availability: "1 PM - 6 PM", image: "https://randomuser.me/api/portraits/men/71.jpg" },
    { name: "Dr. David Miller", field: "General", exp: "15 Years", location: "Delhi", rating: "4.8", fee: "₹700", availability: "8 AM - 12 PM", image: "https://randomuser.me/api/portraits/men/15.jpg" },
    { name: "Dr. Chloe Adams", field: "General", exp: "7 Years", location: "Kolkata", rating: "4.6", fee: "₹600", availability: "3 PM - 8 PM", image: "https://randomuser.me/api/portraits/women/12.jpg" }
  ];

  // ==================== RETURN JSX ====================
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: "40px" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "30px" }}>Book Appointment</h1>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px" }}>

        {/* Doctors List */}
        <div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "25px" }}>
            {["All", "Cardiology", "Neurology", "Dermatology", "Orthopedics", "General"].map(field => (
              <button key={field} onClick={() => setSelectedField(field)} style={{
                padding: "10px 20px", borderRadius: "999px", border: "none",
                background: selectedField === field ? "#2563eb" : "white",
                color: selectedField === field ? "white" : "#0f172a",
                fontWeight: "bold", cursor: "pointer"
              }}>
                {field}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search doctor..."
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
            style={{ width: "100%", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "30px" }}
          />

          <h2>Available Doctors</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {doctors.filter(d => 
              selectedField === "All" || d.field === selectedField
            ).map((doctor, i) => (
              <div key={i} style={{ background: "white", padding: "20px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                <img src={doctor.image} alt="" style={{ width: "70px", height: "70px", borderRadius: "50%", marginBottom: "12px" }} />
                <h3>{doctor.name}</h3>
                <p>{doctor.field} • {doctor.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div style={{ background: "white", padding: "35px", borderRadius: "24px" }}>
          <h2>Book Appointment</h2>
          <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} style={{ width: "100%", padding: "15px", margin: "15px 0", borderRadius: "12px" }}>
            <option value="">Select Doctor</option>
            {doctors.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
          </select>

          <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ width: "100%", padding: "15px", margin: "15px 0", borderRadius: "12px" }} />

          <div style={{ margin: "20px 0" }}>
            {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"].map(time => (
              <button key={time} onClick={() => setSelectedTime(time)} style={{
                margin: "5px", padding: "12px 18px", borderRadius: "12px",
                background: selectedTime === time ? "#2563eb" : "#e2e8f0",
                color: selectedTime === time ? "white" : "black",
                border: "none", cursor: "pointer"
              }}>
                {time}
              </button>
            ))}
          </div>

          <button onClick={() => {
            if (!selectedDoctor || !selectedDate || !selectedTime) return alert("Please fill all fields");
            localStorage.setItem("doctor", selectedDoctor);
            localStorage.setItem("appointmentDate", selectedDate);
            localStorage.setItem("time", selectedTime);
            setPage("appointmentconfirmed");
          }} style={{
            width: "100%", padding: "16px", background: "#2563eb", color: "white",
            border: "none", borderRadius: "14px", fontSize: "17px", fontWeight: "bold"
          }}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appointment;