import { config } from 'dotenv';
config()

export const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
export const ACCESS_TOKEN_EXPIRED = process.env.ACCESS_TOKEN_EXPIRED
export const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
export const REFRESH_TOKEN_EXPIRED = process.env.REFRESH_TOKEN_EXPIRED