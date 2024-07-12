const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gaurav@123',
    database: 'attendance_system'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('MySQL connected');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit_entry', (req, res) => {
    const { employee_id, date_of_birth, department, in_time, out_time, miss_time, late_entry } = req.body;

    // Insert or update employee details
    const employeeQuery = 'INSERT INTO employees (employee_id, date_of_birth, department) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE department = ?';
    db.query(employeeQuery, [employee_id, date_of_birth, department, department], (err, result) => {
        if (err) {
            console.error('Error inserting or updating employee:', err);
            return res.status(500).send('Error inserting or updating employee');
        }

        // Insert attendance record
        const attendanceQuery = 'INSERT INTO attendance (employee_id, date, in_time, out_time, miss_time, late_entry) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(attendanceQuery, [employee_id, new Date(), in_time, out_time, miss_time, late_entry], (err, result) => {
            if (err) {
                console.error('Error inserting attendance record:', err);
                return res.status(500).send('Error inserting attendance record');
            }
            console.log('Attendance record inserted successfully');
            res.json({ success: true });
        });
    });
});

app.get('/get_attendance', (req, res) => {
    const query = 'SELECT e.employee_id, e.date_of_birth, e.department, a.in_time, a.out_time, a.miss_time, a.late_entry FROM attendance a JOIN employees e ON a.employee_id = e.employee_id';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching attendance records:', err);
            return res.status(500).send('Error fetching attendance records');
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
