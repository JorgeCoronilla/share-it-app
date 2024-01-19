'use server';
import { SignJWT } from 'jose';
import nodemailer from 'nodemailer';
import { getJwtSecretKey } from '../auth';

export async function createUrl(user: ConfirmRegister) {
  const token = await new SignJWT({
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(getJwtSecretKey());

  return `${user.baseUrl}register/confirm-email?token=${token}`;
}
export async function sendMail(
  subject: string,
  toEmail: string,
  otpText: string,
  name: string
) {
  const url = await createUrl({
    name,
    email: toEmail,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: 'Share-it',
    html: `
    <h1>SHARE ITTT${otpText}</h1>
    <p>Hi ${name},</p>
    <p>Thanks for joining Share-it! Please verify your email address by clicking the link below.</p>
    <a href="${url}">Verify your email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email Sent');
    return { success: 'Email Sent' };
  } catch (error) {
    console.log(error);
    return { error: (error as Error).message };
  }
}
