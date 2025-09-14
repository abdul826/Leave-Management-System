const cron = require('node-cron');
const employeeModel = require('../Model/employeeModel.js');

cron.schedule('* * 1 * *', async()=>{
    try {
        await employeeModel.updateMany({}, {$inc:{leave_balance:2}});
        console.log("Update the Leave Balance");
    } catch (error) {
        console.error('Error updating leave balances:', err);
    }
    
})