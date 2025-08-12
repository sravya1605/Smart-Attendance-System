const mysql = require('mysql2/promise');
require('dotenv').config();

const initDb = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.RDS_HOST,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
    });
    console.log('Database connected');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        student_name VARCHAR(255),
        date DATE NOT NULL,
        status ENUM('Present', 'Absent', 'Late') NOT NULL
      )
    `);
    await connection.execute(`
      INSERT IGNORE INTO users (username, password) VALUES ('admin', 'admin123')
    `);
    return connection;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = { initDb };