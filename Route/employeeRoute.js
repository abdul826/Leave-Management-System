const express = require('express');
const { register, login, verifyEmp, updateEmployee, deleteEmployee } = require('../controller/employeeController');
const {employeeAuthentication,employeeAuthorization} = require('../middleware/auth.js');
const router = express.Router();

router.post('/register',employeeAuthorization,register);
router.post('/login',login);
router.get('/verifyEmp',employeeAuthentication,employeeAuthorization,verifyEmp);
router.put('/updatemp',employeeAuthentication,updateEmployee);
router.delete('/deleteEmp',employeeAuthorization, deleteEmployee);

module.exports = router;