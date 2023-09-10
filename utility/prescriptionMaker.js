function prescriptionMaker(medicine, dosage, frequency, duration) {
    let prescription = [];
    for (let index = 0; index < medicine.length; index++) {
        prescription[index] = {
            medicine: medicine[index],
            dosage: dosage[index],
            frequency: frequency[index],
            duration: parseInt(duration[index]),
        };
    }
    return prescription;
}
module.exports = { prescriptionMaker };
