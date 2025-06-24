import React from "react";
import "./SideNav.css";
import CalendarIcon from "../assets/calendarIcon.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Chip } from "@mui/material";
const schedules = [
  {
    id: 1,
    date: "24/06/2025",
    task: "Morning Workout",
    time: "6:00 am - 7:00 am"
  },
  {
    id: 2,
    date: "24/06/2025",
    task: "Team Standup Meeting",
    time: "10:00 am - 10:30 am"
  },
  {
    id: 3,
    date: "24/06/2025",
    task: "Project Work - Module Integration",
    time: "11:00 am - 1:00 pm"
  },
  {
    id: 6,
    date: "25/06/2025",
    task: "Code Review Session",
    time: "9:00 am - 10:00 am"
  },
  {
    id: 7,
    date: "25/06/2025",
    task: "Research New Features",
    time: "11:00 am - 12:30 pm"
  },
  {
    id: 8,
    date: "25/06/2025",
    task: "Team Collaboration - UI Improvements",
    time: "2:00 pm - 3:30 pm"
  },
];

function SideNav() {
  const today = "24/06/2025";
  const tomorrow = "25/06/2025";

  const todaySchedules = schedules.filter((s)=>s.date===today);
  const tomorrowSchedules = schedules.filter((s)=>s.date===tomorrow);

  return (
    <div className="sidebar">
      {/* calender header in sidebar */}
      <div className="header">
        <div className="calendar-header">
          <img src={CalendarIcon} alt="calendar_Icon" className="cal-icon" />
          <span>
            <h1 className="title"></h1>
          </span>
        </div>
        <hr className="h-line" />
      </div>
      {/* body of the side bar - displaying current date,time,events */}
      <div className="sidebar-body">
        {/* <h3 className="day-quotes">'' Smile everyday like you :) ''</h3> */}
         <h1 style={{}}>JUNE <strong style={{color:"red"}}>2025</strong></h1>
        <div className="date-time">
          <div className="dt">
            <CalendarMonthIcon sx={{ fontSize: "23px" }} />
            <h3><strong>Date and Time</strong></h3>
          </div>
          <div className="curr-date-container">24/05/2025 03:31:20</div>
        </div>
        {/* day schedules */}
        <div className="day-schedules">
          <div className="ds">
            <AccessAlarmsIcon sx={{ fontSize: "23px" }} />
            <h3><strong>Schedules</strong></h3>
          </div>
          <div> {/* className="curr-day-schedule" */}
            <h4><strong>Today</strong> {today}</h4>
            {todaySchedules.map((schedule,id)=>(
              <div>
                <strong>{schedule.time}</strong>
            <Chip
            key={id}
              variant="outlined"
              sx={{
                backgroundColor: "#f4f4f4",
                height: "20px",
                width: "100%",
                border: "none",
                marginBottom:"10px",
                marginTop:"10px",
                borderRadius:"5px",
                justifyContent:"flex-start"
              }}
              label={
                <div
                  style={{ display: "flex",gap:"6px",padding:"5px" }}
                >
                  <span style={{ fontWeight: "500",color:"gray"}}>{schedule.task} </span>
                </div>
              }
            />
            </div>
             ))}
          </div>
          <div>
            <h4 style={{color: "rgb(255, 119, 28)"}}><strong>Tomorrow</strong> {tomorrow}</h4>
            {tomorrowSchedules.map((schedule,id)=>(
              <div>
                <strong>{schedule.time}</strong>
            <Chip
            key={id}
              variant="outlined"
              sx={{
                backgroundColor: "#f4f4f4",
                height: "20px",
                width: "100%",
                border: "none",
                marginBottom:"10px",
                marginTop:"10px",
                borderRadius:"5px",
                justifyContent:"flex-start"
              }}
              label={
                <div
                  style={{ display: "flex",gap:"6px",padding:"5px" }}
                >
                  <span style={{ fontWeight: "500",color:"gray"}}>{schedule.task} </span>
                </div>
              }
            />
            </div>
             ))}
             </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
