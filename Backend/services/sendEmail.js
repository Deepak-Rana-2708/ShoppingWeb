import nodemailer from "nodemailer";

export const emailSent = async (email, otp, fname) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
      connectionTimeout: 10000
    });

    const mail = await transporter.sendMail({
      from: `"Shopping Web" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code for Password Reset",

      text: `Hello ${fname},

Your OTP for password reset is ${otp}. It is valid for 2 minutes.

Thank you!`,

      html: `
        <h2>Hello ${fname}</h2>
        <p>Your OTP for password reset is <strong>${otp}</strong>. It is valid for 2 minutes.</p>
        <p>Thank you!</p>
      `,
    });

    return mail;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};