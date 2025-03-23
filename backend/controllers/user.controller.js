import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(fullname, email, phoneNumber, password, role);

        // Checking for missing fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Checking if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handling file upload
        let profilePhotoUrl = null;
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePhotoUrl = cloudResponse.secure_url;
            } catch (uploadError) {
                return res.status(500).json({
                    message: "Error uploading profile photo.",
                    success: false,
                });
            }
        }

        // Creating the user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl || "", // Default to empty string if no photo
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            success: false,
        });
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
        // console.log(fullname, email, phoneNumber, bio, skills);
        
        // const file = req.file;
        // if(!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message : "Something is missing.",
        //         success : false
        //     });
        // };

        // cloudinary will come here
        const file = req.file;
        let cloudResponse;
        const fileUri = getDataUri(file);
        console.log(fileUri)
        if (file) {
            try {
                cloudResponse = cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "auto" // Auto-detects image, video, etc.
                });
            } catch (error) {
                return res.status(500).json({
                    message: "Error processing file upload.",
                    success: false
                });
            }
        }

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
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


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