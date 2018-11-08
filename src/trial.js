import { Diseases } from "./diseases";

export class ClinicalTrial {
  constructor(patients = []) {
    this.patients = patients;
  }

  /**
   * Update each patient's values and correct them if needed
   */
  updateValue() {
    return this.patients.map(patient => {
      const classifiedPatient = this.classifyPatient(patient);
      const verifiedPatient = this.correctValues(classifiedPatient);
      return verifiedPatient;
    });
  }

  /**
   * Call the right handler matching the patient disease
   */
  classifyPatient(patient) {
    switch (patient.disease) {
      case "Multiple sclerosis":
        return Diseases.handleMultipleSclerosis(patient);
      case "Pancreatic cancer":
        return Diseases.handlePancreaticCancer(patient);
      case "Chronic obstructive pulmonary disease":
        return Diseases.handleChronicObstructivePulmonary(patient);
      case "Hepatocellular carcinoma":
        return Diseases.handleHepatocellularCarcinoma(patient);
      default:
        return Diseases.handleRegularPatient(patient);
    }
  }

  /**
   * Make sure patients' values do not exceed value limits
   */
  correctValues(patient) {
    if (patient.value < 0) {
      patient.value = 0;
    } else if (patient.value > 50) {
      patient.value = 50;
    }
    return patient;
  }
}
