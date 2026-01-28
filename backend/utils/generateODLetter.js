const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

/**
 * Generate OD Letter as PDF BUFFER (Serverless Safe)
 * Works in both local development and Vercel production
 * @returns {Promise<Buffer>}
 */
const generateODLetter = async ({ studentName, eventName, eventDate }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      // Collect PDF buffer chunks
      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      /* ================= LOGOS (TOP LEFT & TOP RIGHT) ================= */
      // Use __dirname to get correct path regardless of where npm is run from
      const citLogoPath = path.join(__dirname, "..", "assets", "cit-logo.png");
      const magnusLogoPath = path.join(__dirname, "..", "assets", "magnus-logo.png");
      const hodSignPath = path.join(__dirname, "..", "assets", "hod-sign.png");

      let startY = 50;

      // CIT Logo – Top Left
      if (fs.existsSync(citLogoPath)) {
        try {
          doc.image(citLogoPath, 50, 40, { width: 110 });
          startY = 150;
        } catch (err) {
          console.warn('⚠️ CIT logo not found or error loading');
        }
      }

      // Magnus Logo – Top Right
      if (fs.existsSync(magnusLogoPath)) {
        try {
          doc.image(magnusLogoPath, doc.page.width - 140, 40, { width: 90 });
          startY = Math.max(startY, 150);
        } catch (err) {
          console.warn('⚠️ Magnus logo not found or error loading');
        }
      }

      // Start text below logos
      doc.y = startY;

      /* ================= LETTER CONTENT ================= */
      doc.font("Times-Roman").fontSize(12);

      doc.text(
        `From,
Team Magnus,
Department of CSE (Artificial Intelligence and Machine Learning),
Chennai Institute of Technology,
Kundrathur – 600069`
      );

      doc.moveDown();

      doc.font("Times-Bold").text(
        "SUBJECT: Requesting permission for On-Duty (OD)"
      );

      doc.moveDown();

      doc.font("Times-Roman").text("Respected Sir / Madam,");
      doc.moveDown();

      doc.text(
        `I hope this message finds you well. On behalf of Team Magnus at Chennai Institute of Technology,
I am writing to request your permission for ${studentName}, one of your students,
to participate in our upcoming Technical Symposium organized by the Department of
CSE (Artificial Intelligence and Machine Learning). This event is scheduled on ${eventDate}.`
      );

      doc.moveDown();

      doc.text(
        `${studentName} has expressed interest in the event ${eventName}.
We believe that participation in this symposium will not only enrich one's academic journey
but also contribute to their holistic development.`
      );

      doc.moveDown();

      doc.text(
        `I'd like to bring to your attention that the inauguration ceremony is scheduled
for 8:00 AM on the day of the event, and it is essential for participants to be present
at the Chennai Institute of Technology Campus by that time.`
      );

      doc.moveDown();

      doc.text(
        `We kindly request your authorization to grant ${studentName}
the necessary permission to attend this symposium.`
      );

      doc.moveDown(2);
      doc.text("Yours sincerely,");
      doc.text("Team Magnus");

      /* ================= SIGNATURE ================= */
      if (fs.existsSync(hodSignPath)) {
        try {
          doc.moveDown(2);
          doc.image(hodSignPath, { width: 120 });
        } catch (err) {
          console.warn('⚠️ Signature image not found or error loading');
        }
      }

      doc.moveDown();
      doc.font("Times-Bold").text(
        `Dr. R. Gowri, Ph.D.,
Head of the Department,
CSE (Artificial Intelligence and Machine Learning),
Chennai Institute of Technology`
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateODLetter };
