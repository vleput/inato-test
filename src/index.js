import { Patient, ClinicalTrial } from "./trial";

import fs from "fs";

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
  const dailyResult = trial.updateValue();
  result.push(JSON.stringify(dailyResult));
  jsonResult.push(dailyResult);
}

/* eslint-disable no-console */
fs.writeFile("output/output.txt", result, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});

const jsonString = JSON.stringify({ trialResult: jsonResult }, null, 2);
fs.writeFile("output/output.json", jsonString, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
