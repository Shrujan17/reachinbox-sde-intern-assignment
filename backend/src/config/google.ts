import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

/**
 * Google OAuth Strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User) => void
    ) => {
      // We trust Google profile as the user object
      return done(null, profile);
    }
  )
);

/**
 * Serialize user into session (not heavily used since JWT is primary)
 */
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

/**
 * Deserialize user from session
 */
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});
