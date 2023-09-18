 // payment methord
 app.post('/create-payment-intent', verify, async (req, res) => {
      const { price } = req.body;
      const amount = price * 100; // Convert price to cents (Stripe expects the amount in cents)
      
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
          payment_method_types: ['card']
        });
    
        res.send({
          clientSecret: paymentIntent.client_secret
        });
      } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Error creating payment intent' });
      }
    }); 
