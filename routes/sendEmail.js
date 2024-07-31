// const express = require("express");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const router = express.Router();

// // Create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Set up storage for multer to handle file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // API endpoint to handle job application form submission
// router.post("/", upload.single("resume"), async (req, res) => {
//   const {
//     fullName,
//     email,
//     position,
//     experience,
//     education,
//     english,
//     casteCertificate,
//     salary,
//   } = req.body;

//   const resume = req.file;

//   if (!resume) {
//     return res.status(400).json({ error: "No resume file uploaded." });
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.TO_EMAIL,
//     subject: `Job Application: ${position}`,
//     text: `
//       Full Name: ${fullName}
//       Email: ${email}
//       Position: ${position}
//       Experience: ${experience}
//       Education: ${education}
//       English: ${english}
//       Caste Certificate: ${casteCertificate}
//       Last In-Hand Monthly Salary: ${salary}
//     `,
//     attachments: [
//       {
//         filename: resume.originalname,
//         content: resume.buffer,
//       },
//     ],
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     res
//       .status(200)
//       .json({ message: "Job application email sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res
//       .status(500)
//       .json({
//         error: "Error sending job application email. Please try again later.",
//       });
//   }
// });

// module.exports = router;
// =======================================================
// const AWS = require('aws-sdk');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const s3 = new AWS.S3();

// exports.handler = async (event) => {
//   // Allow cross-origin requests
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'OPTIONS, POST',
//   };

//   if (event.httpMethod === 'OPTIONS') {
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({}),
//     };
//   }

//   try {
//     const { fullName, email, position, experience, education, english, casteCertificate, salary } = JSON.parse(event.body);

//     // Assuming `resume` is sent directly to S3
//     const resumeUrl = process.env.S3_BUCKET_URL + '/resume.pdf'; // Example URL, adjust as needed

//     // Create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.TO_EMAIL,
//       subject: `Job Application: ${position}`,
//       text: `
//         Full Name: ${fullName}
//         Email: ${email}
//         Position: ${position}
//         Experience: ${experience}
//         Education: ${education}
//         English: ${english}
//         Caste Certificate: ${casteCertificate}
//         Last In-Hand Monthly Salary: ${salary}
//         Resume URL: ${resumeUrl}
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({ message: 'Job application email sent successfully!' }),
//     };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return {
//       statusCode: 500,
//       headers,
//       body: JSON.stringify({ error: 'Error sending job application email. Please try again later.' }),
//     };
//   }
// };

// ==============================
const nodemailer = require("nodemailer");
const Busboy = require('busboy');
require("dotenv").config();

exports.handler = async (event) => {
  const { headers } = event;

  // Create a new promise for handling the response
  const responsePromise = new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: { 'content-type': headers['Content-Type'] } });
    let fullName = '';
    let email = '';
    let position = '';
    let experience = '';
    let education = '';
    let english = '';
    let casteCertificate = '';
    let salary = '';
    let resumeBuffer = null;
    let resumeFilename = '';

    busboy.on('field', (fieldname, val) => {
      switch (fieldname) {
        case 'fullName':
          fullName = val;
          break;
        case 'email':
          email = val;
          break;
        case 'position':
          position = val;
          break;
        case 'experience':
          experience = val;
          break;
        case 'education':
          education = val;
          break;
        case 'english':
          english = val;
          break;
        case 'casteCertificate':
          casteCertificate = val;
          break;
        case 'salary':
          salary = val;
          break;
      }
    });

    busboy.on('file', (fieldname, file, filename) => {
      if (fieldname === 'resume') {
        resumeFilename = filename;
        file.on('data', (data) => {
          if (resumeBuffer) {
            resumeBuffer = Buffer.concat([resumeBuffer, data]);
          } else {
            resumeBuffer = data;
          }
        });
      }
    });

    busboy.on('finish', async () => {
      if (!resumeBuffer) {
        resolve({
          statusCode: 400,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: "No resume file uploaded." }),
        });
        return;
      }

      // Create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL,
        subject: `Job Application: ${position}`,
        text: `
          Full Name: ${fullName}
          Email: ${email}
          Position: ${position}
          Experience: ${experience}
          Education: ${education}
          English: ${english}
          Caste Certificate: ${casteCertificate}
          Last In-Hand Monthly Salary: ${salary}
        `,
        attachments: [
          {
            filename: resumeFilename,
            content: resumeBuffer,
          },
        ],
      };

      try {
        await transporter.sendMail(mailOptions);
        resolve({
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ message: "Job application email sent successfully!" }),
        });
      } catch (error) {
        console.error("Error sending email:", error);
        resolve({
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: "Error sending job application email. Please try again later." }),
        });
      }
    });

    busboy.end(Buffer.from(event.body, 'base64'));
  });

  return responsePromise;
};
