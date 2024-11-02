const patterns = {
  namePattern: /[^a-zA-Z\s]/g,
  dobPattern: /(\d{2}\/\d{2}\/\d{4})/,
  genderPattern: /(?:QUEER|MALE|FEMALE)/i,
  aadhaarLinePattern: /\d{4}\s*\d{4}\s*\d{4}/i,
  aadhaarPattern: /(\d{4})\s*(\d{4})\s*(\d{4})/,
  vidPattern: /(\d{4}\s*\d{4}\s*\d{4}\s*\d{4})/,
  dobLinePattern: /(?:जनम तिथि|DOB)/i,
  vidLinePattern: /VID/i,
};

const extractName = (line) => {
  return line.replace(patterns.namePattern, "").trim();
};

const extractDOB = (line) => {
  const dobMatch = line.match(patterns.dobPattern);
  return dobMatch ? dobMatch[1] : null;
};

const extractGender = (line) => {
  const genderMatch = line.match(patterns.genderPattern);
  return genderMatch ? genderMatch[0].toUpperCase() : null;
};

const extractAadhaarNumber = (line) => {
  const aadhaarMatch = line.match(patterns.aadhaarPattern);
  return aadhaarMatch ? aadhaarMatch[0].replace(/\s+/g, "") : null;
};

const extractVID = (line) => {
  const vidMatch = line.match(patterns.vidPattern);
  return vidMatch ? vidMatch[1].replace(/\s+/g, "") : null;
};

module.exports = {
  patterns,
  extractName,
  extractDOB,
  extractGender,
  extractAadhaarNumber,
  extractVID,
};
