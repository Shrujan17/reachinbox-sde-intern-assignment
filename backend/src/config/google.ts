import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // FIX: This must be the absolute URL to your BACKEND callback
      callbackURL: "https://reachinbox-sde-intern-assignment.onrender.com/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // In a real app, you'd save the user to a database here
      return done(null, profile);
    }
  )
);

// Required if you use sessions, though your route says { session: false }
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));