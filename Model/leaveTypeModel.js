const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
    leave_type:{
        type:String,
        required:true
    }
},{timestamps:true});

const leaveTypeModel = new mongoose.model('leaveType',leaveTypeSchema);

module.exports = leaveTypeModel;