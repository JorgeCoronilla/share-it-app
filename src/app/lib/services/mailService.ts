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

  return `${user.baseUrl}/register/confirm-email?token=${token}&email=${user.email}`;
}
export async function sendConfirmationMail(toEmail: string, name: string) {
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
    subject: 'Bienvenido a Shaer-it!',
    text: 'Share-it',
    html: `
    <h1>Compartir gastos de una forma fácil</h1>
    <h4>Hi ${name},</h4>
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

export async function sendInvitaionMail({
  toEmail,
  hostName,
  groupId,
  groupName,
}: {
  toEmail: string;
  hostName: string;
  groupId: string;
  groupName: string;
}) {
  const url = await createInvitationUrl({
    groupId,
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
    subject: 'Bienvenido a Share-it!',
    text: 'Share-it',
    html: `
    <h1>Compartir gastos de una forma fácil</h1>
    <h4>Hi!</h4>
    <p>${hostName} te ha invitado a unirte al grupo "${groupName}"</p>
    <p>Por favor, completa el proceso usando el link de abajo </p>
    <a href="${url}">Unirme a ${groupName}</a>`,
  };
  console.log(mailOptions);
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email Sent');
    return { success: 'Email Sent' };
  } catch (error) {
    console.log(error);
    return { error: (error as Error).message };
  }
}

export async function createInvitationUrl({
  groupId,
  email,
  baseUrl,
}: {
  groupId: string;
  email: string;
  baseUrl: string;
}) {
  const token = await new SignJWT({
    groupId,
    email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(getJwtSecretKey());

  return `${baseUrl}/register/invited-user?token=${token}&email=${email}`;
}
