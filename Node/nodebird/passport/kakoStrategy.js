const passport = require('passport');
const { Strategy: KakaoStrategy } = require('passport-kakao');
const User = require('../models/user');

module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: '/auth/kakao/callback',
            },
            // 카카오 API를 호출할 때 accessToken, refreshToken을 사용함
            async (accessToken, refreshToken, profile, done) => {
                console.log('profile', profile);

                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: 'kakao' },
                    });

                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            // 이 부분이 업데이트가 자주되므로 확인이 필요함
                            email: profile._json?.kakao_account?.email,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: 'kakao',
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );
};
