const express = require('express');
const { register, login, verifyEmp, updateEmployee, deleteEmployee, adminVerifyEmp, fetchAllEmp } = require('../controller/employeeController');
const {employeeAuthentication,employeeAuthorization} = require('../middleware/auth.js');
const router = express.Router();

router.post('/register',employeeAuthorization,register);
router.post('/login',login);
router.get('/fetchemp',employeeAuthorization,fetchAllEmp);
router.get('/verifyEmp',employeeAuthentication,verifyEmp);
router.get('/adminverifyEmp',employeeAuthorization,adminVerifyEmp);
router.put('/updatemp',employeeAuthentication,updateEmployee);
router.delete('/deleteEmp/:id',employeeAuthorization, deleteEmployee);

module.exports = router;
