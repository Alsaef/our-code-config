 // payment methord
    app.post("/create-payment-intent",async(req,res)=>{
       const {price}=req.body;
       const ammount=price*100;
       const paymentIntent= await stripe.paymentIntents.create({
         ammount:ammount,
         currency: "usd",
         payment_method_types:["card"]
       });
       res.send({
        clientSecret: paymentIntent.client_secret,
       })
    })
