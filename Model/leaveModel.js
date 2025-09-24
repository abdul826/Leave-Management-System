const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    empId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },
    leaveTypeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"leaveType",
        required:true
    },
    leave_from:{
        type:Date,
        required:true
    },
    leave_to:{
        type:Date,
        required:true
    },
    leave_desc:{
        type:String,
        trim:true
    },
    documents:{
        type:[String],
    },
    leave_status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },
},{timestamps:true});


const leaveModel = new mongoose.model('Leave',leaveSchema);

module.exports = leaveModel;