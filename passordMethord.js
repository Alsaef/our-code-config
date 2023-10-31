userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };


// password # hash password
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const password = this.password;
    const saltRounds = 10; // You need to specify the salt rounds
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
  }
  next();
});
