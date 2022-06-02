import * as passport from 'passport';
import User from '../models/user';

export default () => {
  // 로그인할때만 실행
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // 매번 실행
  passport.deserializeUser<number>(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      if (!user) {
        return done(new Error('no user'));
      }
      return done(null, user); // req.user
    } catch (err) {
      console.error(err);
      return done(err);
    }
 });

};
