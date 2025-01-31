import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(fullname, email, phoneNumber, password, role);
        
        // checking for missing field
        if(!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message : "Something is missing.",
                success : false
            });
        };

        // checking if email is already existing
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message : "User already exist with this email.",
                success : false
            });
        }

        // converting password to hash

        const hashedPassword = await bcrypt.hash(password, 10); // second param is len of hashed value

        await User.create({
            fullname, 
            email, 
            phoneNumber, 
            password  : hashedPassword, 
            role
        });

        return res.status(201).json({
            message : "Account created successfully.",
            success : true
        });

    } catch(error) {
        console.log(error); 
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // checking for missing field
        if(!email || !password || !role) {
            return res.status(400).json({
                message : "Something is missing.",
                success : false
            });
        };


        let user = await User.findOne({email});

        // checking if user exist or not
        if(!user) {
            return res.status(400).json({
                message : "Incorrect email or password.",
                success : false
            });
        }

        // checking if password entered is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatch) {
            return res.status(400).json({
                message : "Incorrect email or password.",
                success : false
            });
        }

        // checking if role is correct or not

        if(role !== user.role) {
            return res.status(400).json({
                message : "Account doesn't exist with current role.",
                success : false
            });
        }

        const tokenData = {
            userId : user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn : '1d'}); // 1d means 1 day
        
        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        return res.status(200).cookie("token", token, {maxAge : 1 * 24 * 60 * 60 * 1000, httpOnly : true, sameSite : 'strict'}).json({
            message : `Welcome back ${user.fullname}`,
            user,
            success : true
        })

    } catch (error) {
        console.log(error); 
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge : 0}).json({
            message : "Logged out successfully.",
            success : true
        });
    } catch (error) {
        console.log(error); 
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // if(!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message : "Something is missing.",
        //         success : false
        //     });
        // };

        // cloudinary will come here
        let skillsArray;
        if(skills) {
            skillsArray = skills.split(",");
        }
        
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({
                message : "User not found.",
                success : false
            });
        }
        // updating data
        if(fullname) {
            user.fullname = fullname;
        }
        if(email) {
            user.email = email;
        }
        if(phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if(bio) {
            user.profile.bio = bio;
        }
        if(skills) {
            user.profile.skills = skillsArray;
        }
        

        // Later resume will come here...

        await user.save();

        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role : user.role,
            profile : user.profile
        }

        return res.status(200).json({
            message : "Profile updated successfully.",
            user,
            success : true
        });

    } catch (error) {
        console.log(error); 
    }
}