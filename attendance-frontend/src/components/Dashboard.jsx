import { useState } from 'react';
import AttendanceForm from './AttendanceForm';
import Reports from './Reports';

function Dashboard({ setUser }) {
  const [view, setView] = useState('attendance');

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Smart Attendance</h1>
        <button onClick={handleLogout} className="button logout-button">Logout</button>
      </div>
      <div className="dashboard-tabs">
        <button
          onClick={() => setView('attendance')}
          className={`tab-button ${view === 'attendance' ? 'active' : ''}`}
        >
          Mark Attendance
        </button>
        <button
          onClick={() => setView('reports')}
          className={`tab-button ${view === 'reports' ? 'active' : ''}`}
        >
          View Reports
        </button>
      </div>
      <div className="dashboard-content">
        {view === 'attendance' ? <AttendanceForm /> : <Reports />}
      </div>
    </div>
  );
}

export default Dashboard;