const fs = require("fs");
const filePath = "./public/bootstrap53.css";
// https://pspdfkit.com/blog/2019/generate-pdf-invoices-pdfkit-nodejs/
// For future reference

// Function to generate the PDF HTML content
function generatePdfHtml(formData) {
  // Create your PDF HTML here using the formData
  // For simplicity, we'll just return a sample HTML
  let pdfContent = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Dr Anam's Clinic</title>
          <style>
            ${styling()}
          </style>
        </head>
        <body class="bg-light">
          <h1>Patient Details</h1>
          <p>Date: ${formData.date}</p>
          <p>Name: ${formData.name}</p>
          <p>Age: ${formData.age}</p>
          <p>Gender: ${formData.gender}</p>
          <p>Phone Number: ${formData.phone}</p>
          <p>Email: ${formData.email}</p>
  
          <h1>Chief Complaint</h1>
          <p>${formData.chiefComplaint}</p>
  
          <h1>Prescription</h1>
          <ol>`;

  // Prescription goes here
  for (let i = 0; i < formData.medicine.length; i++) {
    pdfContent += `
                  <li>${
                    formData.medicine[i] +
                    " | " +
                    formData.dosage[i] +
                    " | " +
                    formData.duration[i]
                  }</li>
                  `;
  }
  pdfContent += `</ol>
          <h1>Diagnostic Tests</h1>
          <ol>
            ${formData.diagnosticTests
              .map((item) => `<li>${item}</li>`)
              .join("")}
          </ol>
        </body>
      </html>
    `;
  return pdfContent;
}

function styling() {
  // Read the file asynchronously
  //   fs.readFile(filePath, "utf8", (err, data) => {
  //     if (err) {
  //       console.error("Error reading the file:", err);
  //       return "";
  //     } else {
  //       return data;
  //     }
  //   });

  // Read the file synchronously
  const data = fs.readFileSync(filePath, "utf8");
  return data;
}

module.exports = { generatePdfHtml, styling };
