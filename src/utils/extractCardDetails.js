const {
  extractName,
  extractDOB,
  extractGender,
  extractAadhaarNumber,
  extractVID,
  patterns,
} = require("./regex.js");

module.exports = async function extractAadhaarDetails(text) {
    const lines = text.split("\n").map((line) => line.trim());
  
    let name = null;
    let dob = null;
    let gender = null;
    let aadhaarNumber = null;
    let vid = null;
  
    const dobIndex = lines.findIndex((line) =>
      patterns.dobLinePattern.test(line)
    );
    if (dobIndex > -1) {
      if (dobIndex > 0) {
        name = extractName(lines[dobIndex - 1]);
        console.log("Extracted Name:", name);
      }
  
      dob = extractDOB(lines[dobIndex]);
  
      // Extract Gender (line below DOB)
      if (dobIndex < lines.length - 1) {
        gender = extractGender(lines[dobIndex + 1]);
      }
    }
  
    const aadhaarLine = lines.find((line) =>
      patterns.aadhaarLinePattern.test(line)
    );
    if (aadhaarLine) {
      aadhaarNumber = aadhaarLine.match(patterns.aadhaarLinePattern)[0].replace(/\s+/g, "");
    }
  
    const vidIndex = lines.findIndex((line) => patterns.vidLinePattern.test(line));
    if (vidIndex > -1) {
      vid = extractVID(lines[vidIndex]);
    }
  
    return { name, dob, gender, aadhaarNumber, vid };
  };