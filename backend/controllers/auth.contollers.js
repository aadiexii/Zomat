import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';
import crypto from 'crypto'
import { sendOtpMail } from '../utils/mail.js';

export const signup =async (req, res) => {
    try {
        const {fullName, email, password, mobileNo, role} = req.body

        const user =await User.findOne({email})
        if(user){
            return res.status(400).json({
                message: "User Already Exists"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                message: "Password Must Be Atleast 6 Characters"
            })           
        }
        if(mobileNo.length < 10){
            return res.status(400).json({
                message: "MObile Number Must Be Atleast 10 Digits"
            })                 
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            fullName,
            email, 
            password: hashedPassword,
            mobileNo, 
            role
        })

        const token = await generateToken(newUser._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })

        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({
            message: "Sign Up Error"
        })
    }
}


export const signin =async (req, res) => {
    try {
        const {email, password} = req.body

        const user =await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "User Does Not Exists"
            })
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                message: "Password Does Not Match"
            })
        }

        const token = await generateToken(user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message: "Sign In  Error"
        })
    }
}


export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: "Signed Out Succesfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Sign Out  Error"
        })       
    }
}

export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "User Does Not Exists"
            })
        }

        const otp = crypto.randomInt(100000, 999999).toString()
        user.resetOtp = otp
        // milli Seconds
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()

        await sendOtpMail(email, otp)
        return res.status(200).json({
            message: "OTP sent succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `Send OTP error ${error}`
        })
    }
}

export const verifyOtp = async(req, res) => {
    try {
        const {email, otp} = req.body 

        const user = await User.findOne({email})
        if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
            return res.status(400).json({
                message: "Invalid User or Exipired OTP"
            })
        }
        user.resetOtp = undefined
        user.isOtpVerified = true;
        user.otpExpires = undefined

        //We are doing the user.save() because Updating a document in JS does NOT automatically update it in MongoDB.
        await user.save()
        return res.status(200).json({
            message: "OTP verified succesfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `OTP verify Error ${error}`
        })      
    }
}

export const resetPassword = async (req, res)=> {
    try {
        const {email, newpassword} = req.body

        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({
                message: "OTP Verification required or User Does Not Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10)
        user.password = hashedPassword;
        user.isOtpVerified = false

        await user.save()
        return res.status(200).json({
            message: "Password reset succesfull"
        })     
    } catch (error) {
        res.status(500).json({
            message: `OTP verify Error ${error}`
        })         
    }
}