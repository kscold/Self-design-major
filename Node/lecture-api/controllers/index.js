const { User, Domain } = require('../models');
const { v4 } = require('uuid');

exports.renderLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user?.id || null }, // 시퀄라이즈에는 undefined가 들어가면 안되기 때문에 null로 바꿔주어야 함
            include: { model: Domain },
        });
        res.render('login', {
            user,
            domains: user?.Domains,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.createDomain = async (req, res, next) => {
    try {
        await Domain.create({
            UserId: req.user.id,
            host: req.body.host,
            type: req.body.type,
            clientSecret: v4(),
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};
