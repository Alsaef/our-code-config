const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI; //local DB URL
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
      dbConnection = client.db("MyUser");
      console.log("Successfully connected to MongoDB.");
      return callback();
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      return callback(error);
    }
  },

  getDb: function () {
    return dbConnection;
  },
};
