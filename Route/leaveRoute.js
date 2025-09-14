const express = require('express');
const { addLeaveType,fetchAllLeaveType, applyLeave, updateLeaveType, deleteLeaveType, fetchAllLeave, leaveStatus } = require('../controller/leaveController');
const {employeeAuthentication,employeeAuthorization} = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');
const router = express.Router();

const uploadMiddleware = (req, res, next) => {
  upload.array('documents', 3)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};



// Leave
router.post('/applyleave',employeeAuthentication,uploadMiddleware,applyLeave);
router.get('/fetchleave', employeeAuthorization, fetchAllLeave);
router.put('/updateleavestatus/:id',employeeAuthorization,leaveStatus);

// Leave Type
router.post('/addleavetype', employeeAuthorization, addLeaveType);
router.get('/fetchleavetype', employeeAuthorization, fetchAllLeaveType);
router.put('/updateleavetype',employeeAuthorization,updateLeaveType);
router.delete('/deleteleavetype',employeeAuthorization, deleteLeaveType);

module.exports = router;