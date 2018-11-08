import { Patient } from "../src/models/patient";
import { ClinicalTrial } from "../src/trial";

describe("ClinicalTrial", () => {
  it("All patients - should never have a negative value", () => {
    // Before surgery
    expect(
      new ClinicalTrial([new Patient("Cold", 2, 0)]).updateValue()
    ).toEqual([new Patient("Cold", 1, 0)]);

    // After surgery
    expect(
      new ClinicalTrial([new Patient("Cold", -1, 0)]).updateValue()
    ).toEqual([new Patient("Cold", -2, 0)]);
  });

  it("All patients - should never have a value above 50", () => {
    // Multiple sclerosis patient
    expect(
      new ClinicalTrial([
        new Patient("Multiple sclerosis", 5, 50)
      ]).updateValue()
    ).toEqual([new Patient("Multiple sclerosis", 4, 50)]);

    // Chronic obstructive pulmonary disease patient
    expect(
      new ClinicalTrial([
        new Patient("Chronic obstructive pulmonary disease", 5, 48)
      ]).updateValue()
    ).toEqual([new Patient("Chronic obstructive pulmonary disease", 4, 50)]);
  });

  it("Regular patient - should decrease value and surgeryIn", () => {
    expect(
      new ClinicalTrial([new Patient("Cold", 2, 3)]).updateValue()
    ).toEqual([new Patient("Cold", 1, 2)]);
  });

  it("Regular patient - should decrease value twice as fast after surgery", () => {
    expect(
      new ClinicalTrial([new Patient("Cold", -5, 3)]).updateValue()
    ).toEqual([new Patient("Cold", -6, 1)]);
  });

  it("Multiple Sclerosis patients - should increase value by 1 and decrease surgeryIn", () => {
    expect(
      new ClinicalTrial([new Patient("Multiple sclerosis", 2, 3)]).updateValue()
    ).toEqual([new Patient("Multiple sclerosis", 1, 4)]);
  });

  it("Multiple Sclerosis patients - should increase value by 2 and decrease surgeryIn after surgery", () => {
    expect(
      new ClinicalTrial([
        new Patient("Multiple sclerosis", -1, 3)
      ]).updateValue()
    ).toEqual([new Patient("Multiple sclerosis", -2, 5)]);
  });

  it("Pancreatic cancer patients - should have constant value & surgeryIn", () => {
    expect(
      new ClinicalTrial([
        new Patient("Pancreatic cancer", 10, 10)
      ]).updateValue()
    ).toEqual([new Patient("Pancreatic cancer", 10, 10)]);
  });

  it("Chronic obstructive pulmonary disease patients - should increase value by 1 as surgery approaches and is in more than or equal to 11 days", () => {
    expect(
      new ClinicalTrial([
        new Patient("Chronic obstructive pulmonary disease", 11, 10)
      ]).updateValue()
    ).toEqual([new Patient("Chronic obstructive pulmonary disease", 10, 11)]);
  });

  it("Chronic obstructive pulmonary disease patients - should increase value by 2 as surgery approaches and is in between 6 and 10 days", () => {
    expect(
      new ClinicalTrial([
        new Patient("Chronic obstructive pulmonary disease", 10, 11)
      ]).updateValue()
    ).toEqual([new Patient("Chronic obstructive pulmonary disease", 9, 13)]);
  });

  it("Chronic obstructive pulmonary disease patients - should increase value by 3 as surgery approaches and is in 5 days or less", () => {
    expect(
      new ClinicalTrial([
        new Patient("Chronic obstructive pulmonary disease", 5, 13)
      ]).updateValue()
    ).toEqual([new Patient("Chronic obstructive pulmonary disease", 4, 16)]);
  });

  it("Chronic obstructive pulmonary disease patients - should drop value to 0 after surgery", () => {
    expect(
      new ClinicalTrial([
        new Patient("Chronic obstructive pulmonary disease", 0, 43)
      ]).updateValue()
    ).toEqual([new Patient("Chronic obstructive pulmonary disease", -1, 0)]);
  });
});
