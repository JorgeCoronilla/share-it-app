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
    subject: `${name}, bienvenid@ a Share-it!`,
    text: 'Share-it',
    html: `
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div style="width: 100%">
        <img
          src="https://i.ibb.co/YNymX3C/Captura-desde-2024-01-25-11-22-52.png"
          alt="Share-it"
          style="width: 100%"
        />
      </div>
    </div>
  
    <main style="padding: 0 10%">
      <div style="width: fit-content; margin: 0 auto">
        <br />
        <h1
          style="
            background: linear-gradient(45deg, #6191c9, #3f51ee, #ff1b91);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 900;
            font-size: clamp(1.5rem, -16.5rem + 40vw, 6.5rem);
            font-family: Inter, sans-serif;
            text-align: center;
            color: white;
          "
        >
          !Bienvenid@!
        </h1>
      </div>
      <h3
        style="
          font-size: 1.2em;
          font-family: Inter, sanss-serif;
          text-align: center;
        "
      >
        Compartir gastos y llevar tus cuentas de una forma fácil
      </h3>
  
      <h6
        style="
          font-size: 1.2em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        <span
          style="
            font-size: 1.6em;
            font-family: Inter, sans-serif;
            font-weight: 900s;
            color: rgb(121, 52, 212);
          "
          >H</span
        >ola ${name}!
      </h6>
  
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        Gracias por unirte a Share-it. Ya casi lo tienes, solo confirma tu email a
        través del siguiente link:
      </p>
  
      <a
        href="${url}"
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(226, 226, 226);
          border-radius: 6px;
          background-color: black;
          padding: 1em 2em;
          margin: 2em auto;
          display: block;
          width: 10em;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8em;
          box-shadow: rgba(0, 0, 0, 0.288) 0px 2px 8px 0px;
        "
        >Verifica tu correo</a
      >
  
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        Saludos,
      </p>
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        El equipo de Share-it
      </p>
  
      <br />
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
          font-weight: 900;
        "
      >
        ¿Tienes alguna duda?
      </p>
  
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        Escribe a:
        <a href="mailto:shareit.rizedev@gmail.com">shareit.rizedev@gmail.com</a>.
      </p>
    </main>
    <br />
    <footer
      style="height: 4em; background-color: black; color: rgb(226, 226, 226) s"
    >
      <p
        style="
          font-size: 0.8em;
          font-family: Inter, sans-serif;
          color: white;
          font-weight: 700;
          padding: 2em;
          text-align: center;
        "
      >
        Share-it 2024 - Todos los derechos reservados
      </p>
    </footer>
  </body>
  
  `,
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
    subject: `Bienvenido a Share-it! - ${hostName} te ha invitado`,
    text: 'Share-it',
    html: `
    <head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 0">
    <div
      style="display: flex; flex-direction: row; justify-content: space-between"
    >
      <div style="width: 100%">
        <img
          src="https://i.ibb.co/YNymX3C/Captura-desde-2024-01-25-11-22-52.png"
          alt="Share-it"
          style="width: 100%"
        />
      </div>
    </div>
  
    <main style="padding: 0 15%">
      <div style="width: fit-content; margin: 0 auto">
        <br />
        <h1
          style="
            background: linear-gradient(45deg, #6191c9, #3f51ee, #ff1b91);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 900;
            font-size: clamp(1.5rem, -16.5rem + 40vw, 6.5rem);
            font-family: Inter, sans-serif;
            text-align: center;
            color: white;
          "
        >
          !Bienvenid@!
        </h1>
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
            font-size: 1.6em;
            font-family: Inter, sans-serif;
            font-weight: 900s;
            color: rgb(121, 52, 212);
          "
          >H</span
        >ola<span
          style="
            font-size: 1.6em;
            font-family: Inter, sans-serif;
            font-weight: 900s;
            color: rgb(121, 52, 212);
          "
          >!</span
        >
      </h6>
  
      <h3
        style="
          font-size: 1.2em;
          font-family: Inter, sans-serif;
          text-align: center;
        "
      >
        Compartir gastos y llevar tus cuentas de una forma fácil
      </h3>
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        ${hostName} te ha invitado a unirte al grupo "${groupName}"
      </p>
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        Por favor, completa el proceso usando el link de abajo
      </p>
  
      <a
        href="${url}"
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(226, 226, 226);
          border-radius: 6px;
          background-color: black;
          padding: 1em 2em;
          margin: 2em auto;
          display: block;
          width: 10em;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8em;
          box-shadow: rgba(0, 0, 0, 0.288) 0px 2px 8px 0px;
        "
        >Unirme a ${groupName}</a
      >
  
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        Saludos,
      </p>
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        El equipo de Share-it
      </p>
  
      <br />
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
          font-weight: 900;
        "
      >
        ¿Tienes alguna duda?
      </p>
  
      <p
        style="
          font-size: 1em;
          font-family: Inter, sans-serif;
          color: rgb(66, 66, 66);
        "
      >
        Escribe a:
        <a href="mailto:shareit.rizedev@gmail.com">shareit.rizedev@gmail.com</a>.
      </p>
    </main>
    <br />
    <footer
      style="height: 4em; background-color: black; color: rgb(226, 226, 226) s"
    >
      <p
        style="
          font-size: 0.8em;
          font-family: Inter, sans-serif;
          color: white;
          font-weight: 700;
          padding: 2em;
          text-align: center;
        "
      >
        Share-it 2024 - Todos los derechos reservados
      </p>
    </footer>
  </body>
  
  
  `,
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
