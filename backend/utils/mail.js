import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});


export const sendOtpMail = async (to, otp) => {
  try {
      await transporter.sendMail({
          from: process.env.EMAIL,
          to: to,
          subject: "Reset Your Password",
          html: `<p> Your OTP for password rest is <b>${otp}</b>. It expires in 5 minutes</p>`
      })   
      
      console.log("OTP Email sent successfully")
  } catch (error) {
      console.error("Error in sending email: ", error)
  }
}