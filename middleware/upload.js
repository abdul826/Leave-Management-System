const multer = require('multer');
const path = require('path');

// const MAX_FILE_SIZE = 5*1024*1024;  // 5MB


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/');
    },
    filename: function(req,file,cb){
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null,uniqueName);
    }
});

// Apply filter
const filterFile = (req,file,cb)=>{
    if(path.extname(file.originalname).toLowerCase() === '.pdf' && file.mimetype === 'application/pdf'){
        cb(null, true);
    }else {
    cb(new Error('Only PDF files are allowed'), false);
  }
}

const upload = multer({storage, filterFile});

module.exports = upload;