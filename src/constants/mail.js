import { config } from "dotenv"
config()
export const MAIL_USER = process.env.MAIL_USER
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export const EMAIL_DELAY = 60