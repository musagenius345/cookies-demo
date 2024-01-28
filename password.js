
const crypto = require('crypto');

// Function to generate a hashed password
export function hashPassword(password) {
  const salt = crypto.randomBytes(128).toString('base64');
  const iterations = 10000;

  // Hash the password using pbkdf2
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');

  return {
    salt,
    hash,
    iterations,
  };
}

// Function to validate a password
export function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
  const hashAttempt = crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha512').toString('hex');
  return savedHash === hashAttempt;
}

// Example usage
//const userPassword = 'mySecurePassword';
//const hashedPassword = hashPassword(userPassword);

//console.log('Hashed Password:', hashedPassword);

//const isCorrect = isPasswordCorrect(hashedPassword.hash, hashedPassword.salt, hashedPassword.iterations, 'mySecurePassword');
//console.log('Is Password Correct?', isCorrect);
