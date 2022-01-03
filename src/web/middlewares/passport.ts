import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import User from '../../data/User';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret_token_here'
}

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user){
            return done(null, user);
        }
        return done(null, null);
    } catch (error) {
        console.error(error);
    }
});