const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const keys = require('./keys');
const { Add_New_User } = require('../src/queries/Add_New_User');
const { Find_User } = require('../src/queries/Find_User');

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        console.log('givenName', profile.name.givenName);

        //check if user already exists in our DB
        console.log('profileId******', profile.id)
        Find_User(profile.id).then(result => {

            if (result.rowCount > 0) {
                console.log('The user already exist');
                done(null, result.rows[0]);
            }
            //if not, create user in our DB
            else {
                Add_New_User(profile.id, profile.name.givenName, profile.name.familyName, 'test@gmail.com', profile.photos[0].value)
                    .then(result => {
                        console.log('New user created');
                        done(null, profile.id);
                    }).catch(err => console.log('addes_user_err:', err));
            }

        }).catch(err => console.log('Find_User:', err));
    } catch (error) {
        done(error, false, error.message);
    }
}));


passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        //check if user already exists in our DB
        console.log('profileId******', profile.id)
        Find_User(profile.id).then(result => {

            if (result.rowCount > 0) {
                console.log('The user already exist');
                done(null, result.rows[0]);
            }
            //if not, create user in our DB
            else {
                Add_New_User(profile.id, profile.name.givenName, profile.name.familyName, 'ftest@gmail.com', profile.photos[0].value)
                    .then(result => {
                        console.log('New user created');
                        done(null, profile.id);
                    }).catch(err => console.log('addes_user_err:', err));
            }

        }).catch(err => console.log('Find_User:', err));

    } catch (error) {
        done(error, false, error.message);
    }
}));
