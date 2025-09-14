const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName:{
        type:String,
        required:true
    },
},{timestamps:true});

const departmentModel = new mongoose.model('Department',departmentSchema);
module.exports = departmentModel;