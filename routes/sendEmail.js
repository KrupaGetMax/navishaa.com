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

const nodemailer = require("nodemailer");
require("dotenv").config();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.handler = async (event) => {
  const { fullName, email, position, experience, education, english, casteCertificate, salary } = JSON.parse(event.body);

  const resume = event?.files?.resume;

  if (!resume) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No resume file uploaded." }),
    };
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
        filename: resume.originalname,
        content: resume.buffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Job application email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending job application email. Please try again later." }),
    };
  }
};
