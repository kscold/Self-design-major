const Post = require('../models/post');
const User = require('../models/user');

exports.renderProfile = (req, res, next) => {
    // 서비스를 호출

    // 두번째 매개변수 값이 있다면 두번째 인자가 뷰에 넘어가고 없다면 res.locals에 있는 값이 넘어감
    res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res, next) => {
    res.render('join', { title: '회원 가입 - NodeBird' });
};

exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'], // 비빌번호는 보내지 않음
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (error) {
        console.error(error);
    }
};

// 라우터 -> 컨트롤러 -> 서비스(요청, 응답을 모름)
