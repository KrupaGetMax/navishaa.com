// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// require("dotenv").config();
// const cors = require("cors");

// const app = express();
// const port = 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const allowedOrigins = [
//   process.env.LOCAL_ORIGIN,
//   process.env.PRODUCTION_ORIGIN,
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// // Log the environment variables to verify they are loaded correctly
// console.log("Email User:", process.env.EMAIL_USER);
// console.log("Email Pass:", process.env.EMAIL_PASS);
// console.log("SMTP Host:", process.env.SMTP_HOST);
// console.log("SMTP Port:", process.env.SMTP_PORT);
// console.log("Local Origin:", process.env.LOCAL_ORIGIN);
// console.log("Production Origin:", process.env.PRODUCTION_ORIGIN);

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

// // Handle POST request to /submit-form
// app.post("/submit-form", async (req, res) => {
//   const {
//     companyName,
//     country,
//     fullName,
//     jobTitle,
//     email,
//     mobileNumber,
//     enquiryType,
//     requirement,
//   } = req.body;

//   console.log("Form data received:", req.body);

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.TO_EMAIL, // Replace with your email address
//     subject: "New Form Submission",
//     text: `Company Name: ${companyName}\nCountry: ${country}\nFull Name: ${fullName}\nJob Title: ${jobTitle}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nService Type: ${enquiryType}\nRequirement: ${requirement}`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     res.status(200).json({ message: "Form submitted successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res
//       .status(500)
//       .json({ error: "Error sending email. Please try again later." });
//   }
// });

// // API endpoint to handle job application form submission
// app.post("/send-email", upload.single("resume"), (req, res) => {
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
//     return res.status(400).send("No resume file uploaded.");
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

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send("Email sent: " + info.response);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// require("dotenv").config();
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Configure CORS
// const allowedOrigins = [
//   process.env.LOCAL_ORIGIN,
//   process.env.PRODUCTION_ORIGIN,
//   // process.env.NETLIFY_ORIGIN,
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// // Log the environment variables to verify they are loaded correctly
// console.log("Email User:", process.env.EMAIL_USER);
// console.log("SMTP Host:", process.env.SMTP_HOST);
// console.log("SMTP Port:", process.env.SMTP_PORT);
// console.log("Local Origin:", process.env.LOCAL_ORIGIN);
// console.log("Production Origin:", process.env.PRODUCTION_ORIGIN);
// console.log("Netlify Origin:", process.env.NETLIFY_ORIGIN);

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

// // Handle POST request to /submit-form
// app.post("/submit-form", async (req, res) => {
//   const {
//     companyName,
//     country,
//     fullName,
//     jobTitle,
//     email,
//     mobileNumber,
//     enquiryType,
//     requirement,
//   } = req.body;

//   console.log("Form data received:", req.body);

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.TO_EMAIL, // Replace with your email address
//     subject: "New Form Submission",
//     text: `Company Name: ${companyName}\nCountry: ${country}\nFull Name: ${fullName}\nJob Title: ${jobTitle}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nService Type: ${enquiryType}\nRequirement: ${requirement}`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     res.status(200).json({ message: "Form submitted successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res
//       .status(500)
//       .json({ error: "Error sending email. Please try again later." });
//   }
// });

// // API endpoint to handle job application form submission
// app.post("/send-email", upload.single("resume"), async (req, res) => {
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

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
const allowedOrigins = [
  process.env.LOCAL_ORIGIN,
  process.env.PRODUCTION_ORIGIN,
  // process.env.NETLIFY_ORIGIN,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Log the environment variables to verify they are loaded correctly
console.log("Email User:", process.env.EMAIL_USER);
console.log("SMTP Host:", process.env.SMTP_HOST);
console.log("SMTP Port:", process.env.SMTP_PORT);
console.log("Local Origin:", process.env.LOCAL_ORIGIN);
console.log("Production Origin:", process.env.PRODUCTION_ORIGIN);
console.log("Netlify Origin:", process.env.NETLIFY_ORIGIN);

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Set up storage for multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

// Handle POST request to /submit-form
app.post("/submit-form", async (req, res) => {
  const {
    companyName,
    country,
    fullName,
    jobTitle,
    email,
    mobileNumber,
    enquiryType,
    requirement,
  } = req.body;

  console.log("Form data received:", req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL, // Replace with your email address
    subject: "New Form Submission",
    text: `Company Name: ${companyName}\nCountry: ${country}\nFull Name: ${fullName}\nJob Title: ${jobTitle}\nEmail: ${email}\nMobile Number: ${mobileNumber}\nService Type: ${enquiryType}\nRequirement: ${requirement}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Error sending email. Please try again later." });
  }
});

// API endpoint to handle job application form submission
app.post("/send-email", upload.single("resume"), async (req, res) => {
  const {
    fullName,
    email,
    position,
    experience,
    education,
    english,
    casteCertificate,
    salary,
  } = req.body;

  const resume = req.file;

  if (!resume) {
    return res.status(400).json({ error: "No resume file uploaded." });
  }

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
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res
      .status(200)
      .json({ message: "Job application email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({
        error: "Error sending job application email. Please try again later.",
      });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
