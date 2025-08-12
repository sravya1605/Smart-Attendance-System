const express = require('express');
const session = require('express-session');
const path = require('path');
const attendanceRoutes = require('./routes/attendance');
const uploadRoutes = require('./routes/upload');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/attendance', attendanceRoutes);
app.use('/upload', uploadRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));