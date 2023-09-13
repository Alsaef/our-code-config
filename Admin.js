   app.get('/users/admin/:email',async(req,res)=>{
      const email = req.params.email;
      const query={email: email}
      const user= await usersCallections.findOne(query)
      const result={admin: user?.role==='admin'}
      res.send(result)
    })

// update user make admin
    app.patch('/users/admin/:id',async(req,res)=>{
      const id= req.params.id
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await usersCallections.updateOne(filter,updateDoc)
      res.send(result)
    })
   
