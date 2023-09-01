import nodemailer from 'nodemailer';


// create reusable transporter object using the default SMTP transport
export const Transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
 //secure: false, // true for 465, false for other ports
  //secureConnection: true,
  requireTLS: true,
  tls: { ciphers: 'SSLv3' },
  auth: {
    user: 'jlopez@gdintegral.com', // generated ethereal user
    pass: 'GDI-2023!', // generated ethereal password
    
  },
});

Transporter.verify().then(() => {
  console.log('listo para enviar correos');
});

