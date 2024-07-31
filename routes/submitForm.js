// const express = require("express");
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

// // Handle POST request to /submit-form
// router.post("/", async (req, res) => {
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
//     to: process.env.TO_EMAIL,
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

// module.exports = router;

const nodemailer = require("nodemailer");

exports.handler = async function (event, context) {
  if (event.httpMethod === "POST") {
    const {
      companyName,
      country,
      fullName,
      jobTitle,
      email,
      mobileNumber,
      enquiryType,
      requirement,
    } = JSON.parse(event.body);

    // Validate input fields
    if (
      !email ||
      !companyName ||
      !country ||
      !fullName ||
      !jobTitle ||
      !mobileNumber ||
      !enquiryType ||
      !requirement
    ) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: "kripa06.sagar@gmail.com", // Recipient's email address
      subject: "New Form Submission",
      text: `
        Company Name: ${companyName}
        Country: ${country}
        Full Name: ${fullName}
        Job Title: ${jobTitle}
        Email: ${email}
        Mobile Number: ${mobileNumber}
        Service Type: ${enquiryType}
        Requirement: ${requirement}
      `,
    };

    try {
      console.log("Sending email with the following options:", mailOptions);
      await transporter.sendMail(mailOptions);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: "Form submitted successfully!" }),
      };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({
          error: "Error sending form. Please try again later.",
        }),
      };
    }
  }

  return {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
