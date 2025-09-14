const express = require('express');
const { addDepartment, getAllDepartment, updateDepartment, deleteDepartment } = require('../controller/departmentController');
const {employeeAuthentication,employeeAuthorization} = require('../middleware/auth.js');
const router = express.Router();

router.post('/addDepartment', employeeAuthorization, addDepartment);
router.get('/fetchDepartment',employeeAuthorization, getAllDepartment);
router.put('/updateDep/:id',employeeAuthorization, updateDepartment);
router.delete('/deleteDep/:id',employeeAuthorization,deleteDepartment);

module.exports = router;