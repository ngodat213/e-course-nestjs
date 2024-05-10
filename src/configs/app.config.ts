import { registerAs } from '@nestjs/config'
import yargs from 'yargs'
const argv = yargs.argv as Record<string, string | void>

export const MONGO_DB = {
  uri: process.env.MONGODB_URI || `mongodb+srv://hydra:Code26102003@cluster0.d0dwiwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
}

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  data: argv.auth_data || { user: 'root' },
  jwtSecret: argv.auth_key || 'ecourse',
  defaultPassword: argv.auth_default_password || 'root'
}

export const GOOGLE = {
  jwtServiceAccountCredentials: argv.google_jwt_cred_json ? JSON.parse(argv.google_jwt_cred_json as string) : null
}