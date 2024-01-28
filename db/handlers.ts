import { db } from '../src/db'
import { users } from './schema'
import type { User } from './schema'
import { eq } from 'drizzle-orm'
type Email = typeof users.email | string



/**
 * Checks if the email exists in the database
 * @returns {boolean}
 * */
export async function checkEmail(email: Email): Promise<boolean> {
  const result = await db.query.users.findFirst({
    where: eq(users.email, email)
  })

  return !!result

}

export function deleteAccount(email: Email) {
  
}

export async  function createAccount( user ) {
  return await db.insert(users).values(user)
}

export function changePassword(email: Email) {
  
}

