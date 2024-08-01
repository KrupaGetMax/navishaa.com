// =======================================================
// const nodemailer = require("nodemailer");

// exports.handler = async (event, context) => {
//   if (event.httpMethod === "OPTIONS") {
//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "Content-Type",
//         "Access-Control-Allow-Methods": "POST, OPTIONS"
//       },
//       body: "",
//     };
//   }

//   // Handle POST method
//   if (event.httpMethod === "POST") {
//     const {
//       fullName,
//       email,
//       position,
//       experience,
//       education,
//       english,
//       casteCertificate,
//       salary,
//     } = JSON.parse(event.body);

//     // Validate input fields
//     if (
//       !email ||
//       !fullName ||
//       !position ||
//       !experience ||
//       !education ||
//       !english ||
//       !casteCertificate ||
//       !salary
//     ) {
//       return {
//         statusCode: 400,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "OPTIONS, POST",
//           "Access-Control-Allow-Headers": "Content-Type",
//         },
//         body: JSON.stringify({ error: "Missing required fields" }),
//       };
//     }

//     // Create a transporter object
//     let transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email options
//     let mailOptions = {
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
//       `,
//     };

//     try {
//       console.log("Sending email with the following options:", mailOptions);
//       await transporter.sendMail(mailOptions);
//       return {
//         statusCode: 200,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "OPTIONS, POST",
//           "Access-Control-Allow-Headers": "Content-Type",
//         },
//         body: JSON.stringify({ message: "Form submitted successfully!" }),
//       };
//     } catch (error) {
//       console.error("Error sending email:", error);
//       return {
//         statusCode: 500,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "OPTIONS, POST",
//           "Access-Control-Allow-Headers": "Content-Type",
//         },
//         body: JSON.stringify({
//           error: "Error sending form. Please try again later.",
//         }),
//       };
//     }
//   }

//   // Handle methods other than POST
//   return {
//     statusCode: 405,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "OPTIONS, POST",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//     body: JSON.stringify({ error: "Method not allowed" }),
//   };
// };
// ----------------------------------------------------
// const nodemailer = require("nodemailer");

// exports.handler = async (event, context) => {
//   const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "Content-Type",
//     "Access-Control-Allow-Methods": "POST, OPTIONS",
//   };

//   if (event.httpMethod === "OPTIONS") {
//     return {
//       statusCode: 200,
//       headers: corsHeaders,
//       body: "",
//     };
//   }

//   if (event.httpMethod === "POST") {
//     const {
//       fullName,
//       email,
//       position,
//       experience,
//       education,
//       english,
//       casteCertificate,
//       salary,
//     } = JSON.parse(event.body);

//     // Validate input fields
//     if (
//       !email ||
//       !fullName ||
//       !position ||
//       !experience ||
//       !education ||
//       !english ||
//       !casteCertificate ||
//       !salary
//     ) {
//       return {
//         statusCode: 400,
//         headers: corsHeaders,
//         body: JSON.stringify({ error: "Missing required fields" }),
//       };
//     }

//     // Create a transporter object
//     let transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Email options
//     let mailOptions = {
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
//       `,
//     };

//     try {
//       console.log("Sending email with the following options:", mailOptions);
//       await transporter.sendMail(mailOptions);
//       return {
//         statusCode: 200,
//         headers: corsHeaders,
//         body: JSON.stringify({ message: "Form submitted successfully!" }),
//       };
//     } catch (error) {
//       console.error("Error sending email:", error);
//       return {
//         statusCode: 500,
//         headers: corsHeaders,
//         body: JSON.stringify({
//           error: "Error sending form. Please try again later.",
//         }),
//       };
//     }
//   }

//   // Handle methods other than POST
//   return {
//     statusCode: 405,
//     headers: corsHeaders,
//     body: JSON.stringify({ error: "Method not allowed" }),
//   };
// };

const nodemailer = require("nodemailer");
const multer = require("multer");
const { Readable } = require("stream");

// Configure multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to store files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

exports.handler = async (event, context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod === "POST") {
    // Convert event body to a readable stream
    const bodyStream = new Readable();
    bodyStream.push(event.body);
    bodyStream.push(null);

    return new Promise((resolve, reject) => {
      // Handle form data with multer
      upload.single("resume")(bodyStream, {}, async (err) => {
        if (err) {
          return resolve({
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Error parsing form" }),
          });
        }

        const formData = new URLSearchParams(event.body); // Parse form data from URL-encoded format

        // Extract fields from form data
        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const position = formData.get("position");
        const experience = formData.get("experience");
        const education = formData.get("education");
        const english = formData.get("english");
        const casteCertificate = formData.get("casteCertificate");
        const salary = formData.get("salary");

        if (
          !email ||
          !fullName ||
          !position ||
          !experience ||
          !education ||
          !english ||
          !casteCertificate ||
          !salary
        ) {
          return resolve({
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Missing required fields" }),
          });
        }

        // Create a transporter object
        let transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_PORT == 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // Email options
        let mailOptions = {
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
          attachments: req.file
            ? [
                {
                  filename: req.file.originalname,
                  path: req.file.path,
                },
              ]
            : [],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return resolve({
              statusCode: 500,
              headers: corsHeaders,
              body: JSON.stringify({ error: "Error sending email" }),
            });
          }
          resolve({
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Form submitted successfully!" }),
          });
        });
      });
    });
  }

  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
