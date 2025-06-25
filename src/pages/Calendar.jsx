import React, { useState } from "react";
import dayjs from "dayjs";
import './Calendar.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness1Icon from "@mui/icons-material/Brightness1"; 
import { Badge } from "@mui/material";
import schedules from '../utils/events.json';

function Calendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(null);
  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();
  const daysArray = [];
  //fill the null value for the empty days of the month
  for (let i = 0; i < startDay; i++) daysArray.push(null);
  //fill the month dates
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);
  //extract unique set of dates and creates a array of just date strings
 const scheduledDates = new Set(schedules.map(s => s.date));
 
//  this function is ,checking is there any schedules overlapping 
 const checkOverlaps = (events) => {
  const overlaps = new Set();
  for (let i = 0; i < events.length; i++) {
    const [start1, end1] = [dayjs(events[i].startTime, "h:mm a"), dayjs(events[i].endTime, "h:mm a")];
    for (let j = i + 1; j < events.length; j++) {
      const [start2, end2] = [dayjs(events[j].startTime, "h:mm a"), dayjs(events[j].endTime, "h:mm a")];
      if (start1.isBefore(end2) && start2.isBefore(end1)) {
        overlaps.add(events[i].id);
        overlaps.add(events[j].id);
      }
    }
  }
  return overlaps;
};

  return (
    <div className="calendar-container">
      <div className="month-year-filter">
        <div className="header">
          {/* navigating months and year forward or backward */}
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
{/* actual calender days and dates mapping  */}
      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
          <div className="calendar-day-header" key={day}>{day}</div>
        ))}
{daysArray.map((day, index) => {
  const dateObj = day ? currentDate.date(day) : null;
  const formattedDate = dateObj ? dateObj.format("DD/MM/YYYY") : null;
  //get all events that belong to the current day
  const daySchedules = schedules.filter(s => s.date === formattedDate);
  //finds which events overlap in time on this specific day.
  const overlappingIds = checkOverlaps(daySchedules);
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
        {/* no.of.events count notifying */}
        {day ? (
          <Badge
            badgeContent={daySchedules.length > 0 ? daySchedules.length : null}
            color="error"
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
        {daySchedules.slice(0, 3).map((sch) => (
          <div
            key={sch.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "-40px"
            }}
            title={`${sch.title} (${sch.startTime} - ${sch.endTime})${overlappingIds.has(sch.id) ? ' [Conflict]' : ''}`}
          >
            <Brightness1Icon
              sx={{
                fontSize: "8px",
                color: sch.color,
                border: overlappingIds.has(sch.id) ? "1px solid red" : "none",
                borderRadius: "50%",
              }}
            />
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
