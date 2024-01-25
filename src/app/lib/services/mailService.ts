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
    subject: `Bienvenido a Share-it! Invitación de ${hostName}`,
    text: 'Share-it',
    html: `


    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    </style>
  </head>
  
  <div style="display: flex; flex-direction: row; justify-content: space-between">
    <div style="width: 75%">
      <img
        src="https://i.ibb.co/YNymX3C/Captura-desde-2024-01-25-11-22-52.png"
        alt="Share-it"
        style="width: 100%"
      />
    </div>
  
    <div style="width: 25%">
      <img
        src="https://i.ibb.co/ZGjDFVX/Captura-desde-2024-01-25-12-28-17.png"
        style="display: blocks; width: 100%"
      />
    </div>
  </div>
  <div style="width: fit-content; margin: 0 auto">
    <div style="width: 75%; margin: 0 auto">
      <h1
        style="
          background: linear-gradient(45deg, #6191c9, #3f51ee, #ff1b91);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
          font-size: 3em;
          font-family: Inter, sans-serif;
          text-align: center;
        "
      >
        !Bienvenid@!
      </h1>
    </div>
    <h3
      style="
        font-size: 1.5em;
        font-family: Inter, sanss-serif;
        text-align: center;
      "
    >
      Compartir gastos y llevar tus cuentas de una forma fácil
    </h3>
  </div>
  <h6
    style="
      font-size: 1.2em;
      font-family: Inter, sans-serif;
      color: rgb(66, 66, 66);
    "
  >
    <span
      style="
        font-size: 1.4em;
        font-family: Inter, sans-serif;
        color: rgb(66, 66, 66);
      "
      >H</span
    >ola!!
  </h6>
  <p
    style="font-size: 1em; font-family: Inter, sans-serif; color: rgb(66, 66, 66)"
  >
    ${hostName} te ha invitado a unirte al grupo "${groupName}"
  </p>
  <p
    style="font-size: 1em; font-family: Inter, sans-serif; color: rgb(66, 66, 66)"
  >
    Por favor, completa el proceso usando el link de abajo
  </p>
  <a
    href="${url}"
    style="font-size: 1em; font-family: Inter, sans-serif; color: rgb(66, 66, 66)"
    >Unirme a ${groupName}</a
  >
  
  <p>Saludos,</p>
  </br>
  <p>El equipo de Share-it</p>
  `,
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
