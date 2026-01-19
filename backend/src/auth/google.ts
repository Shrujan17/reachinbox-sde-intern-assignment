import dotenv from "dotenv";
dotenv.config(); // 🔑 FORCE env load HERE

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

console.log("GOOGLE_CLIENT_ID (google.ts):", process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export default passport;
