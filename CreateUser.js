app.post("/users",async(req,res)=>{
  const user= req.body;
  const query = { email: user.email }
  const existingUser = await userCallaction.findOne(query)
  if (existingUser) {
    return res.send({ message: 'user already exists' })
  }
  const result = await usersCollection.insertOne(user);
 res.send(result)
})
