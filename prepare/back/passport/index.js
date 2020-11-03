const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    if (user) {
      done(null, user.id);
    }
    done('user null');
  });
  passport.deserializeUser(async (id, done) => {
    try {
      await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
