import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function Sidebar({
  role,
  collapsed,
  setCollapsed,
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const menuItemStyle = {
  cursor: "pointer",
  padding: "12px 14px",
  borderRadius: "12px",
  marginBottom: "10px",
  fontSize: "15px",
  fontWeight: "500",
  color: "#e2e8f0",
  transition: "all 0.3s ease",
  transform: "translateX(0px)",
};
const sectionTitleStyle = {
  color: "#64748b",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "1.5px",
  textTransform: "uppercase",

  marginTop: "22px",
  marginBottom: "10px",

  paddingLeft: "12px",

  borderLeft:
    "2px solid rgba(59,130,246,0.5)",
};

const getMenuStyle = (path) => ({
  ...menuItemStyle,

  display: "flex",
  alignItems: "center",

  justifyContent: collapsed
    ? "center"
    : "flex-start",

  padding: collapsed
    ? "12px"
    : "12px 14px",

  background:
    location.pathname === path
      ? "linear-gradient(90deg,#1d4ed8,#2563eb)"
      : "transparent",

  color:
    location.pathname === path
      ? "white"
      : "#cbd5e1",

  fontWeight:
    location.pathname === path
      ? "700"
      : "500",

  boxShadow:
  location.pathname === path
    ? "0 0 20px rgba(37,99,235,0.45)"
    : "none",
});

const notifications =
  JSON.parse(
    localStorage.getItem(
      "notifications"
    )
  ) || [];

const patientName =
  localStorage.getItem(
    "patientName"
  );

const myNotifications =
  notifications.filter(
    (notification) =>
      notification.patientName ===
      patientName
  );
  return (
    <div
      style={{
        width: collapsed
            ? "72px"
            : "260px",
        minHeight: "100vh",
        background: "#0f172a",
        borderRight:
          "1px solid rgba(255,255,255,0.08)",
        color: "white",
        padding: collapsed ? "16px 8px" : "24px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <div
  onClick={() =>
    setCollapsed(!collapsed)
  }
  style={{
  cursor: "pointer",
  fontSize: "24px",
  marginBottom: "25px",
  color: "white",

  display: "flex",
  justifyContent: "center",
}}
>
  ☰
</div>

  <div
  style={{
    textAlign: "center",
    marginBottom: "30px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <div
  style={{
    fontSize: "42px",
    marginBottom: collapsed ? "0px" : "10px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  }}
>
    🏥
  </div>

  {!collapsed && (
    <>
      <div
        style={{
          fontSize: "22px",
          fontWeight: "800",
          color: "white",
        }}
      >
        Digital Healthcare
      </div>

      <div
  style={{
    fontSize: "13px",
    color: "#94a3b8",
    marginTop: "6px",
  }}
>
  {
    role === "Doctor"
      ? "Doctor Portal"
      : role === "Administrator"
      ? "Admin Portal"
      : "Patient Portal"
  }
</div>

      <div
        style={{
          fontSize: "12px",
          color: "#64748b",
          marginTop: "4px",
        }}
      >
        Healthcare Management System
      </div>
    </>
  )}
</div>
<div
  style={{
    height: "1px",
    background:
      "rgba(255,255,255,0.08)",
    marginBottom: "20px",
  }}
/>
    
       {/*PATIENT */}
{role === "Patient" && (
  <>
    {!collapsed && (
  <div style={sectionTitleStyle}>
    Overview
  </div>
)}

    <p
  style={getMenuStyle("/patient")}
  onClick={() => navigate("/patient")}
>
  {collapsed ? "🏠" : "🏠 Dashboard"}
</p>

    {!collapsed && (
  <div style={sectionTitleStyle}>
    Healthcare
  </div>
)}

    <p
      style={getMenuStyle("/doctors")}
      onClick={() => navigate("/doctors")}
    >
      {collapsed ? "🩺" : "👨‍⚕ Find Doctors"}
    </p>

    <p
  style={getMenuStyle("/symptom-checker")}
  onClick={() => navigate("/symptom-checker")}
>
  {collapsed ? "🤖" : "🤖 Symptom Checker"}
</p>

    {!collapsed && (
  <div style={sectionTitleStyle}>
    Services
  </div>
)}

    <p
  style={getMenuStyle("/my-appointments")}
  onClick={() => navigate("/my-appointments")}
>
  {collapsed ? "📅" : "📅 Appointments"}
</p>

    <p
  style={getMenuStyle("/upload-report")}
  onClick={() => navigate("/upload-report")}
>
  {collapsed ? "📁" : "📁 Health Records"}
</p>

    <p
  style={getMenuStyle("/vitals-tracker")}
  onClick={() => navigate("/vitals-tracker")}
>
  {collapsed ? "❤️" : "❤️ Health Monitoring"}
</p>

    {!collapsed && (
  <div style={sectionTitleStyle}>
    Assistance
  </div>
)}

    <p
  style={getMenuStyle("/emergency")}
  onClick={() => navigate("/emergency")}
>
  {collapsed ? "🚨" : "🚨 Emergency Center"}
</p>

    <p
  style={getMenuStyle("/report-concern")}
  onClick={() => navigate("/report-concern")}
>
  {collapsed ? "💬" : "💬 Support Center"}
</p>

 <p
  style={getMenuStyle("/notifications")}
  onClick={() => navigate("/notifications")}
>
  {collapsed ? (
    "🔔"
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <span>🔔 Notifications</span>

      <span
        style={{
          background: "#ef4444",
          color: "white",
          borderRadius: "999px",
          padding: "2px 8px",
          fontSize: "12px",
          fontWeight: "700",
        }}
      >
        {myNotifications.length}
      </span>
    </div>
  )}
</p>
  </>
)}

      {/* DOCTOR */}
      {role === "Doctor" && (
        <>
          <p
            style={menuItemStyle}
            onClick={() =>
              navigate("/doctor")
            }
          >
            👨‍⚕ Dashboard
          </p>

          <p
  style={getMenuStyle(
    "/doctor-availability"
  )}
  onClick={() =>
    navigate("/doctor-availability")
  }
>
  🕒 Availability
</p>

 <p
  style={getMenuStyle(
    "/patient-reports"
  )}
  onClick={() =>
    navigate("/patient-reports")
  }
>
  📁 Patient Reports
</p>
<p
  style={getMenuStyle(
    "/consultation-history"
  )}
  onClick={() =>
    navigate("/consultation-history")
  }
>
  📝 Consultation History
</p>
<p
  style={getMenuStyle(
    "/patient-concerns"
  )}
  onClick={() =>
    navigate("/patient-concerns")
  }
>
  📋 Patient Concerns
</p>

        </>
      )}

      {/* ADMIN */}
{role === "Administrator" && (
  <>
    {!collapsed && (
      <div style={sectionTitleStyle}>
        Administration
      </div>
    )}

    <p
      style={getMenuStyle("/admin")}
      onClick={() =>
        navigate("/admin")
      }
    >
      {collapsed ? "📊" : "📊 Dashboard"}
    </p>

    <p
      style={getMenuStyle("/doctor-requests")}
      onClick={() =>
        navigate("/doctor-requests")
      }
    >
      {collapsed ? "👨‍⚕" : "👨‍⚕ Doctor Requests"}
    </p>

    <p
      style={getMenuStyle("/population-insights")}
      onClick={() =>
        navigate("/population-insights")
      }
    >
      {collapsed ? "🌍" : "🌍 Population Insights"}
    </p>
  </>
)}

     <div
  style={{
    height: "1px",
    background:
      "rgba(255,255,255,0.08)",
    marginTop: "20px",
    marginBottom: "20px",
  }}
/>

      <p
        style={{
  ...menuItemStyle,

  display: "flex",
justifyContent: "center",
alignItems: "center",

  marginTop: "10px",

  background:
    "rgba(239,68,68,0.08)",

  border:
    "1px solid rgba(239,68,68,0.2)",

  color: "#f87171",

  textAlign: "center",
}}
        onClick={() => {

          localStorage.removeItem(
            "role"
          );

          localStorage.removeItem(
            "doctorId"
          );

          localStorage.removeItem(
            "currentDoctor"
          );

          localStorage.removeItem(
            "patientName"
          );

          navigate("/");
        }}
      >
        {collapsed ? "🚪" : "🚪 Logout"}
      </p>
    </div>
  );
}

export default Sidebar;