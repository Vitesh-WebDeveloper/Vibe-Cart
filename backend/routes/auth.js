//this creates a "Mini Reception Desk" dedicated entirely to handling sign-ups and log-ins.
const router = require('express').Router();
const requireAuth = require('../middleware/auth.middleware');
//This is your Password Scrambler.
//Bcrypt turns "password123" into unreadable gibberish (like $2a$10$X8...).
const bcrypt = require('bcryptjs');

//This is your VIP Wristband Printer
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- SIGN UP ROUTE ---

router.post("/signup", async(req,res) => {

const {name,email,password} = req.body;

if(!email?.includes("@") || !password || password.length < 6){
   return res.status(400).json({error : "Invalid email and Password should be more than 6 characters"});
}

const existing = await User.findOne({email})
if(existing) return res.status(400).json({error : "Already an email registered previously"});

//This tells the scrambler, "Take their password and scramble it 10 times".
const hashed = await bcrypt.hash(password, 10);

//This tells the Mongoose robot to take the name, email, and the scrambled password, and permanently save it as a new customer in the MongoDB warehouse.
const user = await User.create({name,email,password:hashed})
return res.status(201).json({id: user._id, name: user.name, email: user.email})
});

// --- LOG IN ROUTE ---
router.post("/login", async(req,res) =>{
const {email,password} = req.body;

const user = await User.findOne({email});

if(!user || !(await bcrypt.compare(password, user.password))){
    return res.status(404).json({error : "Invalid credentials"});
}

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

res.json({ token, name: user.name });
});

// Notice how 'requireAuth' is sitting right in the middle? 
// Express will run the bouncer first. If the bouncer calls next(), it runs the rest.
router.get('/me', requireAuth, async (req, res) => {
  // Search the database for the user, but explicitly EXCLUDE the password from the data
  const user = await User.findById(req.userId).select('-password');
  res.json(user);

});

module.exports = router;