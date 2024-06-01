const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');

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

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag; // 쿼리 스트링
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ['id', 'nick'] }],
                order: [['createdAt', 'DESC']],
            });
        }
        res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
