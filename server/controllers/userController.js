import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async(req, res)=>{
    const {fullName, email, password, bio} = req.body;

    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success: false, message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
            bio
        });
        const token = generateToken(newUser._id);
        await newUser.save();
        res.json({success: true, userData: newUser, token, message: "User created successfully"});

    }catch(error){
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({success: false, message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = generateToken(userData._id);
        res.json({success: true, userData, token, message: "Login successful"});
    }catch(error){
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}

export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}

export const updateProfile = async (req, res) => {
    try{
        const {profilePic, bio, fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true});
        }else{
            const upload = await cloudinary.uploader.upload(profilePic)
            
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName, profilePic: upload.secure_url}, {new: true});
        }
        res.json({success: true, userData: updatedUser, message: "Profile updated successfully"});    
    }catch(error){
        console.log(error.message);
        return res.json({success: false, message: error.message});
    }
}