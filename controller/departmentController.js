const departmentModel = require('../Model/departmentModel.js');

// Add Department -- Admin
exports.addDepartment = async(req,res)=>{
    try {
        const {departmentName} = req.body;

        if(departmentModel !== ''){
            const isExist = await departmentModel.findOne({departmentName:departmentName});

            if(isExist) return res.status(400).json("Department already exist");

            const newDep = new departmentModel({
                departmentName
            });

            await newDep.save();
            res.status(200).json(newDep);
        }else{
            res.status(400).json("Filed is required");
        }
    } catch (error) {
        return res.status(400).json("Something went wrong. Please try again later.");
    }
}

// // Fetch Department -- Admin
exports.getAllDepartment = async(req,res)=>{
    try {
        const getDepartment = await departmentModel.find();
        if(getDepartment){
            return res.status(200).json({message:"Department Fetch successfully", getDepartment});
        }else{
            return res.status(400).json("Error while fetching department")
        }
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
}

// Update department -- admin
exports.updateDepartment = async(req,res)=>{
    const {id} = req.params;
    try {
        const isDepExist = await departmentModel.findOne({_id:id});
        if(isDepExist === '') return res.status(400).json("Deartment Not exist");

        const updateDep = await departmentModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true}  // return the updated doc & validate
        )
        if(updateDep) return res.status(200).json({message:"Department Update Successfully",updateDep});
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error while updating the Department");
        
    }
}

// Delete Department -- Admin
exports.deleteDepartment = async(req,res)=>{
    const {id} = req.params;
    try {
        const isDepExist = await departmentModel.findOne({_id:id});
        if(isDepExist === '') return res.status(400).json("Deartment Not exist");

        const deleteDep = await departmentModel.findByIdAndDelete({_id:id});
        if(deleteDep) return res.status(200).json("Department deleted successfuly");
    } catch (error) {
        return res.status(400).json("Error while updating the Department");
    }
}