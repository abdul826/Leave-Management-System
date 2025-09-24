const empMOdel = require('../Model/employeeModel');
const jwt = require('jsonwebtoken');

/* const employeeAuthentication = async(req,res,next)=>{
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
} */

/* const employeeAuthorization = async(req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(!token) return res.status(400).json("Admin Token not found");

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        if(verifyToken){
            const rootUser = await empMOdel.findOne({_id:verifyToken._id});

            if (!rootUser) {
                return res.status(401).json({ message: "User not found" });
            }

            if (rootUser.role !== "admin") {
                return res.status(403).json({ message: "Admin access required" });
            }

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
} */

    const employeeAuthentication = async (req, res, next) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
            return res.status(401).json({ message: "Token not found" });
            }

            try {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const rootUser = await empMOdel.findOne({ _id: verifyToken._id });

            if (!rootUser) {
                return res.status(401).json({ message: "User not found" });
            }

            if (rootUser.role !== "user") {
                return res.status(403).json({ message: "Employee access required" });
            }

            req.rootUser = rootUser;
            req.token = token;
            req.empId = rootUser._id;

            next();
            } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token Expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid Token" });
            } else {
                return res.status(401).json({ message: "Token verification failed" });
            }
            }
        } catch (error) {
            return res.status(500).json({ message: "Authorization failed", error: error.message });
        }
    };
   
    const employeeAuthorization = async (req, res, next) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
            return res.status(401).json({ message: "Token not found" });
            }

            try {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const rootUser = await empMOdel.findOne({ _id: verifyToken._id });

            if (!rootUser) {
                return res.status(401).json({ message: "User not found" });
            }

            if (rootUser.role !== "admin") {
                return res.status(403).json({ message: "Admin access required" });
            }

            req.rootUser = rootUser;
            req.token = token;
            req.empId = rootUser._id;

            next();
            } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token Expired" });
            } else if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid Token" });
            } else {
                return res.status(401).json({ message: "Token verification failed" });
            }
            }
        } catch (error) {
            return res.status(500).json({ message: "Authorization failed", error: error.message });
        }
    };

module.exports = {
    employeeAuthentication,
    employeeAuthorization
};