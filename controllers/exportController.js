const { Case } = require("../models/Case");
const { Patient } = require("../models/Patient");
exports.exportPrescription = async (req, res, next) => {
    try {
        let caseFile = await Case.findById({ _id: req.params.id });
        if (caseFile == null) {
            throw new Error("Case File Not Found!");
        } else {
            // Find Patient
            let patient = await Patient.findById({ _id: caseFile.patient });
            // console.log("caseFile: " + caseFile);
            // console.log("patient: " + patient);
            res.render("prescriptionpreview", { caseFile, patient });
        }
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error.body,
        };
        res.render("error", { data });
    }
};
