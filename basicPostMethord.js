try{
      const db=getDb()
      const user=req.body
      const result= await db.collection('userCollection').insertOne(user)
      res.send('successful')
   }
   catch(err){
     next(err)
   }
