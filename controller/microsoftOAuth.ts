import myStrategy from "passport-google-oauth20";
import passport from "passport";
import { UserEntity } from "../model/AdminEntity/UserEntity";
import { mainRoles } from "../utils/constants/roles";
import dot from "dotenv";
dot.config();

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Github = require("passport-github2").Strategy;

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

console.log(GoogleStrategy);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any,
    ) => {
      const checkUser = await UserEntity.findOne({
        where: { email: profile._json.email },
      });

      if (checkUser) {
        return callback(null, checkUser);
      } else {
        const userCreated = await UserEntity.create({
          email: profile._json.email,
          userName: profile.name.familyName,
          token: "",
          verified: profile._json.email_verified,
        }).save();

        return callback(null, userCreated);
      }
    },
  ),
);

var MicrosoftStrategy = require("passport-microsoft").Strategy;
passport.use(
  new MicrosoftStrategy(
    {
      // Standard OAuth2 options
      clientID: process.env.APPLICATION_ID2,
      clientSecret: process.env.SECRET_ID2,
      callbackURL: "/auth/microsoft/callback",
      scope: ["openid", "profile", "email"],

      // Microsoft specific options

      // [Optional] The tenant for the application. Defaults to 'common'.
      // Used to construct the authorizationURL and tokenURL
      tenant: "common",

      // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`

      authorizationURL:
        //   `https://login.microsoftonline.com/${process.env.TENANT_ID2}/oauth2/v2.0/authorize`,

        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",

      // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`

      tokenURL:
        // `https://login.microsoftonline.com/${process.env.TENANT_ID2}/oauth2/v2.0/token`,
        "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user!);
});
