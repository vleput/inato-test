import { Patient } from "../src/models/Patient";
import { ClinicalTrial } from "../src/models/ClinicalTrial";

describe("ClinicalTrial", () => {
  describe("All patients", () => {
    it("should never have a negative value", () => {
      // Before surgery
      expect(
        new ClinicalTrial([new Patient("Cold", 2, 0)]).updateValue()
      ).toEqual([new Patient("Cold", 1, 0)]);

      // After surgery
      expect(
        new ClinicalTrial([new Patient("Cold", -1, 0)]).updateValue()
      ).toEqual([new Patient("Cold", -2, 0)]);
    });

    it("should never have a value above 50", () => {
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
  });

  describe("Regular patients", () => {
    it("should decrease value and surgeryIn", () => {
      expect(
        new ClinicalTrial([new Patient("Cold", 2, 3)]).updateValue()
      ).toEqual([new Patient("Cold", 1, 2)]);
    });

    it("should decrease value twice as fast after surgery", () => {
      expect(
        new ClinicalTrial([new Patient("Cold", -5, 3)]).updateValue()
      ).toEqual([new Patient("Cold", -6, 1)]);
    });
  });

  describe("Multiple Sclerosis patients", () => {
    it("should increase value by 1 and decrease surgeryIn", () => {
      expect(
        new ClinicalTrial([
          new Patient("Multiple sclerosis", 2, 3)
        ]).updateValue()
      ).toEqual([new Patient("Multiple sclerosis", 1, 4)]);
    });

    it("should increase value by 2 and decrease surgeryIn after surgery", () => {
      expect(
        new ClinicalTrial([
          new Patient("Multiple sclerosis", -1, 3)
        ]).updateValue()
      ).toEqual([new Patient("Multiple sclerosis", -2, 5)]);
    });
  });

  describe("Pancreatic cancer patients", () => {
    it("should have constant value & surgeryIn", () => {
      expect(
        new ClinicalTrial([
          new Patient("Pancreatic cancer", 10, 10)
        ]).updateValue()
      ).toEqual([new Patient("Pancreatic cancer", 10, 10)]);
    });
  });

  describe("Chronic obstructive pulmonary disease patients", () => {
    it("should increase value by 1 as surgery approaches and is in more than or equal to 11 days", () => {
      expect(
        new ClinicalTrial([
          new Patient("Chronic obstructive pulmonary disease", 11, 10)
        ]).updateValue()
      ).toEqual([new Patient("Chronic obstructive pulmonary disease", 10, 11)]);
    });

    it("should increase value by 2 as surgery approaches and is in between 6 and 10 days", () => {
      expect(
        new ClinicalTrial([
          new Patient("Chronic obstructive pulmonary disease", 10, 11)
        ]).updateValue()
      ).toEqual([new Patient("Chronic obstructive pulmonary disease", 9, 13)]);
    });

    it("should increase value by 3 as surgery approaches and is in 5 days or less", () => {
      expect(
        new ClinicalTrial([
          new Patient("Chronic obstructive pulmonary disease", 5, 13)
        ]).updateValue()
      ).toEqual([new Patient("Chronic obstructive pulmonary disease", 4, 16)]);
    });

    it("should drop value to 0 after surgery", () => {
      expect(
        new ClinicalTrial([
          new Patient("Chronic obstructive pulmonary disease", 0, 43)
        ]).updateValue()
      ).toEqual([new Patient("Chronic obstructive pulmonary disease", -1, 0)]);
    });
  });

  describe("Hepatocellular carcinoma patients", () => {
    it("should decrease value twice as fast as regular patient before surgery", () => {
      expect(
        new ClinicalTrial([
          new Patient("Hepatocellular carcinoma", 1, 43)
        ]).updateValue()
      ).toEqual([new Patient("Hepatocellular carcinoma", 0, 41)]);
    });

    it("should decrease value twice as fast as regular patient after surgery", () => {
      expect(
        new ClinicalTrial([
          new Patient("Hepatocellular carcinoma", 0, 41)
        ]).updateValue()
      ).toEqual([new Patient("Hepatocellular carcinoma", -1, 37)]);
    });

    it("should never decrease value below 0", () => {
      expect(
        new ClinicalTrial([
          new Patient("Hepatocellular carcinoma", -1, 2)
        ]).updateValue()
      ).toEqual([new Patient("Hepatocellular carcinoma", -2, 0)]);
    });
  });
});
