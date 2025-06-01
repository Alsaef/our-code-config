const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// use verify middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token; // cookie থেকে token নেওয়া হচ্ছে
  if (!token) {
    return res.status(401).send({ message: 'unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
};

  // jwt token related api
    app.post('/jwt', async (req, res) => {
      const userInfo = req.body;

      const token = jwt.sign(userInfo, process.env.JWT_ACCESS_SECRET, { expiresIn: '2h' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: false
      })

      res.send({ success: true })

    })

// remove token httpOny

app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,      // production
    sameSite: 'None'   // cross-origin
  });
  res.send({ message: 'Logout successful' });
});



// optional

const verifyEmailMatch = (req, res, next) => {
  const emailFromQuery = req.query.email;
  const emailFromToken = req.tokenEmail; // এটা ধরে নিচ্ছি তুমি আগে JWT verify middleware এ set করছো

  if (emailFromToken !== emailFromQuery) {
    return res.status(403).send({ message: 'forbidden access' });
  }

  next();
};




// secure api
