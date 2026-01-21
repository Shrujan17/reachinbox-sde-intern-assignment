import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL:
        "https://reachinbox-sde-intern-assignment.onrender.com/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      // For this assignment, we store Google profile directly
      return done(null, profile);
    }
  )
);

// Session persistence
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
