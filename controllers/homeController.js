const { Patient } = require("../models/Patient");
const { Case } = require("../models/Case");

exports.homeView = async (req, res, next) => {
    try {
        // Common parameters
        let currentDate = new Date();
        let cutoffDate = currentDate.setDate(currentDate.getDate() - 30);

        // Crad 1: Total Patients
        const currentPatients = await Patient.countDocuments();
        const prevMonthPatient = await Patient.countDocuments({
            createdAt: {
                $lte: cutoffDate,
            },
        });
        const monthlyPercentIncrease =
            prevMonthPatient == 0
                ? 0
                : ((currentPatients - prevMonthPatient) * 100) /
                  prevMonthPatient;

        // Crad 2: Total Cases
        const currentCases = await Case.countDocuments();
        const prevMonthCases = await Case.countDocuments({
            createdAt: {
                $lte: cutoffDate,
            },
        });
        const newCases = currentCases - prevMonthCases;

        // Card 3: Female Patients
        const femalePatients = await Patient.countDocuments({
            gender: "F",
        });
        const percentFemalePatients =
            currentPatients == 0 ? 0 : (femalePatients * 100) / currentPatients;

        // Summary Data
        const data = {
            patients: currentPatients,
            percentageIncrease: monthlyPercentIncrease,
            allCases: currentCases,
            newCases: newCases,
            femalePatients: femalePatients,
            pcFemalePatients: percentFemalePatients,
        };

        res.render("index", { data });
    } catch (error) {
        console.log(`Error Message: ${error.message}`);
        const data = {
            msg1: error.message,
            msg2: error,
        };
        res.render("error", { data });
    }
};
