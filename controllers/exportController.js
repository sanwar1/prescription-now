exports.exportPrescription = async (req, res, next) => {
    try {
        const formData = req.body;
        console.log(formData);
        const pdfHtml = utility.generatePdfHtml(formData);

        // HTML conversion code
        // const filename = "output.html";
        // fs.writeFile(filename, pdfHtml, (err) => {
        //   if (err) {
        //     console.error("Error writing to the file:", err);
        //   } else {
        //     console.log(`HTML content successfully saved to ${filename}`);
        //     // return;
        //   }
        // });

        // PDF conversion code //
        const pdfOptions = {
            format: "A4",
            orientation: "portrait",
            border: "25mm",
        };
        const exportFileName =
            "./" + formData.name + "_" + formData.date + ".pdf";
        pdf.create(pdfHtml, pdfOptions).toFile(
            path.join(__dirname, "exports", exportFileName),
            (err, result) => {
                if (err) {
                    return res.status(500).send("Error generating PDF.");
                } else {
                    return res.sendFile(
                        path.join(__dirname, "exports", exportFileName)
                    );
                }
            }
        );
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};
