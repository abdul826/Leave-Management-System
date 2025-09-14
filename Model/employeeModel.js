const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    brithday:{
        type:Date
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    leave_balance: {
        type: Number,
        default: 0
    }
},{timestamps:true});

employeeSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

const employeeModel = new mongoose.model('Employee',employeeSchema);

module.exports = employeeModel;