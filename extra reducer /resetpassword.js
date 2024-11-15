app.post('/api/v1/request-reset-password', async (req, res) => {
  const { email } = req.body;
  
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // Token valid for 15 minutes

  await usersCollection.updateOne(
    { email },
    { $set: { resetToken, resetTokenExpiresAt } }
  );

  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: "admin@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click this link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      return res.status(500).send({ message: 'Failed to send email' });
    } else {
      console.log("Email sent: ", info.response);
      return res.status(200).send({ message: 'Password reset link sent to email' });
    }
  });
});


// update or reset
app.post('/api/v1/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await usersCollection.findOne({ resetToken: token });
  if (!user || user.resetTokenExpiresAt < Date.now()) {
    return res.status(400).send({ message: 'Invalid or expired token' });
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await usersCollection.updateOne(
    { resetToken: token },
    { 
      $set: { password: hashPassword },
      $unset: { resetToken: "", resetTokenExpiresAt: "" }
    }
  );

  res.status(200).send({ message: 'Password reset successfully' });
});

