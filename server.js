require('dotenv').config();
require('./helper/employeeLeaveSchedue.js');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// add DB file
require('./db/conn.js');

// add cors
app.use(cors());

// parses incoming requests with JSON payloads
app.use(express.json());

// add file path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add API URL
const employeeRoute = require('./Route/employeeRoute.js');
const departmentRoute = require('./Route/departmentRoute.js');
const leaveRoute = require('./Route/leaveRoute.js');


app.use('/api', employeeRoute);
app.use('/api', departmentRoute);
app.use('/api', leaveRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Listen on port ${process.env.PORT}`);
});
