    const stripe = useStripe();
    const elements = useElements();
    const[clientSecret,setClientSecret]=useState('')
   const {user}=useContext(AuthContext)
    const [axiosSecure]=UseSecureAxios()
    const [processing,setProcessing]=useState(false)

    useEffect(() => {
      axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
    }, [price,axiosSecure]);
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (error) {
        console.log('error', error);
        Swal.fire(`${error.message}`);
        setProcessing(false); // Set processing to false when there's an error
      } else {
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                email: user?.email || "Unknown",
                name: user?.displayName || 'Unknown'
              },
            },
          },
        );
    
        if (confirmError) {
          console.log(confirmError);
          setProcessing(false); // Set processing to false when there's an error
        } else {
          console.log(paymentIntent);
          if (paymentIntent.status === 'succeeded') {
            const transactionId = paymentIntent.id;
            Swal.fire(`Your Id ${transactionId}`);

            const payment={
              email: user?.email,
              transactionId: paymentIntent.id,
              price,
              date: new Date(),
              status:'Service Pending',
              quantaty:cart.length,
              menuItems: cart.map(item => item.menuItemId),
              itemsId:cart.map(item => item._id),
              items:cart.map(item => item.item)
            }
             axiosSecure.post('/payments',payment)
             .then(res=>{
              console.log(res.data)
  
             })
          } else {
            // Handle payment status other than 'succeeded' here
            console.log('Payment not succeeded:', paymentIntent.status);
            // You might want to provide some feedback to the user
          }
          setProcessing(false); // Set processing to false when the payment is done
        }
      }
    }
