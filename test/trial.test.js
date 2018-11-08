import { Patient, ClinicalTrial } from "../src/trial";

describe("ClinicalTrial", () => {
  it("should decrease value and surgeryIn", () => {
    expect(
      new ClinicalTrial([new Patient("test", 2, 3)]).updateValue()
    ).toEqual([new Patient("test", 1, 2)]);
  });
});
