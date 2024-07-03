import { OAuth2Client } from "google-auth-library";
import fs from "node:fs";
import { ENV_VARS } from "../constants/index.js";
import { env } from "./env.js";
import path from "node:path";

const googleConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'google.json'))
    .toString()
)

const client = new OAuth2Client({
  clientId: env(ENV_VARS.GOOGLE_CLIENT_ID),
  clientSecret: env(ENV_VARS.GOOGLE_CLIENT_SECRET),
  project_id: googleConfig.web.project_id,
  redirectUri: googleConfig.web.redirect_uris[0],
});

export const generateOAuthURL = () => {
  return client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/contacts.other.readonly'
    ]
  })
}