// src/gauth.ts
/* eslint-disable @typescript-eslint/no-var-requires */
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// ensure you have these in your .env (or replace with actual values for testing)
const callbackURL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "YOUR_CLIENT_SECRET",
      callbackURL,
    },
    // NOTE: use cb(null, profile) when successful; cb(err) when error
    function (accessToken: string, refreshToken: string, profile: any, cb: any) {
      try {
        // here you would findOrCreate the user in DB, e.g.
        // const user = await User.findOrCreate({ googleId: profile.id, ... })
        return cb(null, profile);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function (user: any, cb: any) {
  cb(null, user);
});

passport.deserializeUser(function (user: any, cb: any) {
  cb(null, user);
});

// export so index.ts can require/import it
export default passport;
