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
          "Access-Control-Allow-Methods": "OPTIONS, POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Create a transporter object
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Ensure this environment variable is set in Netlify
        pass: process.env.EMAIL_PASS, // Ensure this environment variable is set in Netlify
      },
    });

    // Email options
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
          "Access-Control-Allow-Methods": "OPTIONS, POST",
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
          "Access-Control-Allow-Methods": "OPTIONS, POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({
          error: "Error sending form. Please try again later.",
        }),
      };
    }
  }

  // Handle methods other than POST
  return {
    statusCode: 405,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
