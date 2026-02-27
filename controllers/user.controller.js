const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = require('../helpers/send-email');

/* =========================
   SIGN UP
========================= */
async function signUp(req, res) {
  try {

    const existingUser = await models.User.findOne({
      where: { email: req.body.email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists!"
      });
    }

    const hash = await bcryptjs.hash(req.body.password, 10);

    // buat token verification
    const verifyToken = uuidv4();

    const user = await models.User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      verify_token: verifyToken,
      is_verified: false
    });

    // kirim email
    await sendVerificationEmail(user.email, verifyToken);

    res.status(201).json({
      message: "User registered. Please check your email for verification."
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error.message
    });
  }
}

async function Login(req, res) {
  try {

    const user = await models.User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // cek verifikasi email
    if (!user.is_verified) {
      return res.status(401).json({
        message: "Please verify your email first"
      });
    }

    const result = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Authentication success",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function verifyEmail(req, res) {
  try {

    const token = req.params.token;

    const user = await models.User.findOne({
      where: { verify_token: token }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid verification token"
      });
    }

    user.is_verified = true;
    user.verify_token = null;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  signUp,
  Login,
  verifyEmail
};