const { ifError } = require('assert');
const multer= require('multer')
const path=require('path')
const uploder=multer({
    dest:'images/',
    fileFilter:(req,file,cb)=>{
        const suportedImg=/png|jpg/;
        const extantion=path.extname(file.originalname);

        if (suportedImg.test(extantion)) {
            cb(null,true)
        } else {
            cb(new Error('uplode png jpg image'))
        }
    },
    limits: {
        fileSize: 5000 * 5000,
      },

})

module.exports=uploder;
