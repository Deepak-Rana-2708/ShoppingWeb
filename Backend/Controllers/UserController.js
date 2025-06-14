import User from "../model/UserModel.js";
import Order from "../model/OrderModel.js";
import Contact from "../model/Contact.js";
import Otp from "../model/Otp.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { OrderData } from "./OrderController.js";
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';

dotenv.config();

export const CreateUser = async (req,res) => {
    try {

      const { fname, lname, email, password, phone,address } = req.body;
    
        if (!fname || !lname || !email || !password || !phone || !address) {
        return res.status(400).json({
            success: false,
            message : "Please Fill All Data!"
      });
      }
      if (phone.length !== 10) {
          return res.status(400).json({
              success: false,
                  message: "Please provide a valid phone number (10 digits)!"
          })
        }
        const hashpass = bcrypt.hashSync(password, 10);
        const user = await User.create({
            fname : fname,
            lname : lname,
            email : email,
            password: hashpass,
          phone: phone,
            address: address
        });
     return res.status(201).json({
       success: true,
      //  fname : fname,
        message: "User Account Created Successfully!"
      })
    } catch (error) {
        // console.log(error);
      return res.status(500).json({
          success: false,
          message: "Server Side Error !"
      })
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log( password);
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill All Data"
      });
    } 

    const user = await User.findOne({ where: { email } });
    // console.log(user.id);
    
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid Email"
        })
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message : "Please Check Email Or Password!"
        })
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now()+3600000),
    })

      res.status(200).json({
        success: true,
        token: token,
        user_id: user.id,
        user_name : user.fname,
        message: "Login Successfully!"
      });
      

    }
   catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Side Error !"
      })
    }
}

export const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;
    if (!email) {
     return res.status(400).json({
        success: false,
        message: "please provide your email"
      })
    }

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Valid Email !"
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpData = await Otp.create({
      email: email,
      otp: otp,
      expires: new Date(Date.now() + 2 * 60 * 1000)  // 2 minutes expiry
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
      
    const mail = await transporter.sendMail({
      from: `"Shopping Web"<${process.env.EMAIL_USER}>`,
      to: email,
      subject: " Your OTP Code for Password Reset",
      text: `Hello ${user.fname},\n\n Your OTP for password reset is ${otp}. It is valid for 2 minutes.\n\nThank you!`,
      html: `<h2>Hello ${user.fname}</h2><p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 2 minutes.</p><p>Thank you!</p>`
    })

    res.status(200).json({
      success: true,
      message: "OTP Sent to Your Email!",
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error !"
    })
  }
}

export const verifyOtp = async (req,res) => {
  try {
    const { email,otp } = req.body;

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Please provide the OTP"
    })
  }
    // const OTP = await Otp.findOne({ where: { email } });
    const OTP = await Otp.findOne({
      where: { email },
      order: [['createdAt', 'DESC']]
    });
    if (OTP) {
      await Otp.destroy({
        where: {
          email,
          id : {[Op.ne]: OTP.id}
        }
      })
    }
  if (OTP.otp !== otp || OTP.email !== email) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP or Email!"
    })
  }

  if (OTP.expires < new Date()) {
    return res.status(400).json({
      success: false,
      message: "OTP has expired! Please request a new one."
    })
  }
  return res.status(200).json({
    success: true,
    message: "OTP Verified Successfully!",
  })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !"
    })
  }
}

export const ResetPassword = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a new password"
      })
    }
    const hashpass = bcrypt.hashSync(password, 10);

    await User.update({ password: hashpass }, { where: { email } });

    await Otp.destroy({ where: { email } });

    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully!"
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error !"
    })
  }
}

export const Logout = (req, res) => {
  try {
    res.clearCookie('token').status(200).json({
      success: true,
      message : "Logout Successfully!"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message : "Internal Server Error !"
    })
 }
}

export const Testing = (req,res) => {
    res.send('hlow it working : ');
}
