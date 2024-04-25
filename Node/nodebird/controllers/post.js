const Hashtag = require('../models/hashtag');
const Post = require('../models/post');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` }); // 프론트의 res.data.url 부분임
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        // /#[^\s#]*/g #을 찾는데 공백과 #을 제외한 문자 나머지가 0번 이상 반복되고, 전체 선택 g(global)로 검색
        const hashtags = req.body.content.match(/#[^\s#]*/g);

        // 만약 태그가 존재하면
        if (hashtags) {
            // 전부 기다림
            const result = await Promise.all(
                hashtags.map((tag) => {
                    // DB에 해쉬태그가 있으면 검색 없으면 새로 생성
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() }, // 저장할 때 #을 때고 소문자로 만들어서 저장함
                    });
                })
            );

            console.log(result); // Promise.all로 실행하면 [[모델, bool], [모델, bool], [모델, bool]] 형식으로 나옴
            await post.addHashtags(result.map((r) => r[0])); // 따라서 모델만 선택해서 넣기 위한 코드임
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};
