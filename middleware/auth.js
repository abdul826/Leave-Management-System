const empMOdel = require('../Model/employeeModel');
const jwt = require('jsonwebtoken');

const employeeAuthentication = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        
        if(!token) return res.status(400).json("TOken not found");

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        if(verifyToken){
            const rootUser = await empMOdel.findOne({_id:verifyToken._id});

            if(rootUser){
                req.rootUser = rootUser;
                req.token = token;
                req.empId = rootUser._id
            }
            next();
        }else{
            return res.status(401).json("Unauthorized User");
        }
    } catch (error) {
        return res.status(400).json("Something wrong in token");
    }
}

const employeeAuthorization = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token) return res.status(400).json("TOken not found");

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        if(verifyToken){
            const rootUser = await empMOdel.findOne({_id:verifyToken._id});

            if(rootUser.role == 'admin'){
                req.rootUser = rootUser;
                req.token = token;
                req.empId = rootUser._id
            }else{
                return res.status(403).json("Admin can access this resource");
            }
            next();
        }else{
            return res.status(401).json("Unauthorized User");
        }
    } catch (error) {
        return res.status(400).json("Something wrong in token");
    }
}

module.exports = {
    employeeAuthentication,
    employeeAuthorization
};