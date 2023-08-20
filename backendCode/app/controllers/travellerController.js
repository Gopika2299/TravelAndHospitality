const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../config/logger');
const Catalog = require('../models/Catalog');
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');
const otpGenerator = require('generate-otp');

const secretKey = '9dbf6a1c8eb54fa0b44e9e47f5c1a7d3a67f72458c4f3a1f8f059b6e856c38e1';
exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save OTP to the user's account in the database
    const newUser = new User({
      email,
      password:hashedPassword,
      role,
      otp: otp, // Save OTP here
    });

    await newUser.save();

    // Send OTP via email (as in previous example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gopikasivasakthik@gmail.com', // Your Gmail email address
        pass: 'vxanupwaevifxwfh',       // Your Gmail password or app-specific password
      },
    });

    const mailOptions = {
      from: 'gopikasivasakthik@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
      otp: otp, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending OTP', error);
      } else {
        console.log('OTP sent', info.response);
      }
    });

    res.status(200).json({ message: 'OTP sent for verification' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.verifyOTP = async (req, res) => {
  const {  otp } = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  } 
  try {
    // Verify OTP
    if (user.otp === otp) {
      // Mark user as verified or proceed with registration

      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(401).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


exports.login = async (req, res) => {
  try {
    const user = await User.findOne( {email: req.body.email} );
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey,  { expiresIn: '5m' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.verifyToken = async (req, res, next) =>  {
  const token = req.headers.authorization;
  const tokenWithoutBearer = token.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(tokenWithoutBearer, secretKey);
    req.user = decoded;
    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    await User.findByIdAndUpdate(req.user.userId, { isEmailVerified: true });
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.getTravelerBookings = async (req, res) => {
  const travelerId = req.user.userId;

  try {
   const bookings = await Booking.find({ traveler: travelerId });
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.getTravelCatalogs = async (req, res) => {
  try {
     const catalogs = await Catalog.find();
    res.json({ catalogs });
  } catch (error) {
    logger.error('ee',error)
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.bookTrip = async (req, res) => {
  const travelerId = req.user.userId;
  const { catalogId } = req.body;
  try {
    const newBooking = new Booking({ traveler: travelerId, catalog: catalogId });
    await newBooking.save();
    res.status(201).json({ message: 'Trip booked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

