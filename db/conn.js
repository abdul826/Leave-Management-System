const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB connected Successfully');
    
}).catch((err)=>{
    console.log('Error while connect to DB' + err);
});
