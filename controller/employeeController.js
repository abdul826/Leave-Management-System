const empMOdel = require('../Model/employeeModel.js');
const depModel = require('../Model/departmentModel.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../helper/util.js');
// const employeeModel = require('../Model/employeeModel.js');

// Employee Registration - Admin
exports.register = async(req,res)=>{
    try {
        const {name,email,mobile,password,address,brithday,role,departmentId,cPassword} = req.body;

        if(name === '' || email === '' || mobile === '' || password === '' || address === '') return res.status(400).json("All fields are require");

        if(password !== cPassword) return res.status(400).json("Password and Confirm PAssword not matched");

        const isDepartment = await depModel.findOne({_id:departmentId});

        if(!isDepartment) return res.status(400).json("Department not found");

        const isExist = await empMOdel.findOne({email:email});

        if(isExist) return res.status(400).json("Email already exist");

        const newEmp = new empMOdel({
            name,email,mobile,password,address,brithday,role,departmentId
        });

        await newEmp.save();

        return res.status(201).json({message:"Employee Register Successfully",newEmp});
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
    
}

// Employee Login - Employee
exports.login = async(req,res)=>{
    const {email,password} = req.body;

    if(email === '' || password === '') return res.status(400).json("Fileds are required");
    try {
        const validUser = await empMOdel.findOne({email:email});

        if(!validUser) return res.status(400).json("Email not exist");

        const isMatched = await bcrypt.compare(password,validUser.password);

        if(!isMatched) return res.status(400).json("Password not matched");

        const token = generateToken(validUser._id);

        const result = {
            validUser,
            token
        }
        if(result) return res.status(200).json({message:result});
    } catch (error) {
        return res.status(400).json("Something went wrong")
    }
}

exports.verifyEmp = async(req,res)=>{
    try {
        const verifyEmployee = await empMOdel.findOne({_id:req.empId});
        if(!verifyEmployee) return res.status(400).json("Employee not verified");
        return res.status(200).json({message:"Employee Verified",verifyEmployee});
    } catch (error) {
        return res.status(400).json("Error while validating the Employee", error);
    }
}

exports.adminVerifyEmp = async(req,res)=>{
    try {
        const verifyAdmin = await empMOdel.findOne({_id:req.empId});
        if(!verifyAdmin) return res.status(400).json("Employee not verified");
        return res.status(200).json({message:"Employee Verified",verifyAdmin});
    } catch (error) {
        return res.status(400).json("Error while validating the Employee", error);
    }
}

exports.fetchAllEmp = async(req,res)=>{
    try {
        const getAllEmp = await empMOdel.find().populate('departmentId');
        if(!getAllEmp) return res.status(400).json("No Employee Found!");
        return res.status(200).json({message:"Employee Record",getAllEmp});
    } catch (error) {
        return res.status(400).json("Error while validating the Employee", error);
    }
}

// Update Employee -- admin
exports.updateEmployee = async(req,res)=>{
    const {id} = req.params;
    try {
        const isDepExist = await empMOdel.findOne({_id:id});
        if(isDepExist === '') return res.status(400).json("Employee Not exist");

        const updateDep = await empMOdel.findByIdAndUpdate(
            id,
            req.body,
            { new: true}  // return the updated doc & validate
        )
        if(updateDep) return res.status(200).json({message:"Employee Update Successfully",updateDep});
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error while updating the Employee");
        
    }
}

// Delete Employee -- Admin
exports.deleteEmployee = async(req,res)=>{
    const {id} = req.params;
    try {
        const isDepExist = await empMOdel.findOne({_id:id});
        if(isDepExist === '') return res.status(400).json("Employee Not exist");

        const deleteDep = await empMOdel.findByIdAndDelete({_id:id});
        if(deleteDep) return res.status(200).json("Employee deleted successfuly");
    } catch (error) {
        return res.status(400).json("Error while updating the Employee");
    }
}