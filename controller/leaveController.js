const leaveTypeModel = require('../Model/leaveTypeModel');
const leaveModel = require('../Model/leaveModel.js');
const {sendEmailToAdmin,sendEmailToEmployee} = require('../helper/sendMail.js');
const employeeModel = require('../Model/employeeModel.js');
const indianHolidays = require('../helper/holidays.js');

// Leave
exports.applyLeave = async(req,res)=>{
    try {
        const empId = req.empId;
        const {leaveTypeId,leave_from,leave_to,leave_desc} = req.body;
        
        const files = req.files; 
        let leave_status = 'Pending';
        let extraLeave = '';

        const leaveFrom = new Date(leave_from);
        const leaveTo = new Date(leave_to);

        // 1. Calculate total leave days
        const diffTime = leaveTo - leaveFrom;
        let totalLeaveDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days

        const currEmp = await employeeModel.findOne({_id:empId});

        if(!currEmp) return res.status(400).json("Employee Not found");
        
        if(leaveTypeId === '' || leave_from === '' || leave_to === '' || empId === ''){
            return res.status(400).json("All fileds are required");
        } 
        
        if(leave_from >= leave_to){
            return res.status(400).json("Leave from is less than leave to date");
        }

        if (files && files.length > 3) {
            return res.status(400).json({ message: "You can upload a maximum of 3 documents." });
        }

        // let calculate the total size of file
        let totalSize = 0;
        if(files){
            totalSize = files.reduce((acc,file)=>{
                return acc +file.size
            },0)
        }

        if(totalSize > process.env.MAX_FILE_SIZE) return res.status(400).json("File size must be less then or equal to 5 MB");


        const documents = files ? files.map(file => file.path):[];

        const newLeave = new leaveModel({
            empId,leaveTypeId,leave_from,leave_to,leave_desc,leave_status,documents

        });
        // return
        await newLeave.save();

        // Decrement the leave balance from employee table
        if(currEmp.leave_balance >= totalLeaveDays){
            currEmp.leave_balance -= totalLeaveDays;

            await currEmp.save();
        }else{
            extraLeave = totalLeaveDays - currEmp.leave_balance;
            paidLeave = currEmp.leave_balance;

            currEmp.leave_balance = 0;

            await currEmp.save();

        }

        const getLeaveType = await leaveTypeModel.findOne({_id:leaveTypeId});
        
        // Send Mail
        await sendEmailToAdmin({
        subject: "New Leave Application Submitted",
        html: `
            <h3>New Leave Request</h3>
            <p><strong>Employee ID:</strong> ${empId}</p>
            <p><strong>Employee Name:</strong> ${req.rootUser.name}</p>
            <p><strong>Leave Type:</strong> ${getLeaveType.leave_type}</p>
            <p><strong>From:</strong> ${leave_from}</p>
            <p><strong>To:</strong> ${leave_to}</p>
            <p><strong>Description:</strong> ${leave_desc || 'No description'}</p>
        `
    });
        return res.status(201).json({
            message:"Leave Applied",
            remainingLeave: currEmp.leave_balance,
            unpaidLeave: extraLeave?extraLeave:'',});

    } catch (error) {
        console.log(error);
        
        return res.status(400).json("Error while applying leave");
    }
}

// Fetch All leave - Admin
exports.fetchAllLeave = async(req,res)=>{
    try {
        const getAllLeave = await leaveModel.find().populate('empId').populate('leaveTypeId');
        if(getAllLeave) return res.status(200).json(getAllLeave);
    } catch (error) {
        return res.status(400).json("Error while Getching leaves");
    }
}

// Fetch Single leave - Admin
exports.fetchSingleLeave = async(req,res)=>{
    try {
        const getsSingleLeave = await leaveModel.find(req.empId).populate('leaveTypeId');
        if(getsSingleLeave) return res.status(200).json(getsSingleLeave);
    } catch (error) {
        console.log(error);
        
        return res.status(400).json("Error while Getching leaves");
    }
}


// LEave Status Change - Admin
exports.leaveStatus = async(req,res)=>{
    try {
        const { id } = req.params; // leave ID
        const { status } = req.body; // new status ("Approved" or "Reject")

        // Validate status input
        const validStatuses = ["Approved", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status. Must be 'Approved' or 'Rejected'." });
        }

         // Find the leave request
        const leave = await leaveModel.findById(id);
        if (!leave) {
            return res.status(404).json({ message: "Leave request not found." });
        }

        // get Employee Email ID
        let isEmp = await employeeModel.findOne({_id:leave.empId});
        
        // Update status
        leave.leave_status = status;
        await leave.save();

        await sendEmailToEmployee({
            subject: "Leave Application Status",
            html: `
                <h3>Leave Request Status</h3>
                <p><strong>Employee Name:</strong> ${isEmp.name}</p>
                <p><strong>Leave Status:</strong> ${leave.leave_status}</p>
                `,
            USER_Email: `${isEmp.email}`
        });

        return res.status(200).json({
        message: `Leave status updated to '${status}'.`,
        data: leave
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Server error", error: error.message });
    }
}

// Add Leave Type - Admin
exports.addLeaveType = async(req,res)=>{
    try {
        const {leave_type} = req.body;
        if(leave_type === "") return res.status(400).json("Required Filed");

        const isLeaveExist = await leaveTypeModel.findOne({leave_type:leave_type});
        if(isLeaveExist) return res.status(400).json("This Type of leave is already exist");

        const newLeaveType = new leaveTypeModel({leave_type});

        await newLeaveType.save();
        return res.status(201).json({message:"New Leave Type Added", newLeaveType});
    } catch (error) {
        return res.status(400).json("Error while adding leave type", error);
    }
}

// Admin
exports.fetchAllLeaveType = async(req,res)=>{
    try {
        const getAllLeave = await leaveTypeModel.find();
        if(getAllLeave === '') return res.status(400).json("No leave Type found in DB");
        return res.status(200).json(getAllLeave);
    } catch (error) {
        return res.status(400).json("Error while fetching the leave type");
    }
}

// Update LeaveType -- admin
exports.updateLeaveType = async(req,res)=>{
    const {id} = req.params;
    try {
        const isDepExist = await leaveTypeModel.findOne({_id:id});
        if(isDepExist === '') return res.status(400).json("leaveTypeModel Not exist");

        const updateDep = await leaveTypeModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true}  // return the updated doc & validate
        )
        if(updateDep) return res.status(200).json({message:"leaveTypeModel Update Successfully",updateDep});
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error while updating the leaveTypeModel");
        
    }
}

// Delete LeaveType -- Admin
exports.deleteLeaveType = async(req,res)=>{
    const {id} = req.params;
    try {
        const isDepExist = await leaveTypeModel.findOne({_id:id});
        if(isDepExist === '') return res.status(400).json("leaveTypeModel Not exist");

        const deleteDep = await leaveTypeModel.findByIdAndDelete({_id:id});
        if(deleteDep) return res.status(200).json("leaveType deleted successfuly");
    } catch (error) {
        return res.status(400).json("Error while updating the leaveTypeModel");
    }
}

exports.IndianHoliday = async(req,res)=>{
    try {
        return res.status(200).json({
            year: 2025,
            country: "India",
            holidays: indianHolidays,
        });
    } catch (error) {
        return res.status(400).json("Error while fetching holidays");
    }
}