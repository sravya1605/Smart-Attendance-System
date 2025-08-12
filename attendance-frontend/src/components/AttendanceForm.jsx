import { useState } from 'react';

function AttendanceForm() {
  const [students, setStudents] = useState([
    { id: '9979', name: 'Fayola Menezes', present: false },
    { id: '9992', name: 'Swen Rodrigues', present: false },
    { id: '9976', name: 'Shine Mascarenhas', present: false },
  ]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleToggle = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleSubmit = () => {
    const records = JSON.parse(localStorage.getItem('attendance')) || [];
    const newRecords = students.map(student => ({
      id: `${student.id}-${date}`,
      studentId: student.id,
      studentName: student.name,
      date,
      present: student.present,
      timestamp: new Date().toISOString(),
    }));
    localStorage.setItem('attendance', JSON.stringify([...records, ...newRecords]));
    alert('Attendance saved!');
  };

  return (
    <div className="attendance-card">
      <h2>Mark Attendance</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input date-input"
      />
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id} className="student-item">
            <span>{student.name}</span>
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => handleToggle(student.id)}
              className="checkbox"
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="button save-button">Save Attendance</button>
    </div>
  );
}

export default AttendanceForm;