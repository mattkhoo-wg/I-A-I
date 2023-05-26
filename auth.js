import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import models from './models.js';

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://squid-app-hq6q4.ondigitalocean.app/auth/google/callback",
        session: true
    },
    async (accessToken, refreshToken, profile, done) => {
        //looks for user in database, if not found, creates new user using information from google profile
        try{
            const user = await models.User.findOne({username: profile.emails[0].value});
            if(user){
                return done(null, user);
            } else {
                const newFamily = new models.Family({
                    name: profile.name.familyName,
                    members: [],
                })
                const newUser = new models.User({
                    username: profile.emails[0].value,
                    name: profile.name.givenName,
                    familyName: profile.name.familyName,
                    family: newFamily._id,
                    posts: [],
                    DateCreated: Date.now()
                })
                newFamily.members.push(newUser._id);
                await newUser.save();
                await newFamily.save();
                return done(null, newUser);
            }
        }catch(err){
            console.log(err);
            return done(err);
        }

    })
)

passport.serializeUser((user, done) => {
    //console.log(user);
    done(null, user);
})

passport.deserializeUser(async (user, done) => {
    done(null, user);
})

export default passport;