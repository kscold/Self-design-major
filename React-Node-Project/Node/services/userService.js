const User = require('../models/user');
const MongoUser = require('../schemas/user');
const bcrypt = require('bcrypt');

exports.createUser = async ({ loginId, password, email, nickname }) => {
    const exUser = await User.findOne({ where: { loginId } });
    if (exUser) {
        throw new Error('이미 존재하는 아이디입니다.');
    }

    if (email) {
        const exEmail = await User.findOne({ where: { email } });
        if (exEmail) {
            throw new Error('이미 존재하는 이메일입니다.');
        }
    }

    const hash = await bcrypt.hash(password, 12);
    const userCount = await User.count();
    const role = userCount === 0 ? 'admin' : 'user';

    const newUser = await User.create({
        loginId,
        password: hash,
        email,
        nickname,
        role,
    });

    const mongoUser = new MongoUser({
        nickname,
        role,
    });

    await mongoUser.save();

    return newUser;
};

exports.authenticateUser = async ({ loginId, password }) => {
    const user = await User.findOne({ where: { loginId } });
    if (!user) {
        throw new Error('존재하지 않는 아이디입니다.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

    return user;
};

exports.getUserById = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ['id', 'nickname', 'role'],
    });
    if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }
    return user;
};

exports.getAllUsers = async () => {
    return await User.findAll({
        attributes: ['id', 'nickname', 'role'],
    });
};
