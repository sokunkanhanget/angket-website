import dotenv from "dotenv"

dotenv.config()

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export function isAdminEmail(email) {
  return email ? adminEmails.includes(String(email).trim().toLowerCase()) : false
}