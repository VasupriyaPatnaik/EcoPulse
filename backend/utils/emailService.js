// utils/emailService.js
import nodemailer from 'nodemailer';

// Create transporter (using Gmail as example - you can configure other providers)
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
  });
};

// For development/testing, create a test account
const createTestTransporter = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Error creating test transporter:', error);
    return null;
  }
};

export const sendOTPEmail = async (email, otp, name) => {
  try {
    let transporter;
    let useRealEmail = false;

    // Try to use real Gmail first if credentials are provided
    if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD && 
        process.env.EMAIL_USERNAME !== 'your-gmail@gmail.com') {
      try {
        transporter = createTransporter();
        useRealEmail = true;
        console.log('📧 Using real Gmail service for OTP email');
      } catch (error) {
        console.log('⚠️  Real email failed, falling back to test service');
        transporter = await createTestTransporter();
      }
    } else {
      // Use test transporter for development
      transporter = await createTestTransporter();
      console.log('📧 Using test email service (Ethereal Email)');
    }
    
    if (!transporter) {
      // Final fallback: just log the OTP to console
      console.log('📧 EMAIL FALLBACK - OTP for', email, ':', otp);
      console.log('🔔 Please check console for OTP since email service is unavailable');
      return {
        success: true,
        messageId: 'console-fallback',
        previewUrl: null,
        fallback: true,
        otp: otp // Include OTP in response for console fallback
      };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"EcoPulse" <noreply@ecopulse.com>',
      to: email,
      subject: 'EcoPulse - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #16a34a; margin: 0; font-size: 28px;">🌍 EcoPulse</h1>
              <p style="color: #666; margin: 5px 0; font-size: 16px;">Saving the planet, one action at a time</p>
            </div>
            
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${name || 'there'}!</h2>
            
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              We received a request to reset your password. Use the OTP below to reset your password:
            </p>
            
            <div style="background-color: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #16a34a; font-weight: 600;">Your OTP Code</p>
              <h1 style="margin: 10px 0; font-size: 36px; color: #16a34a; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</h1>
              <p style="margin: 0; font-size: 12px; color: #16a34a;">Valid for 10 minutes</p>
            </div>
            
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account remains secure.
              </p>
            </div>
            
            <p style="color: #555; font-size: 14px; line-height: 1.6;">
              This OTP will expire in <strong>10 minutes</strong>. If you need a new OTP, please request another password reset.
            </p>
            
            <div style="border-top: 1px solid #e5e5e5; margin-top: 30px; padding-top: 20px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                Thank you for using EcoPulse to make a positive environmental impact! 🌱
              </p>
              <p style="color: #888; font-size: 12px; margin: 5px 0 0 0;">
                This is an automated email. Please do not reply.
              </p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // For development, log the preview URL
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: process.env.NODE_ENV !== 'production' ? nodemailer.getTestMessageUrl(info) : null
    };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const generateOTP = () => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};
