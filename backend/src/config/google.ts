import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "https://reachinbox-sde-intern-assignment.onrender.com/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
