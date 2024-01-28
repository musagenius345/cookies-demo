import type { Context } from 'koa';
import { checkEmail, findUserByEmail } from '../../db/handlers';
import bcrypt from 'bcryptjs'


export default async function loginRoute(ctx: Context){
  const { email, password } = ctx.request.body;

  try {
    // Retrieve user from the database
    const validEmail = await checkEmail(email);

    if (validEmail) {
      const user = await findUserByEmail(email)
      // Hash the entered password with the stored salt
      const hashedPasswordAttempt = await bcrypt.hash(password, user.salt);

      // Compare hashed password attempt with the stored hashed password
      if (hashedPasswordAttempt === user.passwordHash) {
        ctx.body = 'Login successful';
      } else {
        ctx.status = 401; // Unauthorized
        ctx.body = 'Invalid credentials';
      }
    } else {
      ctx.status = 401; // Unauthorized
      ctx.body = 'User not found';
    }
  } catch (error) {
    console.error('Error during login:', error);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
  }
}
