import bcrypt from 'bcryptjs';
// import { router } from '../../index';
import { createAccount } from '../../db/handlers';
// ... (your imports)

export const handleRegistration = async (ctx) => {
  const { email, username, password } = ctx.request.body;

  try {
    // Generate a random salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const passwordHash = await bcrypt.hash(password, salt);
    // Store the user in the database with hashed password and salt
    await createAccount({ email, username, passwordHash, salt })

    ctx.body = 'User registered successfully';
  } catch (error) {
    console.error('Error registering user:', error);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
}
