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
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const multer = require("multer");

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// exports.handler = async (event) => {
//   const { fullName, email, position, experience, education, english, casteCertificate, salary } = JSON.parse(event.body);

//   const resume = event?.files?.resume;

//   if (!resume) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: "No resume file uploaded." }),
//     };
//   }

//   // Create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

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
//     await transporter.sendMail(mailOptions);
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Job application email sent successfully!" }),
//     };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Error sending job application email. Please try again later." }),
//     };
//   }
// };

// ====================================================
// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const multer = require("multer");
// const { IncomingForm } = require("formidable");

// // Initialize the multer storage and upload middleware
// const upload = multer({ storage: multer.memoryStorage() });

// exports.handler = async (event) => {
//   // Allow cross-origin requests
//   const headers = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "Content-Type",
//     "Access-Control-Allow-Methods": "OPTIONS, POST",
//   };

//   // Handle OPTIONS request for preflight CORS checks
//   if (event.httpMethod === "OPTIONS") {
//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({}),
//     };
//   }

//   if (event.httpMethod === "POST") {
//     const form = new IncomingForm();
//     form.parse(event, (err, fields, files) => {
//       if (err) {
//         console.error("Error parsing form:", err);
//         return {
//           statusCode: 500,
//           headers,
//           body: JSON.stringify({ error: "Error processing form. Please try again later." }),
//         };
//       }

//       const {
//         fullName,
//         email,
//         position,
//         experience,
//         education,
//         english,
//         casteCertificate,
//         salary,
//       } = fields;

//       const resume = files.resume;

//       if (!resume) {
//         return {
//           statusCode: 400,
//           headers,
//           body: JSON.stringify({ error: "No resume file uploaded." }),
//         };
//       }

//       // Create reusable transporter object using the default SMTP transport
//       const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: process.env.TO_EMAIL,
//         subject: `Job Application: ${position}`,
//         text: `
//           Full Name: ${fullName}
//           Email: ${email}
//           Position: ${position}
//           Experience: ${experience}
//           Education: ${education}
//           English: ${english}
//           Caste Certificate: ${casteCertificate}
//           Last In-Hand Monthly Salary: ${salary}
//         `,
//         attachments: [
//           {
//             filename: resume.originalFilename,
//             content: resume.filepath,
//           },
//         ],
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error("Error sending email:", error);
//           return {
//             statusCode: 500,
//             headers,
//             body: JSON.stringify({ error: "Error sending job application email. Please try again later." }),
//           };
//         } else {
//           return {
//             statusCode: 200,
//             headers,
//             body: JSON.stringify({ message: "Job application email sent successfully!" }),
//           };
//         }
//       });
//     });
//   } else {
//     // Handle methods other than POST
//     return {
//       statusCode: 405,
//       headers,
//       body: JSON.stringify({ error: "Method not allowed" }),
//     };
//   }
// };

// =====================================
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
require('dotenv').config();

const s3 = new AWS.S3();

exports.handler = async (event) => {
  // Allow cross-origin requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({}),
    };
  }

  try {
    const { fullName, email, position, experience, education, english, casteCertificate, salary } = JSON.parse(event.body);

    // Assuming `resume` is sent directly to S3
    const resumeUrl = process.env.S3_BUCKET_URL + '/resume.pdf'; // Example URL, adjust as needed

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
        Resume URL: ${resumeUrl}
      `,
    };

    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Job application email sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error sending job application email. Please try again later.' }),
    };
  }
};

