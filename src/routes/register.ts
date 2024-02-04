import bcrypt from 'bcryptjs';
// import { router } from '../../index';
import { checkEmail, createAccount } from '../../db/handlers';
import { Context } from 'koa';

export const handleRegistration = async (ctx: Context) => {
  const { email, username, password } = ctx.request.body;

  try {
    // Generate a random salt
    const emailExists =  await checkEmail(email)
    if(!emailExists){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const passwordHash = await bcrypt.hash(password, salt);
    // Store the user in the database with hashed password and salt
    createAccount({ email, username, passwordHash, salt })
    } else {
      console.log('Email already exist');
      ctx.body = 'Email already exists'
      return
    }
    ctx.body = 'User registered successfully';
  } catch (error) {
    console.error('Error registering user:', error);
    ctx.status = 500;
    ctx.body = error;
  }
}
