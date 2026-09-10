//this creates a "Mini Reception Desk" dedicated entirely to handling sign-ups and log-ins.
const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- SIGN UP ROUTE ---

router.post("/signup", async(req,res) => {

const {name,email,password} = req.body;

if(!email?.includes("@") || !password || password.length < 6){
   return res.status(400).json({error : "Invalid email and Password should be more than 6 characters"});
}

const existing = await User.findOne({email})
if(existing) return res.status(400).json({error : "Already an email registered previuously"});

// what is this i couldn't understand, what is hash and the new words, and '(password,10) what is this'
const hashed = await bcrypt.hash(password, 10);

//explain this also
const user = await User.create({name,email,password:hashed})
//explain this also , from starting of the code i didn't even see id , i have just wrote as name,email and password, now from where it came and more over why it has written as _id.
return res.status(201).json({id: user._id, name: user.name, email: user.email})

});

// --- LOG IN ROUTE ---
//the same question like before '/login' where does this page is going ,will it open any where ?.
router.post("/login", async(req,res) =>{

//where is the name here.
const {email,password} = req.body;

const user = await User.findOne({email});

//explain it.
if(!user || !(await bcrypt.compare(password, user.password))){
    return res.status(404).json({error : "Invalid credentials"});
}

//explain this line what is jwt and secret and why it is secret?
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

//explain
res.json({ token, name: user.name });

});

//where we are exporting , and why = router.
module.exports = router;