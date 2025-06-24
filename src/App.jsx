import { useState } from 'react';
import './App.css'
import SideNav from './components/SideNav'
import Calendar from './pages/Calendar'
import dayjs from "dayjs";
function App() {
   const [selectedDate, setSelectedDate] = useState(dayjs());
  return (
    <>
    <div className='app'>
      <div style={{ display: "flex",flexDirection:"row" }}>
       <div style={{ width: "18%", position: "fixed" }}>
    <SideNav selectedDate={selectedDate} />
  </div>
      <div style={{ marginLeft: "62%", width: "82%" }}>
    <Calendar onDateSelect={setSelectedDate} />
  </div>
    </div>
      </div>
    </>
  )
}

export default App
