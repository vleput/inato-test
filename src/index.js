import fs from "fs";

import { Patient } from "./models/Patient";
import { ClinicalTrial } from "./models/ClinicalTrial";
import logger from "./utils/logger";

const patients = [
  new Patient("Cold", 20, 30),
  new Patient("Multiple sclerosis", 10, 5),
  new Patient("Chronic obstructive pulmonary disease", 5, 40),
  new Patient("Pancreatic cancer", 15, 40)
];
const trial = new ClinicalTrial(patients);

const result = [];
const jsonResult = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  const dailyResult = JSON.stringify(trial.updateValue());
  result.push(dailyResult);
  jsonResult.push(JSON.parse(dailyResult));
}

/**
 * Export result to TXT file
 */
fs.writeFile("output/output.txt", result, err => {
  if (err) {
    logger.log({
      level: "error",
      message: err
    });
  } else {
    logger.log({
      level: "info",
      message:
        "The result of the clinical trial has been exported to TXT format."
    });
  }
});

/**
 * Export result to JSON file
 */
const jsonString = JSON.stringify({ trialResult: jsonResult }, null, 2);
fs.writeFile("output/output.json", jsonString, err => {
  if (err) {
    logger.log({
      level: "error",
      message: err
    });
  } else {
    logger.log({
      level: "info",
      message:
        "The result of the clinical trial has been exported to JSON format."
    });
  }
});
