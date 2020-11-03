const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        //done(서버오류, responese data, 클라이언트 오류) == callback
        console.log('step 2');
        try {
          const user = await User.findOne({
            where: { email },
          });
          console.log('step 3');
          console.log(user);
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 이메일입니다.' });
          }
          console.log('step 4');
          const result = await bcrypt.compare(password, user.password);
          console.log('step 5');
          if (result) {
            return done(null, user);
          }
          return done(null, false, { result: '비밀번호가 일치하지 않습니다.' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
