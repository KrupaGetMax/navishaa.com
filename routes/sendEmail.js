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
const formidable = require("formidable");
const fs = require("fs");

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
    // Netlify functions don't provide req.on; use formidable to parse
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;

    // Use the 'body' property from the event object
    const data = Buffer.from(event.body, "base64").toString("utf8");

    return new Promise((resolve, reject) => {
      form.parse(data, (err, fields, files) => {
        if (err) {
          return reject({
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: "Error parsing form" }),
          });
        }

        // Validate input fields
        const {
          fullName,
          email,
          position,
          experience,
          education,
          english,
          casteCertificate,
          salary,
        } = fields;

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
          attachments: [
            {
              filename: files.resume[0].originalFilename,
              path: files.resume[0].filepath,
            },
          ],
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
