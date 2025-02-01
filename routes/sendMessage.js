// const nodemailer = require('nodemailer');
// const querystring = require('querystring');
// const { Telegraf } = require('telegraf');


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'attarsalahtoto@gmail.com', 
//         pass: 'onxh hfhf nyyn sngm', 
//     },
// });


// const bot = new Telegraf('6971192340:AAHwU9T11kUvrGVHrhiHtPub-_UQFECPyVI'); 
// const chatId = '5253049795'; 


// const handleFormSubmission = (req, res) => {
//     let body = '';

//     req.on('data', (chunk) => {
//         body += chunk.toString();
//     });

//     req.on('end', () => {
//         const formData = querystring.parse(body);

        
//         sendEmail(formData);

        
//         sendTelegramMessage(formData);

        
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ success: 'Form submitted successfully!' }));
//     });
// };


// const sendEmail = (formData) => {
//     const mailOptions = {
//         from: 'attarsalahtoto@gmail.com', 
//         to: 'attarsalah05603@gmail.com', 
//         subject: `New Contact Form Submission: ${formData.subject}`, 
//         text: `
//         Name: ${formData.name}
//         Address: ${formData.address}
//         Phone: ${formData.phone}
//         Product: ${formData.product}
//         Subject: ${formData.subject}
//         Message: ${formData.message}
//         `, 
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Failed to send email:', error);
//         } else {
//             console.log('Email sent:', info.response);
//         }
//     });
// };


// const sendTelegramMessage = (formData) => {
//     const message = `
//     New Contact Form Submission:
//     Name: ${formData.name}
//     Address: ${formData.address}
//     Phone: ${formData.phone}
//     Product: ${formData.product}
//     Subject: ${formData.subject}
//     Message: ${formData.message}
//     `;

//     bot.telegram.sendMessage(chatId, message)
//         .then(() => {
//             console.log('Telegram message sent successfully');
//         })
//         .catch(error => {
//             console.error('Failed to send Telegram message:', error);
//         });
// };


// bot.launch();


// module.exports = handleFormSubmission;