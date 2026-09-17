import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async(req,res) => {
    try{
        const {name,email,password} = req.body;
   const existing = await User.findOne({email});
   if(existing) {
    return res.status(400).json({error : "Email already registered"});
   }
   const hashed = await bcrypt.hash(password,10);
   const user = await User.create({name,email,password : hashed})
     // Send the response so Postman finishes the request
    res.status(201).json({ message: "User registered successfully", userId: user._id });
    }
    catch(error){
         res.status(500).json({ error: error.message });
    }
};

export const Login = async (req, res) => {
    try {
    const {email,password} = req.body;

    // 1. Find the user in the database
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error : "Invalid Credentials"});
    }

    // 2. Compare the typed password with the hashed password in MongoDB
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
    return res.status(401).json({error : "Invalid Credentials"});
    }

    // 3. Generate token and return response
                            // payload                 secret-key             token expiry date
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, name: user.name });
}
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
