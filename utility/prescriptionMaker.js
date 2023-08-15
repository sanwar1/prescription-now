function prescriptionMaker(medicine, dosage, duration) {
    let prescription = [];
    for (let index = 0; index < medicine.length; index++) {
        prescription[index] = {
            medicine: medicine[index],
            dosage: dosage[index],
            duration: parseInt(duration[index]),
        };
    }
    return prescription;
}
module.exports = { prescriptionMaker };
