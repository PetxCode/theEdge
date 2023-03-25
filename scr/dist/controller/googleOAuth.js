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
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Github = require("passport-github2").Strategy;
const GOOGLE_ID = "1054310070984-g0j7k7btj1ne7hpofa0glpht7nudfrf2.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
console.log(GoogleStrategy);
passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "/auth/google/callback",
    //   callbackURL: "https://dom-ranker.onrender.com/auth/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
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
})));
const GITHUB_ID = "240503e22f475ccae561";
const GITHUB_SECRET = "c466d52ac8250466fd7356754a54a508fbb5a0dd";
passport_1.default.use(new Github({
    clientID: GITHUB_ID,
    clientSecret: GITHUB_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, callback) => __awaiter(void 0, void 0, void 0, function* () {
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
})));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=googleOAuth.js.map