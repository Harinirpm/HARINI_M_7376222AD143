import React, { useState } from "react";
import dayjs from "dayjs";
import './Calendar.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness1Icon from "@mui/icons-material/Brightness1"; 
import { Badge } from "@mui/material";

const schedules = [
  {
    id: 1,
    date: "25/06/2025",
    startTime: "6:00 am",
    endTime: "7:00 am",
    color: "#f6be23",
    title: "Morning Workout",
  },
  {
    id: 2,
    date: "25/06/2025",
    startTime: "10:00 am",
    endTime: "11:00 am",
    color: "#f6501e",
    title: "Team Standup Meeting",
  },
  {
    id: 3,
    date: "25/06/2025",
    startTime: "11:00 am",
    endTime: "1:00 pm",
    color: "#f6be23",
    title: "Project Work - Module Integration",
  },
  {
    id: 6,
    date: "26/06/2025",
    startTime: "9:00 am",
    endTime: "12:00 am",
    color: "#f6be23",
    title: "Code Review Session",
  },
  {
    id: 7,
    date: "26/06/2025",
    startTime: "11:00 am",
    endTime: "12:00 pm",
    color: "#f6501e",
    title: "Research New Features",
  },
  {
    id: 8,
    date: "26/06/2025",
    startTime: "2:00 pm",
    endTime: "3:30 pm",
    color: "#f6be23",
    title: "Team Collaboration - UI Improvements",
  },
];


function Calendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null);
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();
  const daysArray = [];
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);
 const scheduledDates = new Set(schedules.map(s => s.date));
  return (
    <div className="calendar-container">
      <div className="month-year-filter">
        <div className="header">
          <button className="increment" onClick={() => setCurrentDate(currentDate.subtract(1, 'year'))}>
            <ChevronLeftIcon sx={{ color: "red" }} />
          </button>
          <h2>{currentDate.format("YYYY")}</h2>
          <button className="decrement" onClick={() => setCurrentDate(currentDate.add(1, 'year'))}>
            <ChevronRightIcon />
          </button>
        </div>
        <div className="month-nav">
          <button className="increment" onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>
            <ChevronLeftIcon sx={{ color: "red" }} />
          </button>
          <h2><span>{currentDate.format("MMMM")}</span></h2>
          <button className="decrement" onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
          <div className="calendar-day-header" key={day}>{day}</div>
        ))}
{daysArray.map((day, index) => {
  const dateObj = day ? currentDate.date(day) : null;
  const formattedDate = dateObj ? dateObj.format("DD/MM/YYYY") : null;
  const daySchedules = schedules.filter(s => s.date === formattedDate);
  const isToday = day && dayjs().date() === day && currentDate.isSame(dayjs(), "month");
  const isSelected = day && selectedDay && currentDate.date(day).isSame(selectedDay, "day");

  return (
    <div
      key={index}
      className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`}
      onClick={() => {
        if (day) {
          const selected = currentDate.date(day);
          setSelectedDay(selected);
          onDateSelect(selected);
        }
      }}
      style={{ position: "relative", padding: "5px", minHeight: "70px" }}
    >
     <div style={{ display: "flex", justifyContent: "center" }}>
        {day ? (
          <Badge
            badgeContent={daySchedules.length > 0 ? daySchedules.length : null}
            color="error"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px",
                height: "18px",
                minWidth: "18px",
                borderRadius: "50%",
              }
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>{day}</div>
          </Badge>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: "5px", marginTop: "2px" }}>
        {daySchedules.slice(0, 2).map((sch, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "-40px"
            }}
          >
            <Brightness1Icon sx={{ fontSize: "8px", color: sch.color, }} />
            <span
              style={{
                fontSize: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "60px",
              }}
            >
              {sch.title.slice(0, 11)}...
            </span>
          </div>
        ))}
      </div>
    </div>
  );
})}


      </div>
    </div>
  );
}

export default Calendar;
