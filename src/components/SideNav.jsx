import React from "react";
import "./SideNav.css";
import CalendarIcon from "../assets/calendarIcon.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Chip } from "@mui/material";
import dayjs from "dayjs";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import schedules from '../utils/events.json';

function SideNav({ selectedDate }) {
  const todayFormatted = selectedDate.format("DD/MM/YYYY");
  const tomorrow = selectedDate.add(1, "day");
  const tomorrowFormatted = tomorrow.format("DD/MM/YYYY");
  const todaySchedules = schedules.filter((s) => s.date === todayFormatted);
  const tomorrowSchedules = schedules.filter(
    (s) => s.date === tomorrowFormatted
  );

  return (
    <div className="sidebar">
      {/* calender header in sidebar */}
      <div className="header">
        <div className="calendar-header">
          <img src={CalendarIcon} alt="calendar_Icon" className="cal-icon" />
          <span>
            <h1 className="title">CALE<strong style={{color:"#ff6363"}}>NDAR</strong></h1>
          </span>
        </div>
        <hr className="h-line" />
      </div>
      {/* body of the sidebar - displaying current date,time,events */}
      <div className="sidebar-body">
        <h1 style={{}}>
          {selectedDate.format("MMMM")} <strong style={{ color: "#ff6363" }}>{selectedDate.format("YYYY")}</strong>
        </h1>
        <div className="date-time">
          <div className="dt">
            <CalendarMonthIcon sx={{ fontSize: "23px"}} />
            <h3>
              <strong> Date an</strong>
              d Time
            </h3>
          </div>
          <div className="curr-date-container">
            {selectedDate.format("DD/MM/YYYY HH:mm:ss")}
          </div>
        </div>
        {/* day schedules */}
        <div className="day-schedules">
          <div className="ds">
            <AccessAlarmsIcon sx={{ fontSize: "23px"}} />
            <h3>
              <strong>Sche</strong>
              dules
            </h3>
          </div>
          <div>
            {" "}
            {/* className="curr-day-schedule" */}
            <h4>
              <strong>Today</strong> {todayFormatted}
            </h4>
            {todaySchedules.map((schedule, id) => (
              <div>
                <Brightness1Icon sx={{color:schedule.color,fontSize:"12px"}}/>
                <strong style={{marginLeft:"10px"}}>
                  {schedule.startTime}
                  {" - "}
                  {schedule.endTime}
                </strong>
                <Chip
                  key={id}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f4f4f4",
                    height: "20px",
                    width: "100%",
                    border: "none",
                    marginBottom: "10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    justifyContent: "flex-start",
                  }}
                  label={
                    <div
                      style={{ display: "flex", gap: "6px", padding: "5px" }}
                    >
                      <span
                        style={{ fontWeight: "500", color: schedule.color }}
                      >
                        {schedule.title}{" "}
                      </span>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
          <div>
            <h4>
              <strong>Tomorrow</strong>
            </h4>
            {tomorrowSchedules.map((schedule, id) => (
              <div>
                  <Brightness1Icon sx={{color:schedule.color,fontSize:"12px"}}/>
                <strong style={{marginLeft:"10px"}}>
                  {schedule.startTime}
                  {" - "}
                  {schedule.endTime}
                </strong>
                <Chip
                  key={id}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f4f4f4",
                    height: "20px",
                    width: "100%",
                    border: "none",
                    marginBottom: "10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    justifyContent: "flex-start",
                  }}
                  label={
                    <div
                      style={{ display: "flex", gap: "6px", padding: "5px" }}
                    >
                      <span
                        style={{ fontWeight: "500", color: schedule.color }}
                      >
                        {schedule.title}{" "}
                      </span>
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
