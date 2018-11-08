/**
 * Handler for a patient with disease "Multiple sclerosis"
 */
const handleMultipleSclerosis = patient => {
  if (patient.surgeryIn >= 0) {
    patient.value++;
  } else {
    patient.value += 2;
  }
  patient.surgeryIn--;
  return patient;
};

/**
 * Handler for a patient with disease "Pancreatic cancer"
 */
const handlePancreaticCancer = patient => {
  return patient;
};

/**
 * Handler for a patient with disease "Chronic obstructive pulmonary disease"
 */
const handleChronicObstructivePulmonary = patient => {
  if (patient.surgeryIn <= 0) {
    patient.value = 0;
  } else if (patient.surgeryIn <= 5) {
    patient.value += 3;
  } else if (patient.surgeryIn <= 10) {
    patient.value += 2;
  } else {
    patient.value++;
  }
  patient.surgeryIn--;
  return patient;
};

/**
 * Handler for all other patients
 */
const handleRegularPatient = patient => {
  if (patient.surgeryIn >= 0) {
    patient.value--;
  } else {
    patient.value -= 2;
  }
  patient.surgeryIn--;
  return patient;
};

module.exports = {
  Diseases: {
    handleMultipleSclerosis,
    handlePancreaticCancer,
    handleChronicObstructivePulmonary,
    handleRegularPatient
  }
};
