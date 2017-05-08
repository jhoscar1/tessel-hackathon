const express = require('express');
const mailer = require('nodemailer');
const fs = require('fs');
const inlineBase64 = require('nodemailer-plugin-inline-base64');

const app = express();

const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tesselcamara@gmail.com',
    pass: 'fullstack',
  },
});

transporter.use('compile', inlineBase64());

app.post('/upload-pic', (req, res) => {
  let imageData = new Buffer(0);
  req.on('data', (chunk) => {
    imageData = Buffer.concat([imageData, chunk]);
  });

  req.on('end', () => {
    const template = `
    <h1>Door Opened!</h1>
    <p>We register an unauthorized entrance</p>
    <img src="data:image/png;base64,${imageData.toString('base64')}">
    `;
    const mailOptions = {
      from: '"Tessel Security Camara👻"- <tesselcamara@gmail.com>', // sender address
      to: 'guilleaszyn@gmail.com', // list of receivers
      subject: 'ALERT! Door Opened', // Subject line
      html: template, // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error);
      }
      res.send(info);
    });
  });
});

app.listen(3001);
