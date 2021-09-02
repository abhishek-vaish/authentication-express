const UserSchema = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const newUser = new UserSchema(req.body);
  const plainPassword = newUser.password;
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  newUser.password = hashPassword;
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ user });
    }
  });
};

exports.signin = async (req, res) => {
  const userDetails = req.body;
  await UserSchema.findOne({ email: userDetails.email }, (err, user) => {
    if (err) {
      return res.json({ err: err });
    }
    if (
      bcrypt.compare(userDetails.password, user.password, (err, result) => {
        if (err) {
          return false;
        }
        return result;
      })
    ) {
      return res.json({ user });
    } else {
      return res.json({ err: "incorrect username/password" });
    }
  });
};
