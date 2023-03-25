import myStrategy from "passport-google-oauth20";
import passport from "passport";
import { AdminEntity } from "../model/AdminEntity/AdminEntity";
import { mainRoles } from "../utils/constants/roles";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Github = require("passport-github2").Strategy;

const GOOGLE_ID =
  "1054310070984-g0j7k7btj1ne7hpofa0glpht7nudfrf2.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";

console.log(GoogleStrategy);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      //   callbackURL: "https://dom-ranker.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any,
    ) => {
      console.log("===== GOOGLE PROFILE =======");
      console.log(profile);
      console.log("======== END ===========");

      //   const checkUser = await AdminEntity.findOne({
      //     where: { email: profile._json.email },
      //   });

      //   if (checkUser) {
      //     return callback(null, profile);
      //   } else {
      //     await AdminEntity.create({
      //       // _id: profile.id,
      //       // fullName: profile.displayName,
      //       email: profile._json.email,
      //       userName: profile.name.familyName,
      //       role: mainRoles.roles.admin,
      //       token: "",
      //       schoolName: `Love School: ${Math.random() * 10000}`,
      //       verified: profile._json.email_verified,
      //     });
      //     (err, user) => {
      //       return callback(null, user);
      //     };
      //   }
    },
  ),
);

const GITHUB_ID = "240503e22f475ccae561";
const GITHUB_SECRET = "c466d52ac8250466fd7356754a54a508fbb5a0dd";

passport.use(
  new Github(
    {
      clientID: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["profile", "email"],
    },
    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any,
    ) => {
      console.log(profile);
      return callback(null, profile);

      // const checkUser = await userModel.findOne({ email: profile._json.email });

      // if (checkUser) {
      //   return callback(null, profile);
      // } else {
      //   await userModel.create(
      //     {
      //       // _id: profile.id,
      //       fullName: profile.displayName,
      //       email: profile._json.email,
      //       userName: profile.name.familyName,
      //       avatar: profile.photos[0].value,
      //       status: "General",
      //       token: "",
      //       verified: profile._json.email_verified,
      //     },
      //     function (err, user) {
      //       return callback(null, user);
      //     },
      //   );
      // }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user!);
});
