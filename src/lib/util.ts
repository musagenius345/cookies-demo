import { db, emailExists } from '../db'
import { eq } from 'drizzle-orm'
export function isRegistered(email: string ) {
  const result = !!emailExists(email)
  return result
}
