const express = require('express');
const router = express.Router();
const { initDb } = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const connection = await initDb();
    const [rows] = await connection.execute('SELECT * FROM attendance');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

router.get('/download', async (req, res) => {
  try {
    const connection = await initDb();
    const [rows] = await connection.execute('SELECT * FROM attendance');
    const csv = [
      'Student ID,Student Name,Date,Status',
      ...rows.map(row => `${row.student_id},${row.student_name},${row.date},${row.status}`).join('\n')
    ].join('\n');
    res.header('Content-Type', 'text/csv');
    res.attachment('attendance-report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download report' });
  }
});

module.exports = router;