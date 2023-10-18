 imageUrls:{
     type:String,
     require:true,
     validate:{
      validator:(value)=>{
        if (!Array.isArray) {
            return false
        }
        let isValid=true
        value.forEach(url => {
            if (!validator.isURL(url)) {
              isValid= false
            } 
        });
        return isValid
      },
      message:'validate url'
     }
    },
