passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "https://reachinbox-sde-intern-assignment.onrender.com/api/auth/google/callback",
      proxy: true // Required for Render HTTPS
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);