// verify Admin
    // use mongoDB
    const verifyAdmin= async(req,res,next)=>{
       const email=req.params.email;
       const query={email: email}
       const user= await usersCallections.findOne(query)
      if (user?.role !== "admin") {
         return res.status(403).send({error:true,message:'You Are Not Admin'})
      }
      next()
    }
