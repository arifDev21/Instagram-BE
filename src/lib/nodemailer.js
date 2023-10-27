const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
 auth: {
  user: process.env.nodemailer_email,
  pass: process.env.nodemailer_password
 },
 host: 'smtp.gmail.com',
 service: 'gmail'
});

const mailer = async ({ subject, html, to, text }) => {
 await transport.sendMail({
  subject: subject || 'testing',
  html: html || '<h1> send through api </h1>',
  to: to || 'mrdwnqdry@gmail.com',
  text: text || 'hello ridwan'
 });
};

module.exports = mailer;
