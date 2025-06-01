const admin = require("firebase-admin");
//security env file production 
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8')
const serviceAccount = JSON.parse(decoded);

// temporary development mode
var serviceAccount = require("./firebase-admin-key.json");

// middleware
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'unauthorized access' })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    console.log('decoded token', decoded);
    req.decoded = decoded;
    next();
  }
  catch (error) {
    return res.status(401).send({ message: 'unauthorized access' })
  }
}


const verifyEmailMatch = (req, res, next) => {
  const emailFromQuery = req.query.email;
  const emailFromToken = req.decoded?.email;

  if (emailFromQuery !== emailFromToken) {
    return res.status(403).send({ message: 'forbidden access' });
  }

  next();
};

// secure your api
