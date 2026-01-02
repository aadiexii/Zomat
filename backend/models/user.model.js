import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },email: {
        type: String,
        required: true,
        unique: true
    },password: {
        type: String,
        //If someone prefer to login through google auth, for that reason we are not making the required as true.
    },mobileNo: {
        type: String,
        required: true
    },role: {
        type: String,
        enum: ["User", "Owner", "DeliveryPartner"],
        required: true
    }, resetOtp: {
        type: String,
    }, isOtpVerified: {
        type: Boolean,
        default: false
    }, otpExpires: {
        type: Date
    }      
}, {
   timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User