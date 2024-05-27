const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "ThisIsSYJFoodApp";

router.post(
  "/createuser",
  [
    body("name", "name should be min 5 characters").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password", "password should be min 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "password should be min 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    let email = req.body.email;
    let password = req.body.password;
    try {
      let userdata = await User.findOne({ email });
      const pwdCompare = await bcrypt.compare(password, userdata.password);
      if (!userdata) {
        return res.status(400).json({ errors: "Email not matched" });
      } else if (!pwdCompare) {
        return res.status(400).json({ errors: "Wrong Password" });
      } else {
        const data = {
          user: {
            id: userdata.id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success: true, authToken: authToken });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
