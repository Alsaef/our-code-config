const multer= require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:'images/',
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = file.fieldname + '-' + uniqueSuffix + extension;
        cb(null, filename);
    }
})

const uploder=multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        const suportedImg=/PNG|JPG/;
        const extantion=path.extname(file.originalname);

        if (suportedImg.test(extantion)) {
            cb(null,true)
        } else {
            cb(new Error('uplode png jpg image'))
        }
    },
    limits: {
        fileSize: 5242880,
      },

})

module.exports=uploder;
