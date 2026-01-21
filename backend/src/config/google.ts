import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done
    ) => {
      // Trust Google profile
      return done(null, profile);
    }
  )
);
