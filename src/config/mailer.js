import nodemailer from 'nodemailer';


// create reusable transporter object using the default SMTP transport
export const Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
 secure: true, // true for 465, false for other ports
  //secureConnection: true,
  //requireTLS: true,
  //tls: { ciphers: 'SSLv3' },
  auth: {
    user: 'admsuprachat@gmail.com', // generated ethereal user
    pass: 'njoqngtaxrsauioe', // generated ethereal password
    
  },
});

Transporter.verify().then(() => {
  console.log('listo para enviar correos');
});

