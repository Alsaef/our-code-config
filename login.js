module.exports.login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if (!email||!password) {
            return res.status(401).json({
                status: 'Provide email and password for authentication.',
            })
        }
       

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
              status: 'Invalid email or password.',
            });
          }
          const passwordMatch = await user.comparePassword(password);

          if (!passwordMatch) {
            return res.status(401).json({
              status: 'Invalid email or password.',
            });
          }


    const token= genarateToken(user) // create your token and empliment this code

          res.status(200).json({
            status: 'Login successful',
            data: {user,token},
        })

    } catch (error) {
      next(error) 
    }
}
