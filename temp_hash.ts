// temp_hash.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcryptjs");

// Your specific password
const password = "$michael09";

// The number of "salt rounds"
const saltRounds = 12;

// Generate the hash
const hash = bcrypt.hashSync(password, saltRounds);

// Print it to the console
console.log("Your hashed password is:");
console.log(hash);
