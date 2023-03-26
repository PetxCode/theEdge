import myStrategy from "passport-google-oauth20";
import passport from "passport";
import { AdminEntity } from "../model/AdminEntity/AdminEntity";
import { mainRoles } from "../utils/constants/roles";
import dot from "dotenv"
dot.config()

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
      const checkUser = await AdminEntity.findOne({
        where: { email: profile._json.email },
      });

      if (checkUser) {
                 return callback(null,  checkUser);
      } else {
       const userCreated =  await AdminEntity.create({
          
          email: profile._json.email,
          userName: profile.name.familyName,
          role: mainRoles.roles.admin,
          token: "",
          verified: profile._json.email_verified,
        }).save();

        return callback(null, userCreated)
      
      }
    },
  ),
);

// const GITHUB_ID = process.env.GITHUB_ID;
// const GITHUB_SECRET = process.env.GITHUB_SECRET;

// passport.use(
//   new Github(
//     {
//       clientID: GITHUB_ID,
//       clientSecret: GITHUB_SECRET,
//       callbackURL: "/auth/github/callback",
//       scope: ["profile", "email"],
//     },
//     async (
//       accessToken: any,
//       refreshToken: any,
//       profile: any,
//       callback: any,
//     ) => {
//       console.log(profile);
//       return callback(null, profile);

//       // const checkUser = await userModel.findOne({ email: profile._json.email });

//       // if (checkUser) {
//       //   return callback(null, profile);
//       // } else {
//       //   await userModel.create(
//       //     {
//       //       // _id: profile.id,
//       //       fullName: profile.displayName,
//       //       email: profile._json.email,
//       //       userName: profile.name.familyName,
//       //       avatar: profile.photos[0].value,
//       //       status: "General",
//       //       token: "",
//       //       verified: profile._json.email_verified,
//       //     },
//       //     function (err, user) {
//       //       return callback(null, user);
//       //     },
//       //   );
//       // }
//     },
//   ),
// );

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user!);
});
