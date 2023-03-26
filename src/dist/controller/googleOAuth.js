"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const AdminEntity_1 = require("../model/AdminEntity/AdminEntity");
const roles_1 = require("../utils/constants/roles");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Github = require("passport-github2").Strategy;
const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
console.log(GoogleStrategy);
passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield AdminEntity_1.AdminEntity.findOne({
        where: { email: profile._json.email },
    });
    if (checkUser) {
        return callback(null, checkUser);
    }
    else {
        const userCreated = yield AdminEntity_1.AdminEntity.create({
            email: profile._json.email,
            userName: profile.name.familyName,
            role: roles_1.mainRoles.roles.admin,
            token: "",
            verified: profile._json.email_verified,
        }).save();
        return callback(null, userCreated);
    }
})));
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
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=googleOAuth.js.map