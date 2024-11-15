app.get("/api/get-current-user", async (req, res, next) => {
  try {
    const { email } = req.query;

    // Check if the email query parameter is provided
    if (!email) {
      return res
        .status(400)
        .send({ message: "Email query parameter is required" });
    }

    // Query to find the user
    const query = { email: email };

    // Specify the fields to return
    const projection = {
      name: 1, // Include `name`
      email: 1, // Include `email`
      isVerified: 1, // Include `isVerified`
      _id: 1, // Include `_id`
    };

    // Fetch the user with the specific fields
    const result = await userCollection.findOne(query, { projection });

    // If the user is not found, send a 404 response
    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send the result
    res.send(result);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    next(error);
  }
});
