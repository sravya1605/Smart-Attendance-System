import { useState } from 'react';

function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const records = JSON.parse(localStorage.getItem('attendance')) || [];
  const filteredRecords = startDate && endDate
    ? records.filter(r => r.date >= startDate && r.date <= endDate)
    : records;

  const downloadCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Date', 'Present'];
    const rows = filteredRecords.map(record => [
      record.studentId,
      record.studentName,
      record.date,
      record.present ? 'Yes' : 'No'
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-card">
      <h2>Attendance Reports</h2>
      <div className="date-filters">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input date-input"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input date-input"
        />
      </div>
      <button onClick={downloadCSV} className="button download-button">Download CSV</button>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Date</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(record => (
            <tr key={record.id}>
              <td>{record.studentId}</td>
              <td>{record.studentName}</td>
              <td>{record.date}</td>
              <td>{record.present ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;